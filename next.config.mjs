/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.public.blob.vercel-storage.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'opengraph.githubassets.com',
                port: '',
            },
            {
                protocol: 'https',
                hostname: 'placehold.co',
                port: '',
            },
        ],
    },
};

export default nextConfig;
