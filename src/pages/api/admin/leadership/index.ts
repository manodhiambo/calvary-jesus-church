import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = requireAuth(req, res);
  if (!user) return;

  if (req.method === 'GET') {
    try {
      const result = await query('SELECT * FROM leadership ORDER BY order_index ASC, id ASC');
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch leadership', details: String(error) });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, position, bio, image_url, email, phone, order_index } = req.body;
      if (!name || !position) return res.status(400).json({ error: 'Name and position required' });

      const result = await query(
        `INSERT INTO leadership (name, position, bio, image_url, email, phone, order_index)
         VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
        [name, position, bio, image_url, email, phone, order_index || 0]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create leader', details: String(error) });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
