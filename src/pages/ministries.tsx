import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const MinistriesPage = () => {
  const ministries = [
    {
      id: 'children',
      title: 'Children\'s Ministry',
      icon: '👶',
      description: 'Building a strong foundation of faith in our youngest members through age-appropriate Bible teaching and activities.',
      details: [
        'Sunday School classes for ages 3-12',
        'Bible stories and memory verses',
        'Character-building activities',
        'Special children\'s events and programs'
      ],
      contact: 'children@calvaryjesuschurch.org',
      schedule: 'Sundays during main service'
    },
    {
      id: 'youth',
      title: 'Youth Ministry',
      icon: '🎯',
      description: 'Empowering teenagers to grow in their faith and develop a personal relationship with Jesus Christ.',
      details: [
        'Weekly youth gatherings',
        'Bible study and discussion groups',
        'Youth camps and retreats',
        'Community service projects',
        'Mentorship programs'
      ],
      contact: 'youth@calvaryjesuschurch.org',
      schedule: 'Saturdays 3:00 PM - 5:00 PM'
    },
    {
      id: 'adults',
      title: 'Adult Ministry',
      icon: '📖',
      description: 'Strengthening adult believers through in-depth Bible study, fellowship, and spiritual growth opportunities.',
      details: [
        'Adult Bible study groups',
        'Marriage and family seminars',
        'Men\'s and women\'s fellowship',
        'Leadership development',
        'Prayer groups and spiritual mentoring'
      ],
      contact: 'adults@calvaryjesuschurch.org',
      schedule: 'Various times throughout the week'
    },
    {
      id: 'music',
      title: 'Music Ministry',
      icon: '🎵',
      description: 'Leading the congregation in worship through music that honors God and edifies the church.',
      details: [
        'Congregational worship leading',
        'Choir and special music',
        'Instrument training and coordination',
        'Seasonal musical presentations',
        'Hymn and contemporary worship'
      ],
      contact: 'music@calvaryjesuschurch.org',
      schedule: 'Practice: Saturdays 10:00 AM'
    },
    {
      id: 'outreach',
      title: 'Outreach Ministry',
      icon: '🤝',
      description: 'Extending Christ\'s love to our community through evangelism, service, and compassionate care.',
      details: [
        'Community evangelism programs',
        'Hospital and nursing home visits',
        'Food and clothing distribution',
        'Prison ministry',
        'Missionary support and involvement'
      ],
      contact: 'outreach@calvaryjesuschurch.org',
      schedule: 'Various community events'
    },
    {
      id: 'prayer',
      title: 'Prayer Ministry',
      icon: '🙏',
      description: 'Interceding for our church, community, and world through organized prayer initiatives.',
      details: [
        'Weekly prayer meetings',
        'Prayer request coordination',
        'Intercessory prayer teams',
        'Prayer for healing and special needs',
        'Prayer walks and community prayer'
      ],
      contact: 'prayer@calvaryjesuschurch.org',
      schedule: 'Wednesdays 7:00 PM'
    }
  ];

  return (
    <>
      <Head>
        <title>Ministries - Calvary Jesus Church</title>
        <meta name="description" content="Discover the various ministries at Calvary Jesus Church. Find opportunities to serve, grow, and connect with your church community." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-blue-900 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-6">Our Ministries</h1>
            <p className="text-xl text-center max-w-3xl mx-auto">
              Discover opportunities to serve, grow, and connect in meaningful ways within our church community.
            </p>
          </div>
        </section>

        {/* Ministry Overview */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Get Involved</h2>
              <p className="text-lg text-gray-600 mb-8">
                At Calvary Jesus Church, we believe that every believer has been gifted by God to serve the body of Christ. 
                Our ministries provide opportunities for spiritual growth, fellowship, and service to God and others.
              </p>
              <blockquote className="bg-blue-50 border-l-4 border-blue-500 p-6 italic text-gray-700">
                "As each has received a gift, use it to serve one another, as good stewards of God's varied grace." 
                - 1 Peter 4:10
              </blockquote>
            </div>
          </div>
        </section>

        {/* Ministries Grid */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {ministries.map((ministry) => (
                <div key={ministry.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="bg-blue-900 text-white p-6">
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-4">{ministry.icon}</span>
                      <h3 className="text-2xl font-semibold">{ministry.title}</h3>
                    </div>
                    <p className="text-blue-200">{ministry.description}</p>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3">What We Do:</h4>
                      <ul className="space-y-2">
                        {ministry.details.map((detail, index) => (
                          <li key={index} className="text-gray-600 text-sm flex items-start">
                            <span className="text-blue-500 mr-2">•</span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-6">
                      <div className="grid grid-cols-1 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-1">Schedule:</h4>
                          <p className="text-gray-600 text-sm">{ministry.schedule}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-1">Contact:</h4>
                          <p className="text-gray-600 text-sm">{ministry.contact}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        href={`/contact?ministry=${ministry.id}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors text-center"
                      >
                        Get Involved
                      </Link>
                      <Link
                        href={`/contact?inquiry=${ministry.id}`}
                        className="border-2 border-blue-600 hover:bg-blue-600 hover:text-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold transition-colors text-center"
                      >
                        Learn More
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Volunteer Opportunities */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Volunteer Opportunities</h2>
              
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">Regular Volunteer Roles</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Sunday School Teachers
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Worship Team Members
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Greeters and Ushers
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Prayer Team Members
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Community Outreach Coordinators
                    </li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">Special Event Volunteers</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Holiday Service Coordinators
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Baptism Assistants
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Community Event Helpers
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Youth Event Chaperones
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      Administrative Support
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Ready to Serve?</h3>
                <p className="text-gray-600 mb-6">
                  God has equipped each of us with unique gifts and talents. Whether you have a few minutes or a few hours, 
                  there's a place for you to serve in our church family.
                </p>
                <Link
                  href="/contact"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                >
                  Volunteer Today
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Ministry Leadership */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Ministry Leadership</h2>
              <p className="text-lg text-gray-600 mb-8">
                Our ministries are led by dedicated servants who are passionate about serving God and His people. 
                Each ministry leader is committed to biblical teaching and spiritual growth.
              </p>
              
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold text-blue-900 mb-4">Interested in Ministry Leadership?</h3>
                <p className="text-gray-600 mb-6">
                  We're always looking for faithful servants who feel called to lead in ministry. Leadership roles 
                  require a commitment to biblical truth, spiritual maturity, and a heart for serving others.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact?subject=ministry-leadership"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Explore Leadership
                  </Link>
                  <Link
                    href="/about#leadership"
                    className="border-2 border-blue-600 hover:bg-blue-600 hover:text-white text-blue-600 px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Meet Our Leaders
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-blue-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Find Your Place to Serve</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              God has uniquely gifted you to serve His kingdom. Join us in making a difference in our church and community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Get Started Today
              </Link>
              <Link
                href="/services"
                className="border-2 border-white hover:bg-white hover:text-blue-900 px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Visit Our Services
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default MinistriesPage;
