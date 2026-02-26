import { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/auth';
import { generateUploadSignature } from '@/lib/cloudinary';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  const user = requireAuth(req, res);
  if (!user) return;

  const folder = (req.query.folder as string) || 'cjc';
  const publicId = req.query.public_id as string | undefined;

  const data = generateUploadSignature(folder, publicId);
  res.status(200).json(data);
}
