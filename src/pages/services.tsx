import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Play, Download, Search } from 'lucide-react';

const ServicesPage = () => {
  const [activeTab, setActiveTab] = useState('times');
  const [sermonFilters, setSermonFilters] = useState({
    series: 'all',
    speaker: 'all',
    year: 'all'
  });

  const serviceLocations = [
    {
      name: "Nyaduong' Village Service",
      time: "9:00 AM - 12:00 PM",
      day: "Sunday",
      location: "Nyaduong' Village",
      details: "Next to Nyaduong' Secondary and Primary Schools",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.4799877335027!2d34.47337571532466!3d-1.063975599286632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19d6d5d20ef2b8f5%3A0x24f0b2d8dcdd1c7f!2sNyaduong'%20Secondary%20School!5e0!3m2!1sen!2ske!4v1709878675012!5m2!1sen!2ske"
    },
    {
      name: "Migori Town Service",
      time: "2:00 PM - 4:00 PM",
      day: "Sunday",
      location: "Oruba, Migori Town",
      details: "Inside Dip Primary School",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.4799877335027!2d34.47337571532466!3d-1.063975599286632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19d6d5d20ef2b8f5%3A0x24f0b2d8dcdd1c7f!2sMigori!5e0!3m2!1sen!2ske!4v1709878675012!5m2!1sen!2ske"
    }
  ];

  const specialEvents = [
    {
      title: "Christmas Service",
      description: "Join us for our special Christmas worship service celebrating the birth of our Savior.",
      date: "December 25th",
      time: "9:00 AM",
      location: "Both locations"
    },
    {
      title: "Easter Service",
      description: "Celebrate the resurrection of Jesus Christ with our Easter worship service.",
      date: "Easter Sunday",
      time: "9:00 AM",
      location: "Both locations"
    },
    {
      title: "Baptism Services",
      description: "Monthly baptism services for new believers making their public declaration of faith.",
      date: "First Sunday of each month",
      time: "After morning service",
      location: "Nyaduong' Village"
    },
    {
      title: "Youth Conference",
      description: "Annual youth conference focusing on discipleship and spiritual growth.",
      date: "July 15-17",
      time: "9:00 AM - 5:00 PM",
      location: "Nyaduong' Village"
    },
    {
      title: "Bible Study Workshop",
      description: "Intensive Bible study sessions for deeper understanding of Scripture.",
      date: "Every Wednesday",
      time: "6:00 PM - 8:00 PM",
      location: "Migori Town"
    }
  ];

  const sermons = [
    {
      title: "The Authority of Scripture",
      speaker: "Pastor Bruce",
      date: "January 2024",
      series: "Gospel of John",
      scripture: "2 Timothy 3:16-17",
      description: "Understanding the complete sufficiency and authority of God's Word in the believer's life.",
      year: "2024"
    },
    {
      title: "Salvation by Grace Through Faith",
      speaker: "Pastor Bruce",
      date: "December 2023",
      series: "Romans",
      scripture: "Ephesians 2:8-9",
      description: "Exploring the biblical doctrine of salvation and the role of faith in justification.",
      year: "2023"
    },
    {
      title: "The Necessity of Christ's Sacrifice",
      speaker: "Pastor Bruce",
      date: "November 2023",
      series: "Romans",
      scripture: "Hebrews 9:22",
      description: "Why the blood of Jesus Christ was necessary for our salvation and forgiveness of sins.",
      year: "2023"
    },
    {
      title: "Walking in the Light",
      speaker: "Pastor Bruce",
      date: "October 2023",
      series: "Gospel of John",
      scripture: "1 John 1:7",
      description: "Living a life that reflects the light of Christ in our daily walk.",
      year: "2023"
    },
    {
      title: "The Great Commission",
      speaker: "Pastor Bruce",
      date: "September 2023",
      series: "Genesis",
      scripture: "Matthew 28:19-20",
      description: "Our calling to make disciples of all nations and the power to fulfill this mission.",
      year: "2023"
    },
    {
      title: "Love One Another",
      speaker: "Pastor Bruce",
      date: "August 2023",
      series: "Gospel of John",
      scripture: "John 13:34-35",
      description: "The commandment to love as Christ loved us and its impact on our witness.",
      year: "2023"
    }
  ];

  const filteredSermons = sermons.filter(sermon => {
    return (
      (sermonFilters.series === 'all' || sermon.series === sermonFilters.series) &&
      (sermonFilters.speaker === 'all' || sermon.speaker === sermonFilters.speaker) &&
      (sermonFilters.year === 'all' || sermon.year === sermonFilters.year)
    );
  });

  const handleFilterChange = (filterType, value) => {
    setSermonFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl max-w-3xl mx-auto leading-relaxed">
              We are dedicated to unleashing God's truth one verse at a time. Teaching the Bible is our focus.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-lg sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto">
            {[
              { id: 'times', label: 'Service Times', icon: Clock },
              { id: 'online', label: 'Online Services', icon: Play },
              { id: 'special', label: 'Special Events', icon: Calendar },
              { id: 'archive', label: 'Sermon Archive', icon: Download }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center space-x-2 py-4 px-6 border-b-3 font-medium text-sm whitespace-nowrap transition-all duration-200 ${
                  activeTab === id 
                    ? 'border-blue-500 text-blue-600 bg-blue-50' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-16">
        {/* Service Times Tab */}
        {activeTab === 'times' && (
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Weekly Service Schedule</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Join us for worship, biblical teaching, and fellowship at our two locations
              </p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {serviceLocations.map((service, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300">
                  <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-8">
                    <h3 className="text-2xl font-bold mb-3">{service.name}</h3>
                    <div className="flex items-center space-x-4 text-blue-100">
                      <div className="flex items-center space-x-2">
                        <Calendar size={20} />
                        <span>{service.day}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock size={20} />
                        <span>{service.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-8">
                    <div className="mb-6">
                      <div className="flex items-start space-x-3 mb-4">
                        <MapPin className="text-blue-600 mt-1 flex-shrink-0" size={20} />
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-1">Location</h4>
                          <p className="text-gray-600">{service.location}</p>
                          <p className="text-gray-500 text-sm">{service.details}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3">What to Expect</h4>
                      <ul className="text-gray-600 space-y-2">
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Biblical teaching and exposition</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Worship and praise</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Prayer and fellowship</span>
                        </li>
                        <li className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span>Warm, welcoming community</span>
                        </li>
                      </ul>
                    </div>
                    <div className="rounded-lg overflow-hidden">
                      <iframe
                        src={service.mapUrl}
                        width="100%"
                        height="250"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Online Services Tab */}
        {activeTab === 'online' && (
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Online Worship</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Connect with us digitally and be part of our worship community from anywhere
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
                <h3 className="text-3xl font-bold text-blue-900 mb-6 flex items-center">
                  <Play className="mr-3 text-blue-600" size={28} />
                  Live Streaming
                </h3>
                <p className="text-gray-600 mb-8 text-lg">
                  Can't make it to our physical location? Join us online for live streaming of our services.
                </p>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-xl mb-8">
                  <p className="text-center text-gray-700 mb-6 text-lg">Live stream will be available here during service times</p>
                  <div className="bg-gray-800 h-80 rounded-xl flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-blue-800/80"></div>
                    <div className="relative z-10 text-center text-white">
                      <Play size={64} className="mx-auto mb-4 opacity-80" />
                      <p className="text-xl font-semibold">Live Stream Player</p>
                      <p className="text-blue-200 mt-2">Available during service times</p>
                    </div>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                    <h4 className="font-bold text-gray-800 mb-3 text-lg">Morning Service</h4>
                    <p className="text-gray-600 text-lg">Sunday 9:00 AM - 12:00 PM</p>
                    <p className="text-gray-500 text-sm mt-2">Nyaduong' Village Location</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                    <h4 className="font-bold text-gray-800 mb-3 text-lg">Afternoon Service</h4>
                    <p className="text-gray-600 text-lg">Sunday 2:00 PM - 4:00 PM</p>
                    <p className="text-gray-500 text-sm mt-2">Migori Town Location</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-3xl font-bold text-blue-900 mb-6">Follow Us Online</h3>
                <p className="text-gray-600 mb-8 text-lg">
                  Stay connected with our church community through our social media channels and receive updates on services, events, and prayer requests.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a 
                    href="https://www.facebook.com/profile.php?id=100064378341874" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 text-center"
                  >
                    Facebook Page
                  </a>
                  <a 
                    href="mailto:Pst.bruce67@gmail.com"
                    className="border-2 border-blue-600 hover:bg-blue-600 hover:text-white text-blue-600 px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 text-center"
                  >
                    Email Us
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Special Events Tab */}
        {activeTab === 'special' && (
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Special Events</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Join us for special celebrations, conferences, and ministry events throughout the year
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="grid gap-6">
                {specialEvents.map((event, index) => (
                  <div key={index} className="bg-white rounded-2xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-blue-900 mb-3">{event.title}</h3>
                        <p className="text-gray-600 mb-4 text-lg leading-relaxed">{event.description}</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
                            <Calendar className="text-blue-600" size={16} />
                            <span className="font-medium text-gray-800">Date: </span>
                            <span className="text-gray-600">{event.date}</span>
                          </div>
                          <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
                            <Clock className="text-blue-600" size={16} />
                            <span className="font-medium text-gray-800">Time: </span>
                            <span className="text-gray-600">{event.time}</span>
                          </div>
                          <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
                            <MapPin className="text-blue-600" size={16} />
                            <span className="font-medium text-gray-800">Location: </span>
                            <span className="text-gray-600">{event.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 lg:mt-0 lg:ml-6">
                        <button className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                          Learn More
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Sermon Archive Tab */}
        {activeTab === 'archive' && (
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Sermon Archive</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Access our collection of biblical teachings and sermons focused on God's Word
              </p>
            </div>
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-3xl font-bold text-blue-900 mb-6 flex items-center">
                  <Download className="mr-3 text-blue-600" size={28} />
                  Recent Sermons
                </h3>
                
                {/* Sermon Filters */}
                <div className="mb-8">
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <Search className="text-gray-500" size={20} />
                      <span className="text-gray-700 font-medium">Filter by:</span>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <select 
                      className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={sermonFilters.series}
                      onChange={(e) => handleFilterChange('series', e.target.value)}
                    >
                      <option value="all">All Series</option>
                      <option value="Gospel of John">Gospel of John</option>
                      <option value="Romans">Romans</option>
                      <option value="Genesis">Genesis</option>
                    </select>
                    <select 
                      className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={sermonFilters.speaker}
                      onChange={(e) => handleFilterChange('speaker', e.target.value)}
                    >
                      <option value="all">All Speakers</option>
                      <option value="Pastor Bruce">Pastor Bruce</option>
                    </select>
                    <select 
                      className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={sermonFilters.year}
                      onChange={(e) => handleFilterChange('year', e.target.value)}
                    >
                      <option value="all">All Years</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                    </select>
                  </div>
                </div>

                {/* Sermon List */}
                <div className="space-y-6">
                  {filteredSermons.map((sermon, index) => (
                    <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-200">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                        <div className="flex-1">
                          <h4 className="text-xl font-bold text-gray-800 mb-2">{sermon.title}</h4>
                          <p className="text-gray-600 mb-2">
                            <span className="font-medium">{sermon.scripture}</span> • {sermon.speaker} • {sermon.date}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                              {sermon.series}
                            </span>
                            <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                              {sermon.year}
                            </span>
                          </div>
                          <p className="text-gray-600 leading-relaxed">{sermon.description}</p>
                        </div>
                        <div className="mt-4 lg:mt-0 lg:ml-6">
                          <button className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2">
                            <Play size={18} />
                            <span>Watch/Listen</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {filteredSermons.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No sermons found matching your filters.</p>
                  </div>
                )}
                
                <div className="mt-8 text-center">
                  <button className="border-2 border-blue-600 hover:bg-blue-600 hover:text-white text-blue-600 px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105">
                    View All Sermons
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Us This Sunday</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
            Experience the transformative power of God's Word in a welcoming community of believers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105">
              Contact Us
            </a>
            <a href="/about" className="border-2 border-white hover:bg-white hover:text-blue-900 px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105">
              Learn More
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
