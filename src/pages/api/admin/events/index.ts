import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = requireAuth(req, res);
  if (!user) return;

  if (req.method === 'GET') {
    try {
      const result = await query(
        'SELECT * FROM events ORDER BY event_date DESC'
      );
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch events', details: String(error) });
    }
  } else if (req.method === 'POST') {
    try {
      const {
        title, description, event_date, end_date, location,
        category, image_url, is_featured, registration_required, max_attendees, status
      } = req.body;

      if (!title || !event_date) {
        return res.status(400).json({ error: 'Title and event date are required' });
      }

      const result = await query(
        `INSERT INTO events (title, description, event_date, end_date, location, category, image_url, is_featured, registration_required, max_attendees, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
        [title, description, event_date, end_date, location, category || 'general',
         image_url, is_featured || false, registration_required || false, max_attendees, status || 'upcoming']
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create event', details: String(error) });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
