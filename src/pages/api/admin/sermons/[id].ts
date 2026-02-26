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
        title, speaker, series, scripture_reference, description,
        video_url, audio_url, pdf_url, thumbnail_url, duration_minutes,
        sermon_date, is_featured
      } = req.body;

      const result = await query(
        `UPDATE sermons SET title=$1, speaker=$2, series=$3, scripture_reference=$4,
         description=$5, video_url=$6, audio_url=$7, pdf_url=$8, thumbnail_url=$9,
         duration_minutes=$10, sermon_date=$11, is_featured=$12, updated_at=NOW()
         WHERE id=$13 RETURNING *`,
        [title, speaker, series, scripture_reference, description,
         video_url, audio_url, pdf_url, thumbnail_url, duration_minutes,
         sermon_date, is_featured, id]
      );
      if (result.rows.length === 0) return res.status(404).json({ error: 'Sermon not found' });
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update sermon', details: String(error) });
    }
  } else if (req.method === 'DELETE') {
    try {
      await query('DELETE FROM sermons WHERE id = $1', [id]);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete sermon', details: String(error) });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
