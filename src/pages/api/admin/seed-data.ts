import { NextApiRequest, NextApiResponse } from 'next';
import { requireAuth } from '@/lib/auth';
import { query } from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  if (!requireAuth(req, res)) return;

  try {
    const results: Record<string, number> = {};

    // ── LEADERSHIP ─────────────────────────────────────────────────────────
    const existingLeaders = await query('SELECT COUNT(*) FROM leadership');
    if (parseInt(existingLeaders.rows[0].count, 10) === 0) {
      const leaders = [
        { name: 'Pastor Bruce', position: 'Missionary Pastor', bio: 'Leading our church in Bible-centered teaching and pastoral care.', email: 'Pst.bruce67@gmail.com', image_url: '/images/about/leadership/pastor-bruce.jpg', order_index: 1 },
        { name: 'Oliver Oyando', position: 'Church Secretary', bio: 'Ensures smooth daily operations by handling administrative and communication tasks.', email: 'oyandooliver6@gmail.com', image_url: '/images/about/leadership/elder-johnson.jpg', order_index: 2 },
        { name: 'Kevin Odhiambo', position: 'Secretary', bio: 'Handles all technology and digital communication platforms.', email: 'manodhiambo@gmail.com', image_url: '/images/about/leadership/kevin-odhiambo.jpg', order_index: 3 },
        { name: 'Joyce Akoth', position: 'Vice Secretary', bio: 'Supports secretarial duties and assists in administrative functions.', email: 'joyceakoth@gmail.com', image_url: '/images/about/leadership/joyce-akoth.jpg', order_index: 4 },
        { name: 'Samuel Ondieki', position: 'Vice Chairman', bio: 'Assists the chairman in leadership and decision-making responsibilities.', email: 'samuelondieki@gmail.com', image_url: '/images/about/leadership/samuel-ondieki.jpg', order_index: 5 },
        { name: 'Felix Ochieng', position: 'Treasurer', bio: 'Manages church finances and ensures transparency in financial matters.', email: 'felixochieng@gmail.com', image_url: '/images/about/leadership/felix-ochieng.jpg', order_index: 6 },
        { name: 'John Olary', position: 'Vice Treasurer', bio: 'Supports the treasurer in managing church financial responsibilities.', email: 'johnolary@gmail.com', image_url: '/images/about/leadership/john-olary.jpg', order_index: 7 },
      ];
      for (const l of leaders) {
        await query(
          'INSERT INTO leadership (name, position, bio, email, image_url, order_index) VALUES ($1,$2,$3,$4,$5,$6)',
          [l.name, l.position, l.bio, l.email, l.image_url, l.order_index]
        );
      }
      results.leadership = leaders.length;
    } else {
      results.leadership = 0;
    }

    // ── MINISTRIES ─────────────────────────────────────────────────────────
    const existingMin = await query('SELECT COUNT(*) FROM ministries');
    if (parseInt(existingMin.rows[0].count, 10) === 0) {
      const ministries = [
        {
          name: "Children's Ministry", age_group: 'Ages 3-12',
          description: "Nurturing young hearts with Bible stories, songs, and age-appropriate activities that help children understand God's love.",
          image_url: '/images/ministries/children.jpg',
          schedule: 'Sunday 9:00 AM - 11:00 AM',
          location: "Children's Room, Nyaduong' Village",
          contact_email: 'children@calvaryjesus.org',
          leader_name: 'Sister Mary',
          activities: ['Bible storytelling with visual aids', 'Scripture memory verses', 'Christian songs and worship', 'Arts and crafts with Biblical themes', 'Character building lessons', 'Special holiday programs'],
          order_index: 1,
        },
        {
          name: 'Youth Ministry', age_group: 'Ages 13-18',
          description: "Empowering teenagers to grow in their faith, build godly relationships, and navigate life's challenges with Biblical wisdom.",
          image_url: '/images/ministries/youth.jpg',
          schedule: 'Sunday 2:00 PM - 4:00 PM',
          location: "Youth Hall, Nyaduong' Village",
          contact_email: 'youth@calvaryjesus.org',
          leader_name: 'Elder Johnson',
          activities: ['Bible study and discussion groups', 'Youth worship and praise', 'Life skills and mentorship', 'Community service projects', 'Fellowship games and activities', 'Discipleship training'],
          order_index: 2,
        },
        {
          name: 'Adult Ministry', age_group: 'Ages 19+',
          description: "Supporting adults in their spiritual growth through in-depth Bible study, fellowship, and practical application of God's Word.",
          image_url: '/images/ministries/adults.jpg',
          schedule: 'Wednesday 7:00 PM - 9:00 PM',
          location: 'Main Sanctuary, Both Locations',
          contact_email: 'adults@calvaryjesus.org',
          leader_name: 'Pastor Bruce',
          activities: ['Expository Bible teaching', 'Small group discussions', 'Prayer and intercession', 'Marriage and family seminars', 'Leadership development', 'Evangelism training'],
          order_index: 3,
        },
        {
          name: 'Music Ministry', age_group: 'All Ages',
          description: 'Leading the congregation in worship through music that honors God and edifies the church body.',
          image_url: '/images/ministries/music.jpg',
          schedule: 'Saturday 4:00 PM - 6:00 PM (Practice)',
          location: "Main Sanctuary, Nyaduong' Village",
          contact_email: 'worship@calvaryjesus.org',
          leader_name: 'Sarah (Worship Leader)',
          activities: ['Congregational singing leadership', 'Special music presentations', 'Instrumental accompaniment', 'Choir performances', 'Music training and workshops', 'Worship team development'],
          order_index: 4,
        },
        {
          name: 'Outreach Ministry', age_group: 'All Ages',
          description: 'Sharing the Gospel message with our community through evangelism, service projects, and compassionate care.',
          image_url: '/images/ministries/outreach.jpg',
          schedule: 'Saturday 9:00 AM - 12:00 PM',
          location: 'Various Community Locations',
          contact_email: 'outreach@calvaryjesus.org',
          leader_name: 'Elder Johnson',
          activities: ['Door-to-door evangelism', 'Community service projects', 'Food distribution to needy families', 'Hospital and prison visits', 'Street preaching and tract distribution', 'Community cleanup initiatives'],
          order_index: 5,
        },
        {
          name: 'Pastoral Care', age_group: 'All Ages',
          description: 'Providing spiritual care, counseling, and support to church members during times of joy, sorrow, and spiritual growth.',
          image_url: '/images/ministries/pastoral-care.jpg',
          schedule: 'By Appointment',
          location: "Pastor's Office / Home Visits",
          contact_email: 'Pst.bruce67@gmail.com',
          leader_name: 'Pastor Bruce',
          activities: ['Personal counseling and guidance', 'Hospital and home visits', 'Grief and crisis support', 'Pre-marital counseling', 'Spiritual direction and discipleship', 'Crisis intervention and support'],
          order_index: 6,
        },
      ];
      for (const m of ministries) {
        await query(
          'INSERT INTO ministries (name, description, image_url, schedule, location, contact_email, leader_name, activities, age_group, order_index) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)',
          [m.name, m.description, m.image_url, m.schedule, m.location, m.contact_email, m.leader_name, m.activities, m.age_group, m.order_index]
        );
      }
      results.ministries = ministries.length;
    } else {
      results.ministries = 0;
    }

    // ── SERMONS ────────────────────────────────────────────────────────────
    const existingSermons = await query('SELECT COUNT(*) FROM sermons');
    if (parseInt(existingSermons.rows[0].count, 10) === 0) {
      const sermons = [
        { title: 'The Authority of Scripture', speaker: 'Pastor Bruce', series: 'Christian Doctrine', scripture_reference: '2 Timothy 3:16-17', description: 'Understanding why the Bible is our sole authority for faith and practice.', sermon_date: '2024-01-21', is_featured: true },
        { title: 'Justification by Faith Alone', speaker: 'Pastor Bruce', series: 'Romans', scripture_reference: 'Romans 3:21-31', description: 'Exploring Romans 3:21-31 and the doctrine of justification.', sermon_date: '2024-01-14', is_featured: false },
        { title: 'The Sufficiency of Scripture', speaker: 'Pastor Bruce', series: 'Christian Doctrine', scripture_reference: '2 Peter 1:3', description: 'Why Scripture is complete and sufficient for all matters of faith and practice.', sermon_date: '2024-01-07', is_featured: false },
        { title: 'In the Beginning God', speaker: 'Pastor Bruce', series: 'Genesis', scripture_reference: 'Genesis 1:1', description: 'Starting our journey through Genesis 1:1 and God\'s creative work.', sermon_date: '2023-12-31', is_featured: false },
        { title: 'The Lord is My Shepherd', speaker: 'Pastor Bruce', series: 'Psalms', scripture_reference: 'Psalm 23', description: 'Finding comfort and guidance in Psalm 23.', sermon_date: '2023-12-24', is_featured: false },
        { title: 'In the Beginning Was the Word', speaker: 'Pastor Bruce', series: 'Gospel of John', scripture_reference: 'John 1:1-14', description: 'The deity of Christ revealed in John 1:1-14.', sermon_date: '2023-12-17', is_featured: false },
      ];
      for (const s of sermons) {
        await query(
          'INSERT INTO sermons (title, speaker, series, scripture_reference, description, sermon_date, is_featured) VALUES ($1,$2,$3,$4,$5,$6,$7)',
          [s.title, s.speaker, s.series, s.scripture_reference, s.description, s.sermon_date, s.is_featured]
        );
      }
      results.sermons = sermons.length;
    } else {
      results.sermons = 0;
    }

    // ── SPECIAL SERVICES ───────────────────────────────────────────────────
    const existingSvc = await query('SELECT COUNT(*) FROM church_services');
    if (parseInt(existingSvc.rows[0].count, 10) === 0) {
      const services = [
        { title: 'Christmas Service', description: 'Celebrate the birth of our Savior Jesus Christ with special music and message.', service_type: 'christmas', service_date: '2024-12-25' },
        { title: 'Easter Service', description: 'Rejoice in the resurrection of Jesus Christ with communion and baptisms.', service_type: 'easter', service_date: '2024-03-31' },
        { title: 'Baptism Service — September 2025', description: 'We rejoice with the believers who publicly declared their faith through baptism. A blessed day as we witnessed precious souls take this important step in their walk with Christ.', service_type: 'baptism', service_date: '2025-09-07' },
      ];
      for (const s of services) {
        await query(
          'INSERT INTO church_services (title, description, service_type, service_date, media_urls) VALUES ($1,$2,$3,$4,$5)',
          [s.title, s.description, s.service_type, s.service_date, '[]']
        );
      }
      results.church_services = services.length;
    } else {
      results.church_services = 0;
    }

    res.status(200).json({
      success: true,
      message: 'Default data seeded successfully',
      seeded: results,
      skipped: Object.entries(results).filter(([, v]) => v === 0).map(([k]) => k),
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ error: 'Failed to seed data', details: String(error) });
  }
}
