import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { limit, featured, status } = req.query;
    let sql = 'SELECT * FROM events WHERE 1=1';
    const params: unknown[] = [];
    let idx = 1;

    if (status) { sql += ` AND status = $${idx++}`; params.push(status); }
    else { sql += ` AND event_date >= NOW() - INTERVAL '1 day'`; }
    if (featured === 'true') { sql += ` AND is_featured = true`; }

    sql += ' ORDER BY event_date ASC';
    if (limit) { sql += ` LIMIT $${idx++}`; params.push(parseInt(limit as string)); }

    const result = await query(sql, params);
    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
}
