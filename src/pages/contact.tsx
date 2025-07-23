import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MapPin, Phone, Mail, Clock, Send, User, MessageSquare, Heart } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    prayerRequest: '',
    isSecret: false,
    allowContact: false
  });

  const [activeTab, setActiveTab] = useState<'contact' | 'prayer'>('contact');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    alert('Thank you for your message. We will get back to you soon!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Contact Information */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Location */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Locations</h3>
              <div className="text-gray-600 space-y-2">
                <p className="font-medium">Nyaduong' Village</p>
                <p className="text-sm">Next to Nyaduong' Secondary & Primary Schools</p>
                <p className="font-medium mt-3">Migori Town</p>
                <p className="text-sm">Oruba, Dip Primary School</p>
              </div>
            </div>

            {/* Service Times */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Service Times</h3>
              <div className="text-gray-600 space-y-2">
                <p className="font-medium">Sunday Services</p>
                <p className="text-sm">9:00 AM - 12:00 PM<br />Nyaduong' Village</p>
                <p className="text-sm">2:00 PM - 4:00 PM<br />Migori Town</p>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Phone className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
              <div className="text-gray-600 space-y-2">
                <a href="tel:+254735464102" className="block hover:text-purple-600 transition duration-300">
                  +254 735 464 102
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Mail className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h3>
              <div className="text-gray-600 space-y-2">
                <a href="mailto:Pst.bruce67@gmail.com" className="block hover:text-red-600 transition duration-300">
                  Pst.bruce67@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Form Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            {/* Tab Navigation */}
            <div className="flex mb-8 border-b">
              <button
                onClick={() => setActiveTab('contact')}
                className={`flex-1 py-4 px-6 text-center font-semibold transition duration-300 ${
                  activeTab === 'contact'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <MessageSquare className="h-5 w-5 inline-block mr-2" />
                General Contact
              </button>
              <button
                onClick={() => setActiveTab('prayer')}
                className={`flex-1 py-4 px-6 text-center font-semibold transition duration-300 ${
                  activeTab === 'prayer'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Heart className="h-5 w-5 inline-block mr-2" />
                Prayer Request
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Common Fields */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+254 xxx xxx xxx"
                    />
                  </div>
                </div>
              </div>

              {/* Tab-specific content */}
              {activeTab === 'contact' ? (
                <>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="visit">Planning to Visit</option>
                      <option value="ministry">Ministry Information</option>
                      <option value="baptism">Baptism</option>
                      <option value="wedding">Wedding Ceremony</option>
                      <option value="counseling">Counseling</option>
                      <option value="volunteer">Volunteer Opportunities</option>
                      <option value="other">Other</option>
                    </select>
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
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                      placeholder="Please share your message with us..."
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label htmlFor="prayerRequest" className="block text-sm font-medium text-gray-700 mb-2">
                      Prayer Request *
                    </label>
                    <textarea
                      id="prayerRequest"
                      name="prayerRequest"
                      value={formData.prayerRequest}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                      placeholder="Share your prayer request with us..."
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isSecret"
                        name="isSecret"
                        checked={formData.isSecret}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="isSecret" className="ml-2 block text-sm text-gray-700">
                        This is a confidential prayer request
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="allowContact"
                        name="allowContact"
                        checked={formData.allowContact}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor="allowContact" className="ml-2 block text-sm text-gray-700">
                        You may contact me for a one-on-one talk
                      </label>
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300 font-semibold text-lg flex items-center justify-center"
              >
                <Send className="h-5 w-5 mr-2" />
                Send {activeTab === 'contact' ? 'Message' : 'Prayer Request'}
              </button>
            </form>
          </div>

          {/* Map and Additional Info */}
          <div className="space-y-8">
            {/* Google Map */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">Find Us</h3>
                <p className="text-gray-600 mb-4">
                  Visit us at either of our service locations. We'd love to welcome you to our church family.
                </p>
              </div>
              
              <div className="h-96">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3321.4799877335027!2d34.47337571532466!3d-1.063975599286632!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19d6d5d20ef2b8f5%3A0x24f0b2d8dcdd1c7f!2sNyaduong'%20Secondary%20School!5e0!3m2!1sen!2ske!4v1709878675012!5m2!1sen!2ske"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Church Location Map"
                />
              </div>
            </div>

            {/* Staff Directory */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Church Leadership</h3>
              <div className="space-y-4">
                <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Pastor Bruce</h4>
                    <p className="text-sm text-gray-600">Senior Pastor</p>
                    <a href="mailto:Pst.bruce67@gmail.com" className="text-sm text-blue-600 hover:underline">
                      Pst.bruce67@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <User className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Oliver Oyando</h4>
                    <p className="text-sm text-gray-600">Church Secretary</p>
                    <p className="text-sm text-gray-600">Administrative and communication tasks</p>
                  </div>
                </div>

                <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <User className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Kevin Odhiambo</h4>
                    <p className="text-sm text-gray-600">IT Manager</p>
                    <p className="text-sm text-gray-600">Technology, systems, and digital communication platforms</p>
                  </div>
                </div>

                <div className="flex items-center p-4 border border-gray-200 rounded-lg">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                    <User className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Fredrick</h4>
                    <p className="text-sm text-gray-600">Worship Leader</p>
                    <p className="text-sm text-gray-600">Music Ministry</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Info */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
              <h3 className="text-xl font-semibold mb-4">Need Immediate Prayer?</h3>
              <p className="mb-4">
                If you have an urgent prayer need, don't hesitate to call us directly. We're here for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+254735464102"
                  className="flex items-center justify-center bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-100 transition duration-300 font-semibold"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100064378341874"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-900 transition duration-300 font-semibold"
                >
                  Message on Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bible Verse */}
        <section className="text-center py-12">
          <blockquote className="text-2xl font-medium text-gray-900 italic max-w-4xl mx-auto">
            "Call to me and I will answer you and tell you great and unsearchable things you do not know."
          </blockquote>
          <cite className="text-lg text-gray-600 mt-4 block">- Jeremiah 33:3</cite>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
