import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Users, Heart, Music, Baby, Gamepad2, Globe } from 'lucide-react';

export default function Ministries() {
  const [selectedMinistry, setSelectedMinistry] = useState(null);

  const ministries = [
    {
      id: 'children',
      title: 'Children\'s Ministry',
      icon: Baby,
      description: 'Nurturing young hearts with Bible stories, songs, and age-appropriate activities that help children understand God\'s love.',
      image: '/images/ministries/children.jpg',
      ageGroup: 'Ages 3-12',
      schedule: 'Sunday 9:00 AM - 11:00 AM',
      location: 'Children\'s Room, Nyaduong\' Village',
      contact: 'children@calvaryjesus.org',
      leader: 'Sister Mary',
      activities: [
        'Bible storytelling with visual aids',
        'Scripture memory verses',
        'Christian songs and worship',
        'Arts and crafts with Biblical themes',
        'Character building lessons',
        'Special holiday programs'
      ],
      goals: [
        'Introduce children to Jesus Christ',
        'Teach foundational Bible stories',
        'Develop Christian character',
        'Create a safe learning environment'
      ]
    },
    {
      id: 'youth',
      title: 'Youth Ministry',
      icon: Gamepad2,
      description: 'Empowering teenagers to grow in their faith, build godly relationships, and navigate life\'s challenges with Biblical wisdom.',
      image: '/images/ministries/youth.jpg',
      ageGroup: 'Ages 13-18',
      schedule: 'Sunday 2:00 PM - 4:00 PM',
      location: 'Youth Hall, Nyaduong\' Village',
      contact: 'youth@calvaryjesus.org',
      leader: 'Elder Johnson',
      activities: [
        'Bible study and discussion groups',
        'Youth worship and praise',
        'Life skills and mentorship',
        'Community service projects',
        'Fellowship games and activities',
        'Discipleship training'
      ],
      goals: [
        'Help youth develop personal relationship with Christ',
        'Provide Biblical guidance for life decisions',
        'Build strong Christian friendships',
        'Prepare youth for adult ministry'
      ]
    },
    {
      id: 'adults',
      title: 'Adult Ministry',
      icon: Users,
      description: 'Supporting adults in their spiritual growth through in-depth Bible study, fellowship, and practical application of God\'s Word.',
      image: '/images/ministries/adults.jpg',
      ageGroup: 'Ages 19+',
      schedule: 'Wednesday 7:00 PM - 9:00 PM',
      location: 'Main Sanctuary, Both Locations',
      contact: 'adults@calvaryjesus.org',
      leader: 'Pastor Bruce',
      activities: [
        'Expository Bible teaching',
        'Small group discussions',
        'Prayer and intercession',
        'Marriage and family seminars',
        'Leadership development',
        'Evangelism training'
      ],
      goals: [
        'Deepen understanding of Scripture',
        'Strengthen marriages and families',
        'Develop mature Christian leaders',
        'Equip members for ministry'
      ]
    },
    {
      id: 'music',
      title: 'Music Ministry',
      icon: Music,
      description: 'Leading the congregation in worship through music that honors God and edifies the church body.',
      image: '/images/ministries/music.jpg',
      ageGroup: 'All Ages',
      schedule: 'Saturday 4:00 PM - 6:00 PM (Practice)',
      location: 'Main Sanctuary, Nyaduong\' Village',
      contact: 'worship@calvaryjesus.org',
      leader: 'Sarah (Worship Leader)',
      activities: [
        'Congregational singing leadership',
        'Special music presentations',
        'Instrumental accompaniment',
        'Choir performances',
        'Music training and workshops',
        'Worship team development'
      ],
      goals: [
        'Lead congregation in biblical worship',
        'Use music to teach spiritual truths',
        'Develop musical talents for God\'s glory',
        'Create atmosphere for worship'
      ]
    },
    {
      id: 'outreach',
      title: 'Outreach Ministry',
      icon: Globe,
      description: 'Sharing the Gospel message with our community through evangelism, service projects, and compassionate care.',
      image: '/images/ministries/outreach.jpg',
      ageGroup: 'All Ages',
      schedule: 'Saturday 9:00 AM - 12:00 PM',
      location: 'Various Community Locations',
      contact: 'outreach@calvaryjesus.org',
      leader: 'Elder Johnson',
      activities: [
        'Door-to-door evangelism',
        'Community service projects',
        'Food distribution to needy families',
        'Hospital and prison visits',
        'Street preaching and tract distribution',
        'Community cleanup initiatives'
      ],
      goals: [
        'Share the Gospel with the lost',
        'Show Christ\'s love through service',
        'Meet practical needs of community',
        'Build relationships for witnessing'
      ]
    },
    {
      id: 'pastoral-care',
      title: 'Pastoral Care',
      icon: Heart,
      description: 'Providing spiritual care, counseling, and support to church members during times of joy, sorrow, and spiritual growth.',
      image: '/images/ministries/pastoral-care.jpg',
      ageGroup: 'All Ages',
      schedule: 'By Appointment',
      location: 'Pastor\'s Office / Home Visits',
      contact: 'Pst.bruce67@gmail.com',
      leader: 'Pastor Bruce',
      activities: [
        'Personal counseling and guidance',
        'Hospital and home visits',
        'Grief and crisis support',
        'Pre-marital counseling',
        'Spiritual direction and discipleship',
        'Crisis intervention and support'
      ],
      goals: [
        'Provide Christ-centered care',
        'Support members through life transitions',
        'Offer Biblical counseling',
        'Build strong pastoral relationships'
      ]
    }
  ];

  return (
    <>
      <Head>
        <title>Ministries - Calvary Jesus Church</title>
        <meta name="description" content="Explore all our ministries serving different age groups and spiritual needs." />
      </Head>

      <Header />

      <main className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Ministries</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Serving our community through Christ-centered ministries that nurture faith and build relationships.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Find Your Place to Serve & Grow</h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                Whether you’re looking to serve or grow in faith, there’s a ministry waiting for you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ministries.map((ministry) => (
                <div
                  key={ministry.id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer"
                  onClick={() => setSelectedMinistry(ministry)}
                >
                  <img src={ministry.image} alt={ministry.title} className="w-full h-48 object-cover rounded-t-xl" />
                  <div className="p-6">
                    <ministry.icon className="w-8 h-8 text-blue-600 mb-2" />
                    <h3 className="text-xl font-semibold mb-2">{ministry.title}</h3>
                    <p className="text-gray-600 text-sm">{ministry.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-blue-600 text-white py-16 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Involved?</h2>
            <p className="text-lg max-w-xl mx-auto mb-6">
              Join one of our ministries and be part of something bigger. Experience the joy of serving others.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact" className="bg-white text-blue-600 px-6 py-3 rounded-md font-semibold">
                Contact Us
              </Link>
              <Link href="/services" className="border border-white px-6 py-3 rounded-md font-semibold">
                Visit Our Services
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Modal */}
      <Dialog open={!!selectedMinistry} onClose={() => setSelectedMinistry(null)} className="relative z-50">
        <div className="fixed inset-0 bg-black/50" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="bg-white max-w-2xl w-full rounded-xl p-6 overflow-y-auto max-h-[90vh] relative">
            <button onClick={() => setSelectedMinistry(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
              <X className="w-6 h-6" />
            </button>
            {selectedMinistry && (
              <>
                <img src={selectedMinistry.image} alt={selectedMinistry.title} className="w-full h-48 object-cover rounded-lg mb-4" />
                <h3 className="text-2xl font-bold mb-2">{selectedMinistry.title}</h3>
                <p className="mb-4 text-gray-700">{selectedMinistry.description}</p>
                <ul className="mb-4 text-sm text-gray-600">
                  <li><strong>Age Group:</strong> {selectedMinistry.ageGroup}</li>
                  <li><strong>Schedule:</strong> {selectedMinistry.schedule}</li>
                  <li><strong>Location:</strong> {selectedMinistry.location}</li>
                  <li><strong>Contact:</strong> {selectedMinistry.contact}</li>
                  <li><strong>Leader:</strong> {selectedMinistry.leader}</li>
                </ul>
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 mb-1">Activities</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {selectedMinistry.activities.map((activity, i) => (
                      <li key={i}>{activity}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 mb-1">Goals</h4>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    {selectedMinistry.goals.map((goal, i) => (
                      <li key={i}>{goal}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}

