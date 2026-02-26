import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { type, category, search, limit } = req.query;
    let sql = 'SELECT * FROM resources WHERE 1=1';
    const params: unknown[] = [];
    let idx = 1;

    if (type) { sql += ` AND resource_type = $${idx++}`; params.push(type); }
    if (category) { sql += ` AND category ILIKE $${idx++}`; params.push(`%${category}%`); }
    if (search) {
      sql += ` AND (title ILIKE $${idx} OR description ILIKE $${idx})`;
      params.push(`%${search}%`); idx++;
    }

    sql += ' ORDER BY created_at DESC';
    if (limit) { sql += ` LIMIT $${idx++}`; params.push(parseInt(limit as string)); }

    const result = await query(sql, params);
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch resources' });
  }
}
