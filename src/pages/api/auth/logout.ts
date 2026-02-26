import { NextApiRequest, NextApiResponse } from 'next';
import { clearCookieToken } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  clearCookieToken(res);
  res.status(200).json({ success: true });
}
