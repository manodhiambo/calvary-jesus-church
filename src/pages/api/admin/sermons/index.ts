import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = requireAuth(req, res);
  if (!user) return;

  if (req.method === 'GET') {
    try {
      const result = await query('SELECT * FROM sermons ORDER BY sermon_date DESC');
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch sermons', details: String(error) });
    }
  } else if (req.method === 'POST') {
    try {
      const {
        title, speaker, series, scripture_reference, description,
        video_url, audio_url, pdf_url, thumbnail_url, duration_minutes,
        sermon_date, is_featured
      } = req.body;

      if (!title) return res.status(400).json({ error: 'Title is required' });

      const result = await query(
        `INSERT INTO sermons (title, speaker, series, scripture_reference, description,
         video_url, audio_url, pdf_url, thumbnail_url, duration_minutes, sermon_date, is_featured)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING *`,
        [title, speaker || 'Pastor Bruce', series, scripture_reference, description,
         video_url, audio_url, pdf_url, thumbnail_url, duration_minutes, sermon_date, is_featured || false]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create sermon', details: String(error) });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
