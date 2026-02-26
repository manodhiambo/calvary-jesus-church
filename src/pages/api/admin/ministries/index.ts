import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = requireAuth(req, res);
  if (!user) return;

  if (req.method === 'GET') {
    try {
      const result = await query('SELECT * FROM ministries ORDER BY order_index ASC, id ASC');
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch ministries', details: String(error) });
    }
  } else if (req.method === 'POST') {
    try {
      const { name, description, image_url, schedule, leader_name, contact_email, activities, age_group, location, order_index } = req.body;
      if (!name) return res.status(400).json({ error: 'Name is required' });

      const result = await query(
        `INSERT INTO ministries (name, description, image_url, schedule, leader_name, contact_email, activities, age_group, location, order_index)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING *`,
        [name, description, image_url, schedule, leader_name, contact_email,
         activities || [], age_group, location, order_index || 0]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create ministry', details: String(error) });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
