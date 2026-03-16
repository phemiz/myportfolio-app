import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const getSecretKey = () => {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
        console.warn('Warning: JWT_SECRET is not defined in environment variables. Requests might fail or use a fallback.');
        return new TextEncoder().encode('fallback-development-secret-key');
    }
    return new TextEncoder().encode(secretKey);
};

export async function signToken(payload: any) {
    try {
        return await new SignJWT(payload)
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("24h")
            .sign(getSecretKey());
    } catch (error) {
        console.error("Error signing token:", error);
        return null;
    }
}

export async function verifyToken(token: string): Promise<any> {
    try {
        const { payload } = await jwtVerify(token, getSecretKey(), {
            algorithms: ["HS256"],
        });
        return payload;
    } catch (error) {
        console.error("Error verifying token:", error);
        return null;
    }
}

// Preserve existing function names for backward compatibility with login/middleware
export async function encrypt(payload: any) {
    return await signToken(payload);
}

export async function decrypt(input: string): Promise<any> {
    return await verifyToken(input);
}

export async function login(formData: FormData) {
    // Verify credentials against store (implemented in action)
    // Create session
    const user = { username: "admin" }; // Placeholder

    // Create the session
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const session = await encrypt({ user, expires });

    // Save the session in a cookie
    if (session) {
        cookies().set("auth_token", session, { expires, httpOnly: true });
    }
}

export async function logout() {
    // Destroy the session
    cookies().set("auth_token", "", { expires: new Date(0) });
}

export async function getSession() {
    const session = cookies().get("auth_token")?.value;
    if (!session) return null;
    return await decrypt(session);
}

export async function updateSession(request: NextRequest) {
    const session = request.cookies.get("auth_token")?.value;
    if (!session) return;

    // Refresh the session so it doesn't expire
    const parsed = await decrypt(session);

    if (!parsed) return;

    parsed.expires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const res = NextResponse.next();
    const token = await encrypt(parsed);
    if (token) {
        res.cookies.set({
            name: "auth_token",
            value: token,
            httpOnly: true,
            expires: parsed.expires,
        });
    }
    return res;
}
