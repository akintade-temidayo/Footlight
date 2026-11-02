import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import connectDB from '@/lib/db';
import User from '@/models/User';

const sessionSecret = process.env.SESSION_SECRET || process.env.ADMIN_JWT_SECRET;

if (!sessionSecret) {
throw new Error('SESSION_SECRET must be set.');
}

const SECRET_KEY = new TextEncoder().encode(sessionSecret);

export async function createUserSession(user) {
const token = await new SignJWT({
userId: user._id.toString(),
role: user.role,
name: user.name,
sessionVersion: Number(user.sessionVersion || 0),
})
.setProtectedHeader({ alg: 'HS256' })
.setIssuedAt()
.setIssuer('footlight')
.setAudience('footlight-user')
.setExpirationTime('7d')
.sign(SECRET_KEY);

const cookieStore = await cookies();
cookieStore.set('session', token, {
httpOnly: true,
secure: process.env.NODE_ENV === 'production',
sameSite: 'lax',
maxAge: 60 * 60 * 24 * 7, // 7 days
path: '/',
});
}

export async function getSession() {
const cookieStore = await cookies();
const token = cookieStore.get('session')?.value;

if (!token) return null;

try {
const { payload } = await jwtVerify(token, SECRET_KEY, {
    issuer: 'footlight',
    audience: 'footlight-user',
});

await connectDB();
const user = await User.findById(payload.userId).select('sessionVersion').lean();

if (!user) return null;

const dbVersion = Number(user.sessionVersion || 0);
const tokenVersion = Number(payload.sessionVersion || 0);

// Invalidate session if versions do not match
if (dbVersion !== tokenVersion) return null;

return payload;
} catch (error) {
return null;
}
}

export async function clearSession() {
const cookieStore = await cookies();
cookieStore.delete('session');
}