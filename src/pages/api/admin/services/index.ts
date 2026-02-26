import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = requireAuth(req, res);
  if (!user) return;

  if (req.method === 'GET') {
    try {
      const result = await query('SELECT * FROM church_services ORDER BY service_date DESC NULLS LAST');
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch services', details: String(error) });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, description, service_type, service_date, media_urls } = req.body;
      if (!title) return res.status(400).json({ error: 'Title is required' });

      const result = await query(
        `INSERT INTO church_services (title, description, service_type, service_date, media_urls)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [title, description, service_type, service_date, JSON.stringify(media_urls || [])]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create service', details: String(error) });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
