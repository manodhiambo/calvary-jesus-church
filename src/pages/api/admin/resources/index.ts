import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import { requireAuth } from '@/lib/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const user = requireAuth(req, res);
  if (!user) return;

  if (req.method === 'GET') {
    try {
      const { type } = req.query;
      let sql = 'SELECT * FROM resources';
      const params: unknown[] = [];
      if (type) {
        sql += ' WHERE resource_type = $1';
        params.push(type);
      }
      sql += ' ORDER BY created_at DESC';
      const result = await query(sql, params);
      res.status(200).json(result.rows);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch resources', details: String(error) });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, description, resource_type, file_url, thumbnail_url, category, author } = req.body;
      if (!title || !resource_type) return res.status(400).json({ error: 'Title and resource_type required' });

      const result = await query(
        `INSERT INTO resources (title, description, resource_type, file_url, thumbnail_url, category, author)
         VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
        [title, description, resource_type, file_url, thumbnail_url, category, author]
      );
      res.status(201).json(result.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create resource', details: String(error) });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
