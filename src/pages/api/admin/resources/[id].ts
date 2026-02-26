import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = requireAuth(req, res);
  if (!user) return;
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const { title, description, resource_type, file_url, thumbnail_url, category, author } = req.body;
      const result = await query(
        `UPDATE resources SET title=$1, description=$2, resource_type=$3, file_url=$4,
         thumbnail_url=$5, category=$6, author=$7, updated_at=NOW() WHERE id=$8 RETURNING *`,
        [title, description, resource_type, file_url, thumbnail_url, category, author, id]
      );
      if (result.rows.length === 0) return res.status(404).json({ error: 'Resource not found' });
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update resource', details: String(error) });
    }
  } else if (req.method === 'DELETE') {
    try {
      await query('DELETE FROM resources WHERE id = $1', [id]);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete resource', details: String(error) });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
