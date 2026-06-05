'use server';

import { redirect } from 'next/navigation';
import fs from 'fs/promises';
import path from 'path';
import { put } from '@vercel/blob';
import { getAdminCredentials, getProjects, saveProjects, updateAdminCredentials, updateSettings, Settings } from './db-utils';
import { login as authLogin, logout as authLogout } from './auth';
import { Project } from './data';

import bcrypt from 'bcryptjs';

export async function loginAction(prevState: any, formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    const creds = await getAdminCredentials();

    if (username === creds.username) {
        // Handle migration from plain text if needed, or assume hash
        const isValid = await bcrypt.compare(password, creds.password);
        // Fallback for first login if we haven't migrated yet (though plan says we should migrate)
        // Let's perform a smart check: if matches plain text, re-hash and save? 
        // OR just compare.
        // For security, if it's not a hash (e.g. "admin"), bcrypt.compare will return false.
        // I will implement a migration check: if creds.password is "admin", allow it but update it?
        // Actually, let's keep it simple: Compare.
        // But wait, the current admin.json has "admin". bcrypt.compare("admin", "admin") is false.
        // I need to handle the first login case.

        let valid = false;
        try {
            valid = await bcrypt.compare(password, creds.password);
        } catch (e) {
            // Check if it's plaintext "admin"
            if (creds.password === password) {
                valid = true;
                // Auto-migrate to hash
                const hashed = await bcrypt.hash(password, 10);
                await updateAdminCredentials({ username, password: hashed });
            }
        }

        // Simpler approach:
        // if (creds.password === password) (legacy plaintext)
        // else await bcrypt.compare(password, creds.password)

        if (creds.password === password) {
            // Legacy plain text match
            const hashed = await bcrypt.hash(password, 10);
            await updateAdminCredentials({ ...creds, password: hashed });
            valid = true;
        } else {
            valid = await bcrypt.compare(password, creds.password);
        }

        if (valid) {
            await authLogin(formData);
            redirect('/admin');
        }
    }

    return { error: 'Invalid credentials' };
}

export async function logoutAction() {
    await authLogout();
    redirect('/admin/login');
}

export async function addProjectAction(formData: FormData) {
    const projects = await getProjects();

    const techStackString = formData.get('techStack') as string;
    const techStack = techStackString.split(',').map(t => t.trim()).filter(Boolean);

    // 1. Handle Image Upload (with local fallback)
    const imageFile = formData.get('image') as File;
    let imagePath = '';

    if (imageFile && imageFile.size > 0) {
        try {
            const fileName = `${formData.get('slug')}-${Date.now()}-${imageFile.name}`;
            
            // Check if Vercel Blob is configured, otherwise fallback to local
            if (process.env.BLOB_READ_WRITE_TOKEN && process.env.BLOB_READ_WRITE_TOKEN !== 'your_vercel_blob_token_here') {
                const blob = await put(`projects/${fileName}`, imageFile, { access: 'public' });
                imagePath = blob.url;
            } else {
                // Local Fallback
                const buffer = Buffer.from(await imageFile.arrayBuffer());
                const uploadDir = path.join(process.cwd(), 'public/projects');
                try { await fs.mkdir(uploadDir, { recursive: true }); } catch {}
                await fs.writeFile(path.join(uploadDir, fileName), buffer);
                imagePath = `/projects/${fileName}`;
                console.log('Using local fallback for image upload:', imagePath);
            }
        } catch (error) {
            console.error('Image upload failed:', error);
        }
    }

    // 2. Determine Images (Manual Control Only)
    // "the Project Feature Image should not be by default"
    let images: string[] = [];
    if (imagePath) {
        images.push(imagePath);
    }

    const githubUrlFromForm = formData.get('githubUrl') as string;

    const newProject: Project = {
        id: crypto.randomUUID(),
        title: formData.get('title') as string,
        slug: formData.get('slug') as string,
        shortDesc: formData.get('shortDesc') as string,
        fullDesc: formData.get('fullDesc') as string,
        status: formData.get('status') as any,
        techStack: techStack,
        githubUrl: githubUrlFromForm,
        demoUrl: formData.get('demoUrl') as string || undefined,
        images: images,
        features: JSON.parse(formData.get('featuresJson') as string || '[]'),
        specs: []
    };

    projects.push(newProject);
    await saveProjects(projects);
    redirect(`/admin?success=created#project-${newProject.id}`);
}

export async function deleteProjectAction(id: string) {
    const projects = await getProjects();
    const updated = projects.filter(p => p.id !== id);
    await saveProjects(updated);
    redirect('/admin');
}

export async function updateCredentialsAction(formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    const hashedPassword = await bcrypt.hash(password, 10);
    await updateAdminCredentials({ username, password: hashedPassword });
    await authLogout();
    redirect('/admin/login');
}

export async function fetchGitHubRepoAction(repoUrl: string) {
    try {
        // Extract owner and repo from URL
        // Format: https://github.com/owner/repo or https://github.com/owner/repo.git
        const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/\.]+)/);

        if (!match) {
            return { error: 'Invalid GitHub URL format. Use: https://github.com/username/repo' };
        }

        const [, owner, repo] = match;

        // Fetch from GitHub API
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Portfolio-Admin'
            },
            cache: 'no-store'
        });

        if (response.status === 404) {
            return { error: 'Repository not found. Make sure the repository is public and the URL is correct.' };
        }

        if (response.status === 403) {
            return { error: 'GitHub API rate limit exceeded. Please try again later or use manual entry.' };
        }

        if (!response.ok) {
            return { error: `GitHub API error: ${response.status}` };
        }

        const data = await response.json();

        // Extract relevant information
        return {
            success: true,
            data: {
                title: data.name.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
                slug: data.name.toLowerCase(),
                shortDesc: data.description || 'No description available',
                fullDesc: data.description || 'No description available',
                techStack: data.language ? [data.language, ...(data.topics || [])] : (data.topics || []),
                githubUrl: data.html_url,
            }
        };
    } catch (error) {
        console.error('GitHub fetch error:', error);
        return { error: 'Failed to fetch repository data. Please check your internet connection.' };
    }
}

export async function updateSettingsAction(formData: FormData) {
    const settings: Settings = {
        scrollingText: {
            section0: {
                heading: formData.get('section0_heading') as string,
                description: formData.get('section0_description') as string || ''
            },
            section30: {
                heading: formData.get('section30_heading') as string,
                description: formData.get('section30_description') as string || ''
            },
            section60: {
                heading: formData.get('section60_heading') as string,
                description: formData.get('section60_description') as string || ''
            },
            section90: {
                heading: formData.get('section90_heading') as string,
                description: formData.get('section90_description') as string || ''
            }
        },
        stackTechnology: JSON.parse(formData.get('stackTechnology') as string)
    };

    await updateSettings(settings);
    redirect('/admin/content?success=true');
}

export async function fetchGitHubReadmeAction(repoUrl: string) {
    try {
        const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/\.]+)/);

        if (!match) {
            return { error: 'Invalid GitHub URL format. Use: https://github.com/username/repo' };
        }

        const [, owner, repo] = match;

        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'Portfolio-Admin'
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            return { error: 'Failed to fetch README. It might not exist or the repo is private.' };
        }

        const data = await response.json();
        const content = Buffer.from(data.content, 'base64').toString('utf-8');

        return { success: true, content };
    } catch (error) {
        console.error('GitHub README fetch error:', error);
        return { error: 'Failed to fetch README data.' };
    }
}

export async function updateProjectAction(id: string, formData: FormData) {
    const projects = await getProjects();
    const existingProjectIndex = projects.findIndex(p => p.id === id);

    if (existingProjectIndex === -1) {
        throw new Error('Project not found');
    }

    const existingProject = projects[existingProjectIndex];

    const techStackString = formData.get('techStack') as string;
    const techStack = techStackString.split(',').map(t => t.trim()).filter(Boolean);

    // 1. Handle Potential New Image Upload (with local fallback)
    const imageFile = formData.get('image') as File;
    let newImagePath = '';

    if (imageFile && imageFile.size > 0) {
        try {
            const fileName = `${formData.get('slug')}-${Date.now()}-${imageFile.name}`;
            
            if (process.env.BLOB_READ_WRITE_TOKEN && process.env.BLOB_READ_WRITE_TOKEN !== 'your_vercel_blob_token_here') {
                const blob = await put(`projects/${fileName}`, imageFile, { access: 'public' });
                newImagePath = blob.url;
            } else {
                // Local Fallback
                const buffer = Buffer.from(await imageFile.arrayBuffer());
                const uploadDir = path.join(process.cwd(), 'public/projects');
                try { await fs.mkdir(uploadDir, { recursive: true }); } catch {}
                await fs.writeFile(path.join(uploadDir, fileName), buffer);
                newImagePath = `/projects/${fileName}`;
                console.log('Using local fallback for image update:', newImagePath);
            }
        } catch (error) {
            console.error('Image upload failed:', error);
        }
    }

    // 2. Resolve Images
    // Priority: 
    // A. New local image (if present) becomes the Feature Image (index 0)
    // B. Remaining existing images (respecting deletions from UI)
    // Note: GitHub OG is no longer added by default.

    let images: string[] = [];
    const githubUrlFromForm = formData.get('githubUrl') as string;
    
    // A. Priority 1: New local image (if present)
    if (newImagePath) {
        images.push(newImagePath);
    }

    // C. Process Existing Images (Filtering based on UI deletions)
    const existingImagesJson = formData.get('existingImagesJson') as string;
    let baseImages = existingProject.images || [];
    
    if (existingImagesJson) {
        try {
            baseImages = JSON.parse(existingImagesJson);
        } catch (e) {
            console.error("Failed to parse remaining images:", e);
        }
    }

    baseImages.forEach(img => {
        if (!images.includes(img)) {
            images.push(img);
        }
    });

    const updatedProject: Project = {
        ...existingProject,
        title: formData.get('title') as string,
        slug: formData.get('slug') as string,
        shortDesc: formData.get('shortDesc') as string,
        fullDesc: formData.get('fullDesc') as string,
        status: formData.get('status') as any,
        techStack: techStack,
        githubUrl: githubUrlFromForm,
        demoUrl: formData.get('demoUrl') as string || undefined,
        images: images,
        features: JSON.parse(formData.get('featuresJson') as string || '[]')
    };

    projects[existingProjectIndex] = updatedProject;
    await saveProjects(projects);
    redirect(`/admin?success=updated#project-${id}`);
}

export async function sendEmailAction(prevState: any, formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
        return { success: false, error: "Please fill in all fields" };
    }

    try {
        // Here you would typically integrate with Resend, SendGrid, etc.
        // For example with Resend:
        // await resend.emails.send({
        //     from: "Acme <onboarding@resend.dev>",
        //     to: ["your-email@example.com"],
        //     subject: `New contact from ${name}`,
        //     text: message,
        //     reply_to: email,
        // });

        console.log(`New incoming message from ${name} (${email}):\n${message}`);

        // Simulating network delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return { success: true, error: "" };
    } catch (error) {
        console.error("Failed to send email:", error);
        return { success: false, error: "Failed to send message. Please try again." };
    }
}
