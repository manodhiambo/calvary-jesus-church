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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const formElement = e.currentTarget;
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
    <div className="min-h-screen bg-white">
      <Header />

      {/* ── Hero ── */}
      <section className="relative py-36 bg-cjc-navy overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cjc-gold to-transparent" />
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <div className="w-12 h-0.5 bg-cjc-gold mx-auto mb-6" />
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6">Get in Touch</h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-cjc-gold to-transparent" />
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Contact Info Cards */}
        <section className="mb-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: MapPin, label: 'Our Location', value: "Nyaduong' Village", sub: "Next to Nyaduong' Secondary & Primary Schools" },
              { icon: Clock,  label: 'Service Times', value: 'Sunday Services', sub: '9:00 AM – 12:00 PM, Nyaduong\' Village' },
              { icon: Phone,  label: 'Call Us', value: '+254 735 464 102', href: 'tel:+254735464102' },
              { icon: Mail,   label: 'Email Us', value: 'Pst.bruce67@gmail.com', href: 'mailto:Pst.bruce67@gmail.com' },
            ].map(({ icon: Icon, label, value, sub, href }) => (
              <div key={label} className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:border-cjc-gold/30 hover:shadow-lg p-7 text-center transition-all duration-300">
                <div className="w-14 h-14 bg-cjc-gold/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-cjc-gold/20 transition-colors">
                  <Icon className="w-7 h-7 text-cjc-gold" />
                </div>
                <h3 className="font-heading text-lg font-bold text-cjc-navy mb-2">{label}</h3>
                {href ? (
                  <a href={href} className="text-gray-600 hover:text-cjc-gold transition-colors font-medium text-sm">{value}</a>
                ) : (
                  <p className="text-gray-700 font-medium text-sm">{value}</p>
                )}
                {sub && <p className="text-gray-400 text-xs mt-1">{sub}</p>}
              </div>
            ))}
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            {/* Tabs */}
            <div className="flex mb-8 border-b border-gray-100">
              <button
                onClick={() => setActiveTab('contact')}
                className={`flex-1 py-3.5 px-6 text-center font-semibold transition-all duration-200 text-sm ${
                  activeTab === 'contact'
                    ? 'border-b-2 border-cjc-gold text-cjc-gold'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <MessageSquare className="h-4 w-4 inline-block mr-2" />
                General Contact
              </button>
              <button
                onClick={() => setActiveTab('prayer')}
                className={`flex-1 py-3.5 px-6 text-center font-semibold transition-all duration-200 text-sm ${
                  activeTab === 'prayer'
                    ? 'border-b-2 border-cjc-gold text-cjc-gold'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Heart className="h-4 w-4 inline-block mr-2" />
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cjc-gold/40 focus:border-cjc-gold outline-none transition-all duration-200"
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cjc-gold/40 focus:border-cjc-gold outline-none transition-all duration-200"
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
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cjc-gold/40 focus:border-cjc-gold outline-none transition-all duration-200"
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cjc-gold/40 focus:border-cjc-gold outline-none transition-all duration-200"
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
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cjc-gold/40 focus:border-cjc-gold outline-none transition-all duration-200"
                    >
                      <option value="normal">Normal</option>
                      <option value="urgent">Urgent</option>
                      <option value="emergency">Emergency</option>
                    </select>
                  </div>

                  {/* Privacy Options */}
                  <div className="space-y-4 bg-cjc-cream p-6 rounded-xl border border-gray-100">
                    <h3 className="text-base font-semibold text-cjc-navy flex items-center gap-2">
                      <Shield className="w-5 h-5 text-cjc-gold" />
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
                className="w-full bg-cjc-gold hover:bg-cjc-gold-mid disabled:opacity-60 text-white py-3 px-6 rounded-xl transition-all duration-300 font-semibold text-base flex items-center justify-center gap-2"
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
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <h3 className="font-heading text-2xl font-bold text-cjc-navy mb-2">Find Us</h3>
                <p className="text-gray-500 text-sm">Visit us at our service location. We'd love to welcome you to our church family.</p>
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

            {/* Leadership contacts */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-heading text-xl font-bold text-cjc-navy mb-5">Church Leadership</h3>
              <div className="space-y-3">
                {[
                  { name: 'Pastor Bruce',   role: 'Missionary Pastor',  email: 'Pst.bruce67@gmail.com' },
                  { name: 'Oliver Oyando',  role: 'Church Secretary',   email: 'oyandooliver6@gmail.com' },
                  { name: 'Kevin Odhiambo', role: 'Secretary',          email: 'manodhiambo@gmail.com' },
                  { name: 'Joyce Akoth',    role: 'Vice Secretary',     email: 'joyceakoth@gmail.com' },
                  { name: 'Samuel Ondieki', role: 'Vice Chairman',      email: 'samuelondieki@gmail.com' },
                  { name: 'Felix Ochieng',  role: 'Treasurer',          email: 'felixochieng@gmail.com' },
                  { name: 'John Olary',     role: 'Vice Treasurer',     email: 'johnolary@gmail.com' },
                ].map(person => (
                  <div key={person.name} className="flex items-center gap-4 p-3 border border-gray-100 rounded-xl hover:border-cjc-gold/30 hover:bg-cjc-gold/5 transition-all duration-200">
                    <div className="w-10 h-10 bg-cjc-gold/15 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-cjc-gold" />
                    </div>
                    <div>
                      <p className="font-semibold text-cjc-navy text-sm">{person.name}</p>
                      <p className="text-xs text-gray-400">{person.role}</p>
                      <a href={`mailto:${person.email}`} className="text-xs text-cjc-gold hover:text-cjc-gold-mid transition-colors">{person.email}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Urgent prayer CTA */}
            <div className="bg-cjc-navy rounded-2xl p-6 text-white">
              <div className="w-10 h-10 bg-cjc-gold/20 rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-5 h-5 text-cjc-gold" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-3">Need Immediate Prayer?</h3>
              <p className="text-gray-300 text-sm mb-5 leading-relaxed">
                If you have an urgent prayer need, don't hesitate to call us directly. We're here for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="tel:+254735464102"
                  className="flex items-center justify-center gap-2 bg-cjc-gold hover:bg-cjc-gold-mid text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors">
                  <Phone className="w-4 h-4" /> Call Now
                </a>
                <a href="https://www.facebook.com/profile.php?id=100064378341874" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors">
                  Message on Facebook
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Scripture quote */}
        <section className="text-center py-16">
          <div className="bg-cjc-cream rounded-2xl p-10 max-w-4xl mx-auto border border-gray-100">
            <div className="w-10 h-0.5 bg-cjc-gold mx-auto mb-6" />
            <blockquote className="scripture-text text-2xl text-cjc-navy mb-4">
              "Call to me and I will answer you and tell you great and unsearchable things you do not know."
            </blockquote>
            <cite className="text-cjc-gold font-semibold text-sm not-italic">— Jeremiah 33:3</cite>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
