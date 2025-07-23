import React, { useState } from 'react';
import { Send, Heart, Lock, Phone, User, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

interface PrayerFormData {
  fullName: string;
  phoneNumber: string;
  prayerRequest: string;
  isSecret: boolean;
  allowContact: boolean;
}

const PrayerForm: React.FC = () => {
  const [formData, setFormData] = useState<PrayerFormData>({
    fullName: '',
    phoneNumber: '',
    prayerRequest: '',
    isSecret: false,
    allowContact: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your backend
      console.log('Prayer request submitted:', formData);
      
      setSubmitted(true);
      setFormData({
        fullName: '',
        phoneNumber: '',
        prayerRequest: '',
        isSecret: false,
        allowContact: false,
      });
    } catch (err) {
      setError('Failed to submit prayer request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <div className="mb-4">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Prayer Request Received</h2>
          <p className="text-gray-600 mb-6">
            Thank you for sharing your prayer request with us. Our prayer team will lift you up in prayer.
            May God's peace and blessings be with you.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 px-8 py-6">
        <div className="text-center text-white">
          <Heart className="w-12 h-12 mx-auto mb-3 opacity-90" />
          <h2 className="text-2xl font-bold">Share Your Prayer Request</h2>
          <p className="text-blue-100 mt-2">
            "The prayer of a righteous person is powerful and effective." - James 5:16
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
              <User className="w-4 h-4 inline mr-2" />
              Full Name *
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
              <Phone className="w-4 h-4 inline mr-2" />
              Phone Number (Optional)
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Enter your phone number (optional)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
            />
          </div>

          {/* Prayer Request */}
          <div>
            <label htmlFor="prayerRequest" className="block text-sm font-medium text-gray-700 mb-2">
              <MessageSquare className="w-4 h-4 inline mr-2" />
              Prayer Request *
            </label>
            <textarea
              id="prayerRequest"
              name="prayerRequest"
              required
              rows={6}
              value={formData.prayerRequest}
              onChange={handleInputChange}
              placeholder="Share your prayer request here. We will pray for you with love and confidentiality."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 resize-vertical"
            />
          </div>

          {/* Checkboxes */}
          <div className="space-y-4">
            {/* Secret Request */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="isSecret"
                name="isSecret"
                checked={formData.isSecret}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isSecret" className="ml-3 text-sm text-gray-700">
                <Lock className="w-4 h-4 inline mr-1" />
                <strong>Is this a secret request?</strong>
                <p className="text-gray-500 mt-1 text-xs">
                  If checked, your request will only be shared with our confidential prayer team.
                </p>
              </label>
            </div>

            {/* Allow Contact */}
            <div className="flex items-start">
              <input
                type="checkbox"
                id="allowContact"
                name="allowContact"
                checked={formData.allowContact}
                onChange={handleInputChange}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="allowContact" className="ml-3 text-sm text-gray-700">
                <Phone className="w-4 h-4 inline mr-1" />
                <strong>Can we contact you for a one-on-one talk?</strong>
                <p className="text-gray-500 mt-1 text-xs">
                  Our pastoral team may reach out to offer additional support and encouragement.
                </p>
              </label>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center p-4 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-900 hover:bg-blue-800 disabled:bg-blue-400 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                Submit Prayer Request
              </>
            )}
          </button>
        </form>

        {/* Privacy Notice */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-blue-800 text-center">
            🔒 Your privacy is important to us. All prayer requests are handled with care and confidentiality.
            We will never share your information without your permission.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrayerForm;
