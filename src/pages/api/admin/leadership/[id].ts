import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = requireAuth(req, res);
  if (!user) return;
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const { name, position, bio, image_url, email, phone, order_index } = req.body;
      const result = await query(
        `UPDATE leadership SET name=$1, position=$2, bio=$3, image_url=$4, email=$5,
         phone=$6, order_index=$7, updated_at=NOW() WHERE id=$8 RETURNING *`,
        [name, position, bio, image_url, email, phone, order_index, id]
      );
      if (result.rows.length === 0) return res.status(404).json({ error: 'Leader not found' });
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update leader', details: String(error) });
    }
  } else if (req.method === 'DELETE') {
    try {
      await query('DELETE FROM leadership WHERE id = $1', [id]);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete leader', details: String(error) });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
