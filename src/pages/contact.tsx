import React, { useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Facebook, Send, MessageCircle, User, Calendar } from 'lucide-react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    requestType: 'general'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      requestType: 'general'
    });
  };

  const staffMembers = [
    {
      name: "Pastor Bruce",
      title: "Senior Pastor",
      email: "Pst.bruce67@gmail.com",
      phone: "+254735464102",
      image: "/images/pastor-bruce.jpg"
    },
    {
      name: "Church Secretary",
      title: "Church Administration",
      email: "admin@calvaryjesus.org",
      phone: "+254700000000",
      image: "/images/secretary.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Navigation */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3">
              <img src="/images/logo1.jpg" alt="Calvary Jesus Church" className="h-12 w-12 rounded-full" />
              <span className="text-xl font-bold text-gray-900">Calvary Jesus Church</span>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600">Home</Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600">About Us</Link>
              <Link href="/services" className="text-gray-600 hover:text-blue-600">Services</Link>
              <Link href="/ministries" className="text-gray-600 hover:text-blue-600">Ministries</Link>
              <Link href="/events" className="text-gray-600 hover:text-blue-600">Events</Link>
              <Link href="/resources" className="text-gray-600 hover:text-blue-600">Resources</Link>
              <Link href="/give" className="text-gray-600 hover:text-blue-600">Give</Link>
              <Link href="/contact" className="text-blue-600 font-semibold">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <MessageCircle className="w-16 h-16 mx-auto mb-4 text-blue-200" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            We'd love to hear from you. Get in touch with us today!
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
              <p className="text-gray-600 mb-8">
                Whether you have questions about our services, need prayer, or want to learn more about our church, 
                we're here to help. Reach out to us using any of the methods below.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <MapPin className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-lg font-bold text-gray-900">Our Locations</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900">Nyaduong' Village</h4>
                    <p className="text-gray-600">Next to Nyaduong' Secondary and Primary Schools</p>
                    <p className="text-sm text-gray-500">Sunday Service: 9:00 AM - 12:00 PM</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Migori Town</h4>
                    <p className="text-gray-600">Oruba, inside Dip Primary School</p>
                    <p className="text-sm text-gray-500">Sunday Service: 2:00 PM - 4:00 PM</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <Phone className="w-6 h-6 text-green-600 mr-3" />
                  <h3 className="text-lg font-bold text-gray-900">Phone</h3>
                </div>
                <a 
                  href="tel:+254735464102" 
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  +254735464102
                </a>
                <p className="text-sm text-gray-500 mt-1">Available during office hours</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <Mail className="w-6 h-6 text-red-600 mr-3" />
                  <h3 className="text-lg font-bold text-gray-900">Email</h3>
                </div>
                <a 
                  href="mailto:Pst.bruce67@gmail.com" 
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Pst.bruce67@gmail.com
                </a>
                <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <Facebook className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="text-lg font-bold text-gray-900">Social Media</h3>
                </div>
                <a 
                  href="https://www.facebook.com/profile.php?id=100064378341874" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Follow our Facebook Page
                </a>
                <p className="text-sm text-gray-500 mt-1">Stay updated with our latest activities</p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <Clock className="w-6 h-6 text-purple-600 mr-3" />
                  <h3 className="text-lg font-bold text-gray-900">Service Times</h3>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sunday Services:</span>
                    <span className="font-medium">9:00 AM - 12:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Evening Service:</span>
                    <span className="font-medium">2:00 PM - 4:00 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="requestType" className="block text-sm font-medium text-gray-700 mb-2">
                    Type of Request
                  </label>
                  <select
                    id="requestType"
                    name="requestType"
                    value={formData.requestType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="general">General Inquiry</option>
                    <option value="prayer">Prayer Request</option>
                    <option value="pastoral">Pastoral Care</option>
                    <option value="ministry">Ministry Information</option>
                    <option value="event">Event Information</option>
                    <option value="volunteer">Volunteer Opportunities</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0700000000"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Brief subject of your message"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Please share your message or prayer request..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Staff Directory */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Staff</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {staffMembers.map((staff, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{staff.name}</h3>
                <p className="text-gray-600 mb-4">{staff.title}</p>
                <div className="space-y-2">
                  <a 
                    href={`mailto:${staff.email}`} 
                    className="block text-blue-600 hover:text-blue-700"
                  >
                    {staff.email}
                  </a>
                  <a 
                    href={`tel:${staff.phone}`} 
                    className="block text-green-600 hover:text-green-700"
                  >
                    {staff.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Find Us</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.4799877335027!2d34.47337571532466!3d-1.063975599286632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19d6d5d20ef2b8f5%3A0x24f0b2d8dcdd1c7f!2sNyaduong'%20Secondary%20School!5e0!3m2!1sen!2ske!4v1709878675012!5m2!1sen!2ske"
              width="100%" 
              height="400" 
              style={{ border: 0 }}
              allowFullScreen 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <div className="space-y-2">
                <p>📧 Pst.bruce67@gmail.com</p>
                <p>📱 +254735464102</p>
                <p>📍 Migori, Kenya</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Service Times</h3>
              <div className="space-y-2">
                <p>Sunday: 9:00 AM - 12:00 PM</p>
                <p>Nyaduong' Village</p>
                <p>Sunday: 2:00 PM - 4:00 PM</p>
                <p>Oruba, Migori Town</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Follow Us</h3>
              <a 
                href="https://www.facebook.com/profile.php?id=100064378341874" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300"
              >
                Facebook Page
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p>&copy; 2024 Calvary Jesus Church. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContactPage;
