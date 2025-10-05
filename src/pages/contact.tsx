import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { MapPin, Phone, Mail, Clock, Send, User, MessageSquare, Heart, CheckCircle, AlertCircle, Shield } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    prayerRequest: '',
    isSecret: false,
    allowContact: false,
    urgency: 'normal'
  });

  const [activeTab, setActiveTab] = useState<'contact' | 'prayer'>('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const formElement = e.target as HTMLFormElement;
      const formDataToSubmit = new FormData(formElement);
      
      const response = await fetch('https://formsubmit.co/manodhiambo@gmail.com', {
        method: 'POST',
        body: formDataToSubmit,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form data
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          prayerRequest: '',
          isSecret: false,
          allowContact: false,
          urgency: 'normal'
        });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <MapPin className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Location</h3>
              <div className="text-gray-600 space-y-2">
                <p className="font-medium">Nyaduong' Village</p>
                <p className="text-sm">Next to Nyaduong' Secondary & Primary Schools</p>
              </div>
            </div>

            {/* Service Times */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Service Times</h3>
              <div className="text-gray-600 space-y-2">
                <p className="font-medium">Sunday Services</p>
                <p className="text-sm">9:00 AM - 12:00 PM<br />Nyaduong' Village</p>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <Phone className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Call Us</h3>
              <div className="text-gray-600 space-y-2">
                <a href="tel:+254735464102" className="block hover:text-purple-600 transition duration-300 font-medium">
                  +254 735 464 102
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <Mail className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Us</h3>
              <div className="text-gray-600 space-y-2">
                <a href="mailto:Pst.bruce67@gmail.com" className="block hover:text-red-600 transition duration-300 font-medium">
                  Pst.bruce67@gmail.com
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-12">
          
          {/* Contact Form Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            {/* Tab Navigation */}
            <div className="flex mb-8 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('contact')}
                className={`flex-1 py-4 px-6 text-center font-semibold transition duration-300 rounded-t-lg ${
                  activeTab === 'contact'
                    ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <MessageSquare className="h-5 w-5 inline-block mr-2" />
                General Contact
              </button>
              <button
                onClick={() => setActiveTab('prayer')}
                className={`flex-1 py-4 px-6 text-center font-semibold transition duration-300 rounded-t-lg ${
                  activeTab === 'prayer'
                    ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <Heart className="h-5 w-5 inline-block mr-2" />
                Prayer Request
              </button>
            </div>

            {/* Success/Error Messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-green-800">
                  {activeTab === 'contact' 
                    ? 'Your message has been sent successfully. We will get back to you soon!'
                    : 'Your prayer request has been submitted successfully. Our prayer team will be interceding for you.'
                  }
                </p>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-red-800">
                  There was an error submitting your {activeTab === 'contact' ? 'message' : 'request'}. Please try again or contact us directly.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* FormSubmit Configuration - Hidden Fields */}
              <input type="hidden" name="_subject" value={activeTab === 'contact' ? 'New Contact Message - Calvary Jesus Church' : 'New Prayer Request - Calvary Jesus Church'} />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="form_type" value={activeTab} />

              {/* Common Fields */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                      placeholder="Optional"
                    />
                  </div>
                </div>
              </div>

              {/* Tab-specific content */}
              {activeTab === 'contact' ? (
                <>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
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
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors duration-300"
                      placeholder="Please share your message with us..."
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label htmlFor="prayerRequest" className="block text-sm font-semibold text-gray-700 mb-2">
                      Prayer Request *
                    </label>
                    <textarea
                      id="prayerRequest"
                      name="prayerRequest"
                      value={formData.prayerRequest}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors duration-300"
                      placeholder="Please share your prayer request with us. We believe in the power of prayer and would be honored to intercede for you."
                    />
                  </div>

                  {/* Urgency Level */}
                  <div>
                    <label htmlFor="urgency" className="block text-sm font-semibold text-gray-700 mb-2">
                      Urgency Level
                    </label>
                    <select
                      id="urgency"
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-300"
                    >
                      <option value="normal">Normal</option>
                      <option value="urgent">Urgent</option>
                      <option value="emergency">Emergency</option>
                    </select>
                  </div>

                  {/* Privacy Options */}
                  <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      Privacy Options
                    </h3>
                    
                    <div className="space-y-3">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="isSecret"
                          checked={formData.isSecret}
                          onChange={handleInputChange}
                          className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <input type="hidden" name="confidential_request" value={formData.isSecret ? 'Yes - Keep confidential' : 'No'} />
                        <div>
                          <span className="text-sm font-medium text-gray-700">
                            Keep this request confidential
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            Only our pastoral team will see this request. It will not be shared with the congregation.
                          </p>
                        </div>
                      </label>

                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          name="allowContact"
                          checked={formData.allowContact}
                          onChange={handleInputChange}
                          className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <input type="hidden" name="allow_personal_contact" value={formData.allowContact ? 'Yes - Open to contact' : 'No'} />
                        <div>
                          <span className="text-sm font-medium text-gray-700">
                            I'm open to personal contact
                          </span>
                          <p className="text-xs text-gray-500 mt-1">
                            Our pastoral team may reach out for one-on-one prayer and spiritual guidance.
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-6 rounded-lg transition-colors duration-300 font-semibold text-lg flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send {activeTab === 'contact' ? 'Message' : 'Prayer Request'}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Map and Additional Info */}
<div className="space-y-8">
  {/* Google Map */}
  <div className="bg-white rounded-xl shadow-lg overflow-hidden">
    <div className="p-6">
      <h3 className="text-2xl font-semibold text-gray-900 mb-4">Find Us</h3>
      <p className="text-gray-600 mb-4">
        Visit us at our service location. We'd love to welcome you to our church family.
      </p>
    </div>

    <div className="h-96">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1982.3849493258438!2d34.566414!3d-1.062828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ske!4v1696500000000!5m2!1sen!2ske"
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
</div>          

            {/* Staff Directory */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Church Leadership</h3>
              <div className="space-y-4">
                <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Pastor Bruce</h4>
                    <p className="text-sm text-gray-600">Missionary Pastor</p>
                    <a href="mailto:Pst.bruce67@gmail.com" className="text-sm text-blue-600 hover:underline">
                      Pst.bruce67@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                    <User className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Oliver Oyando</h4>
                    <p className="text-sm text-gray-600">Church Secretary</p>
                    <p className="text-sm text-gray-600">Administrative and communication tasks</p>
                  </div>
                </div>

                <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                    <User className="h-6 w-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Kevin Odhiambo</h4>
                    <p className="text-sm text-gray-600">IT Manager</p>
                    <p className="text-sm text-gray-600">Technology, systems, and digital communication platforms</p>
                  </div>
                </div>

                <div className="flex items-center p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                    <User className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Fredrick Musala</h4>
                    <p className="text-sm text-gray-600">Worship Leader</p>
                    <p className="text-sm text-gray-600">Music Ministry</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Info */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-semibold mb-4">Need Immediate Prayer?</h3>
              <p className="mb-4">
                If you have an urgent prayer need, don't hesitate to call us directly. We're here for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+254735464102"
                  className="flex items-center justify-center bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-300 font-semibold"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </a>
                <a
                  href="https://www.facebook.com/profile.php?id=100064378341874"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition duration-300 font-semibold"
                >
                  Message on Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bible Verse */}
        <section className="text-center py-12">
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
            <blockquote className="text-2xl font-medium text-gray-900 italic mb-4">
              "Call to me and I will answer you and tell you great and unsearchable things you do not know."
            </blockquote>
            <cite className="text-lg text-gray-600">- Jeremiah 33:3</cite>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
