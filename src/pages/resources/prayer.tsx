import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Navbar from '@/components/Header';
import { Heart, Shield, Phone, Mail, CheckCircle, AlertCircle } from 'lucide-react';

const PrayerRequestPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
    prayerRequest: '',
    isSecret: false,
    allowContact: false,
    urgency: 'normal'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    
    try {
      const formElement = e.target as HTMLFormElement;
      const formData = new FormData(formElement);
      
      const response = await fetch('https://formsubmit.co/manodhiambo@gmail.com', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setSubmitStatus('success');
        // Reset form data
        setFormData({
          fullName: '',
          phoneNumber: '',
          email: '',
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
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-purple-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Prayer Requests
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto">
              "Therefore I tell you, whatever you ask in prayer, believe that you have received it, 
              and it will be yours." - Mark 11:24
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Prayer Request Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Heart className="w-6 h-6 text-purple-600" />
                Submit Your Prayer Request
              </h2>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <p className="text-green-800">
                    Your prayer request has been submitted successfully. Our prayer team will be interceding for you.
                  </p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600" />
                  <p className="text-red-800">
                    There was an error submitting your request. Please try again or contact us directly.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* FormSubmit Configuration - Hidden Fields */}
                <input type="hidden" name="_subject" value="New Prayer Request - Calvary Jesus Church" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />

                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Contact Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Optional"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Optional"
                    />
                  </div>
                </div>

                {/* Prayer Request */}
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="normal">Normal</option>
                    <option value="urgent">Urgent</option>
                    <option value="emergency">Emergency</option>
                  </select>
                </div>

                {/* Privacy Options */}
                <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-purple-600" />
                    Privacy Options
                  </h3>
                  
                  <div className="space-y-3">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="isSecret"
                        checked={formData.isSecret}
                        onChange={handleInputChange}
                        className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
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
                        className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
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

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5" />
                      Submit Prayer Request
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Information Panel */}
            <div className="space-y-8">
              {/* Prayer Ministry Info */}
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Our Prayer Ministry
                </h3>
                <p className="text-gray-600 mb-6">
                  At Calvary Jesus Church, we believe in the power of prayer and the privilege of interceding 
                  for one another. Our dedicated prayer team commits to praying for every request we receive.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Confidential Prayer</h4>
                      <p className="text-sm text-gray-600">
                        All prayer requests are handled with complete confidentiality and care.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Privacy Protected</h4>
                      <p className="text-sm text-gray-600">
                        Your personal information is never shared without your explicit consent.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-purple-600 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Pastoral Care</h4>
                      <p className="text-sm text-gray-600">
                        Our pastoral team is available for additional spiritual guidance and support.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-purple-50 rounded-xl p-8">
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Need Immediate Prayer?
                </h3>
                <p className="text-gray-600 mb-6">
                  For urgent prayer needs or pastoral care, you can contact us directly:
                </p>
                
                <div className="space-y-3">
                  <a
                    href="tel:+254735464102"
                    className="flex items-center gap-3 text-purple-700 hover:text-purple-800 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span>+254 735 464 102</span>
                  </a>
                  
                  <a
                    href="mailto:Pst.bruce67@gmail.com"
                    className="flex items-center gap-3 text-purple-700 hover:text-purple-800 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Pst.bruce67@gmail.com</span>
                  </a>
                </div>
              </div>

              {/* Bible Verse */}
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl p-8">
                <blockquote className="text-lg italic mb-4">
                  "And this is the confidence that we have toward him, that if we ask anything 
                  according to his will he hears us. And if we know that he hears us in whatever 
                  we ask, we know that we have the requests that we have asked of him."
                </blockquote>
                <cite className="text-purple-200">— 1 John 5:14-15</cite>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PrayerRequestPage;
