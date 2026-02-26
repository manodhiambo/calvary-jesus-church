import { NextApiRequest, NextApiResponse } from 'next';
import { query } from '@/lib/db';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Simple key check to prevent unauthorized init
  const { initKey } = req.body;
  if (initKey !== process.env.DB_INIT_KEY && initKey !== 'init-cjc-2024') {
    return res.status(403).json({ error: 'Invalid init key' });
  }

  try {
    // Create admin_users table
    await query(`
      CREATE TABLE IF NOT EXISTS admin_users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'admin',
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create events table
    await query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        event_date TIMESTAMPTZ NOT NULL,
        end_date TIMESTAMPTZ,
        location VARCHAR(255),
        category VARCHAR(100) DEFAULT 'general',
        image_url TEXT,
        is_featured BOOLEAN DEFAULT FALSE,
        registration_required BOOLEAN DEFAULT FALSE,
        max_attendees INTEGER,
        status VARCHAR(50) DEFAULT 'upcoming',
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create sermons table
    await query(`
      CREATE TABLE IF NOT EXISTS sermons (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        speaker VARCHAR(255) DEFAULT 'Pastor Bruce',
        series VARCHAR(255),
        scripture_reference VARCHAR(255),
        description TEXT,
        video_url TEXT,
        audio_url TEXT,
        pdf_url TEXT,
        thumbnail_url TEXT,
        duration_minutes INTEGER,
        sermon_date DATE,
        views INTEGER DEFAULT 0,
        is_featured BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create church_services table (baptism, communion, etc.)
    await query(`
      CREATE TABLE IF NOT EXISTS church_services (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        service_type VARCHAR(100),
        service_date DATE,
        media_urls JSONB DEFAULT '[]'::jsonb,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create online_services table
    await query(`
      CREATE TABLE IF NOT EXISTS online_services (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        video_url TEXT,
        thumbnail_url TEXT,
        service_date DATE,
        is_live BOOLEAN DEFAULT FALSE,
        live_url TEXT,
        duration_minutes INTEGER,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create leadership table
    await query(`
      CREATE TABLE IF NOT EXISTS leadership (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        position VARCHAR(255) NOT NULL,
        bio TEXT,
        image_url TEXT,
        email VARCHAR(255),
        phone VARCHAR(50),
        order_index INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create ministries table
    await query(`
      CREATE TABLE IF NOT EXISTS ministries (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        image_url TEXT,
        schedule VARCHAR(255),
        leader_name VARCHAR(255),
        contact_email VARCHAR(255),
        activities TEXT[] DEFAULT '{}',
        age_group VARCHAR(100),
        location VARCHAR(255),
        order_index INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create resources table
    await query(`
      CREATE TABLE IF NOT EXISTS resources (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        resource_type VARCHAR(100) NOT NULL,
        file_url TEXT,
        thumbnail_url TEXT,
        category VARCHAR(100),
        author VARCHAR(255),
        download_count INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create default admin user if not exists
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@cjc.org';
    const adminPassword = process.env.ADMIN_PASSWORD || 'CJC@Admin2024!';
    const adminName = process.env.ADMIN_NAME || 'CJC Admin';

    const existingAdmin = await query('SELECT COUNT(*) FROM admin_users');
    const hasAnyAdmin = parseInt(existingAdmin.rows[0].count, 10) > 0;

    if (!hasAnyAdmin) {
      const hash = await bcrypt.hash(adminPassword, 12);
      await query(
        'INSERT INTO admin_users (email, password_hash, name, role) VALUES ($1, $2, $3, $4)',
        [adminEmail, hash, adminName, 'admin']
      );
    }

    res.status(200).json({
      success: true,
      message: 'Database initialized successfully',
      adminEmail,
    });
  } catch (error) {
    console.error('DB init error:', error);
    res.status(500).json({ error: 'Database initialization failed', details: String(error) });
  }
}
