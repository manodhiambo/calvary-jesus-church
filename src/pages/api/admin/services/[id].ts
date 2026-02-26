import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = requireAuth(req, res);
  if (!user) return;
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const { title, description, service_type, service_date, media_urls } = req.body;
      const result = await query(
        `UPDATE church_services SET title=$1, description=$2, service_type=$3,
         service_date=$4, media_urls=$5, updated_at=NOW() WHERE id=$6 RETURNING *`,
        [title, description, service_type, service_date, JSON.stringify(media_urls || []), id]
      );
      if (result.rows.length === 0) return res.status(404).json({ error: 'Service not found' });
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update service', details: String(error) });
    }
  } else if (req.method === 'DELETE') {
    try {
      await query('DELETE FROM church_services WHERE id = $1', [id]);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete service', details: String(error) });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
