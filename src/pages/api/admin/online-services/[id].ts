import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = requireAuth(req, res);
  if (!user) return;
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const { title, description, video_url, thumbnail_url, service_date, is_live, live_url, duration_minutes } = req.body;
      const result = await query(
        `UPDATE online_services SET title=$1, description=$2, video_url=$3, thumbnail_url=$4,
         service_date=$5, is_live=$6, live_url=$7, duration_minutes=$8, updated_at=NOW()
         WHERE id=$9 RETURNING *`,
        [title, description, video_url, thumbnail_url, service_date, is_live, live_url, duration_minutes, id]
      );
      if (result.rows.length === 0) return res.status(404).json({ error: 'Online service not found' });
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update online service', details: String(error) });
    }
  } else if (req.method === 'DELETE') {
    try {
      await query('DELETE FROM online_services WHERE id = $1', [id]);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete online service', details: String(error) });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
