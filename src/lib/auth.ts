import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { parse } from 'cookie';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-in-production';

export interface AdminUser {
  id: number;
  email: string;
  name: string;
  role: string;
}

export function signToken(user: AdminUser): string {
  return jwt.sign(user, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): AdminUser | null {
  try {
    return jwt.verify(token, JWT_SECRET) as AdminUser;
  } catch {
    return null;
  }
}

export function getTokenFromRequest(req: NextApiRequest): string | null {
  // Check Authorization header
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  // Check cookie
  const cookies = parse(req.headers.cookie || '');
  return cookies.admin_token || null;
}

export function requireAuth(req: NextApiRequest, res: NextApiResponse): AdminUser | null {
  const token = getTokenFromRequest(req);
  if (!token) {
    res.status(401).json({ error: 'Authentication required' });
    return null;
  }
  const user = verifyToken(token);
  if (!user) {
    res.status(401).json({ error: 'Invalid or expired token' });
    return null;
  }
  return user;
}

export function setCookieToken(res: NextApiResponse, token: string) {
  res.setHeader('Set-Cookie', [
    `admin_token=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${7 * 24 * 60 * 60}${
      process.env.NODE_ENV === 'production' ? '; Secure' : ''
    }`,
  ]);
}

export function clearCookieToken(res: NextApiResponse) {
  res.setHeader('Set-Cookie', [
    'admin_token=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0',
  ]);
}
