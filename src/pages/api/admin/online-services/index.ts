import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = requireAuth(req, res);
  if (!user) return;

  if (req.method === 'GET') {
    try {
      const result = await query('SELECT * FROM online_services ORDER BY service_date DESC NULLS LAST');
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch online services', details: String(error) });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, description, video_url, thumbnail_url, service_date, is_live, live_url, duration_minutes } = req.body;
      if (!title) return res.status(400).json({ error: 'Title is required' });

      const result = await query(
        `INSERT INTO online_services (title, description, video_url, thumbnail_url, service_date, is_live, live_url, duration_minutes)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
        [title, description, video_url, thumbnail_url, service_date, is_live || false, live_url, duration_minutes]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create online service', details: String(error) });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
