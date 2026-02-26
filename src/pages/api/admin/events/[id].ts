import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = requireAuth(req, res);
  if (!user) return;

  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const {
        title, description, event_date, end_date, location,
        category, image_url, is_featured, registration_required, max_attendees, status
      } = req.body;

      const result = await query(
        `UPDATE events SET title=$1, description=$2, event_date=$3, end_date=$4, location=$5,
         category=$6, image_url=$7, is_featured=$8, registration_required=$9, max_attendees=$10,
         status=$11, updated_at=NOW() WHERE id=$12 RETURNING *`,
        [title, description, event_date, end_date, location, category,
         image_url, is_featured, registration_required, max_attendees, status, id]
      );

      if (result.rows.length === 0) return res.status(404).json({ error: 'Event not found' });
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update event', details: String(error) });
    }
  } else if (req.method === 'DELETE') {
    try {
      await query('DELETE FROM events WHERE id = $1', [id]);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete event', details: String(error) });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
