import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = requireAuth(req, res);
  if (!user) return;
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const { name, description, image_url, schedule, leader_name, contact_email, activities, age_group, location, order_index } = req.body;
      const result = await query(
        `UPDATE ministries SET name=$1, description=$2, image_url=$3, schedule=$4,
         leader_name=$5, contact_email=$6, activities=$7, age_group=$8, location=$9,
         order_index=$10, updated_at=NOW() WHERE id=$11 RETURNING *`,
        [name, description, image_url, schedule, leader_name, contact_email,
         activities || [], age_group, location, order_index, id]
      );
      if (result.rows.length === 0) return res.status(404).json({ error: 'Ministry not found' });
      res.status(200).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update ministry', details: String(error) });
    }
  } else if (req.method === 'DELETE') {
    try {
      await query('DELETE FROM ministries WHERE id = $1', [id]);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete ministry', details: String(error) });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
