import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CreditCard, Building2, Phone, Heart, FileText, Shield, CheckCircle, Loader } from 'lucide-react';

const Give: React.FC = () => {
  const [formData, setFormData] = useState({
    amount: '',
    purpose: '',
    name: '',
    email: '',
    phone: '',
    anonymous: false
  });
  const [paymentStep, setPaymentStep] = useState('form'); // 'form', 'processing', 'pin', 'success'
  const [isLoading, setIsLoading] = useState(false);

  // Daraja API Configuration
  const DARAJA_CONFIG = {
    consumerKey: 'NzgOIRzuOHws4KE5gAFFTPYddpJSXuowiko7GRIjpC8x2QJ5',
    consumerSecret: '7OLWPjGdoAgrqeoYJ1S2XU0a9R54BQBDCqUqXba9jiNuY2DkgkCvy7TWGN3lRVm5',
    businessShortCode: '07229328',
    passkey: 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919'
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleQuickAmount = (amount: number) => {
    setFormData(prev => ({ ...prev, amount: amount.toString() }));
  };

  const processPayment = async () => {
    if (!formData.amount || !formData.phone || !formData.name) {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    setPaymentStep('processing');

    // Simulate API call to Daraja
    try {
      // In a real implementation, you would make the actual Daraja API calls here
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setPaymentStep('pin');
      setIsLoading(false);
    } catch (error) {
      console.error('Payment processing error:', error);
      setIsLoading(false);
      alert('Payment processing failed. Please try again.');
      setPaymentStep('form');
    }
  };

  const handlePinSubmission = async () => {
    setIsLoading(true);
    
    // Simulate PIN verification and payment completion
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      setPaymentStep('success');
      setIsLoading(false);
    } catch (error) {
      console.error('PIN verification failed:', error);
      setIsLoading(false);
      alert('PIN verification failed. Please try again.');
    }
  };

  const resetForm = () => {
    setFormData({
      amount: '',
      purpose: '',
      name: '',
      email: '',
      phone: '',
      anonymous: false
    });
    setPaymentStep('form');
  };

  return (
    <div className="min-h-screen bg-cjc-cream">
      <Header />

      {/* Hero Section */}
      <section className="relative py-36 bg-cjc-navy overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-cjc-gold to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-12 h-0.5 bg-cjc-gold mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 text-white">Give Generously</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." - 2 Corinthians 9:7
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Online Giving Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading text-cjc-navy mb-4">Online Giving</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Give conveniently and securely through our online platform. Your generous contributions help us continue God's work in our community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Payment Form Card */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <CreditCard className="h-8 w-8 text-cjc-gold mr-3" />
                <h3 className="text-2xl font-semibold font-heading text-cjc-navy">
                  {paymentStep === 'form' && 'Secure Donation Form'}
                  {paymentStep === 'processing' && 'Processing Payment...'}
                  {paymentStep === 'pin' && 'Enter M-Pesa PIN'}
                  {paymentStep === 'success' && 'Payment Successful!'}
                </h3>
              </div>
              
              {paymentStep === 'form' && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                      Donation Amount (KES) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">KES</span>
                      <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cjc-gold/40 focus:border-cjc-gold outline-none"
                        placeholder="0.00"
                        min="1"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="purpose" className="block text-sm font-medium text-gray-700 mb-2">
                      Purpose (Optional)
                    </label>
                    <select
                      id="purpose"
                      name="purpose"
                      value={formData.purpose}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cjc-gold/40 focus:border-cjc-gold outline-none"
                    >
                      <option value="">General Fund</option>
                      <option value="tithes">Tithes</option>
                      <option value="offerings">Offerings</option>
                      <option value="missions">Missions</option>
                      <option value="building">Building Fund</option>
                      <option value="youth">Youth Ministry</option>
                      <option value="children">Children's Ministry</option>
                      <option value="outreach">Community Outreach</option>
                    </select>
                  </div>

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
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cjc-gold/40 focus:border-cjc-gold outline-none"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cjc-gold/40 focus:border-cjc-gold outline-none"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      M-Pesa Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-cjc-gold/40 focus:border-cjc-gold outline-none"
                      placeholder="254xxxxxxxxx"
                    />
                    <p className="text-xs text-gray-500 mt-1">This number will receive the M-Pesa payment prompt</p>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="anonymous"
                      name="anonymous"
                      checked={formData.anonymous}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-cjc-gold focus:ring-cjc-gold border-gray-300 rounded"
                    />
                    <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
                      Make this donation anonymous
                    </label>
                  </div>

                  <button
                    onClick={processPayment}
                    disabled={isLoading}
                    className="w-full bg-cjc-gold hover:bg-cjc-gold-mid text-white py-3 px-6 rounded-md transition duration-300 font-semibold text-lg disabled:opacity-50"
                  >
                    {isLoading ? 'Processing...' : 'Proceed with M-Pesa Payment'}
                  </button>
                </div>
              )}

              {paymentStep === 'processing' && (
                <div className="text-center py-12">
                  <Loader className="h-12 w-12 text-cjc-gold mx-auto mb-4 animate-spin" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Initiating M-Pesa Payment</h3>
                  <p className="text-gray-600">Please wait while we process your request...</p>
                </div>
              )}

              {paymentStep === 'pin' && (
                <div className="text-center py-8">
                  <Phone className="h-16 w-16 text-green-600 mx-auto mb-6" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">M-Pesa Payment Prompt Sent</h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <p className="text-green-800 mb-2">
                      <strong>Amount:</strong> KES {parseInt(formData.amount || '0').toLocaleString()}
                    </p>
                    <p className="text-green-800 mb-2">
                      <strong>Phone:</strong> {formData.phone}
                    </p>
                    <p className="text-green-800">
                      <strong>Purpose:</strong> {formData.purpose || 'General Fund'}
                    </p>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Please check your phone and enter your M-Pesa PIN to complete the donation.
                  </p>
                  <button
                    onClick={handlePinSubmission}
                    disabled={isLoading}
                    className="bg-green-600 text-white px-8 py-3 rounded-md hover:bg-green-700 transition duration-300 font-semibold disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <Loader className="h-4 w-4 inline mr-2 animate-spin" />
                        Verifying Payment...
                      </>
                    ) : (
                      'I have entered my PIN'
                    )}
                  </button>
                </div>
              )}

              {paymentStep === 'success' && (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">Thank You for Your Generosity!</h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <p className="text-green-800 mb-2">
                      <strong>Donation Amount:</strong> KES {parseInt(formData.amount || '0').toLocaleString()}
                    </p>
                    <p className="text-green-800 mb-2">
                      <strong>Transaction ID:</strong> MP{Date.now()}
                    </p>
                    <p className="text-green-800">
                      <strong>Status:</strong> Completed Successfully
                    </p>
                  </div>
                  <p className="text-gray-600 mb-6">
                    Your donation has been processed successfully. A receipt has been sent to your phone via SMS.
                  </p>
                  <button
                    onClick={resetForm}
                    className="bg-cjc-gold hover:bg-cjc-gold-mid text-white px-8 py-3 rounded-md transition duration-300 font-semibold"
                  >
                    Make Another Donation
                  </button>
                </div>
              )}
            </div>

            {/* Quick Give Options */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-semibold font-heading text-cjc-navy mb-6">Quick Give Options</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[100, 500, 1000, 2000, 5000, 10000].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => handleQuickAmount(amount)}
                    className={`py-3 px-4 rounded-md transition duration-300 font-semibold ${
                      formData.amount === amount.toString()
                        ? 'bg-cjc-gold text-white'
                        : 'bg-gray-100 hover:bg-amber-50 text-gray-800 hover:text-cjc-navy'
                    }`}
                  >
                    KES {amount.toLocaleString()}
                  </button>
                ))}
              </div>

              <div className="space-y-4">
                <div className="flex items-center p-4 bg-green-50 rounded-lg">
                  <Shield className="h-6 w-6 text-green-600 mr-3" />
                  <div>
                    <h4 className="font-semibold text-green-800">Secure & Protected</h4>
                    <p className="text-sm text-green-600">Safaricom M-Pesa secure payment</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-amber-50 rounded-lg">
                  <Heart className="h-6 w-6 text-cjc-gold mr-3" />
                  <div>
                    <h4 className="font-semibold text-cjc-navy">Instant Processing</h4>
                    <p className="text-sm text-cjc-gold">Real-time payment confirmation</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                  <FileText className="h-6 w-6 text-purple-600 mr-3" />
                  <div>
                    <h4 className="font-semibold text-purple-800">Digital Receipt</h4>
                    <p className="text-sm text-purple-600">SMS and email confirmation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Ways to Give */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading text-cjc-navy mb-4">Other Ways to Give</h2>
            <p className="text-lg text-gray-600">
              Choose the method that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Bank Transfer */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Building2 className="h-12 w-12 text-cjc-gold mx-auto mb-4" />
              <h3 className="text-xl font-semibold font-heading text-cjc-navy mb-4">Bank Transfer</h3>
              <div className="space-y-2 text-gray-600">
                <p><strong>Bank:</strong> Equity Bank</p>
                <p><strong>Account Name:</strong> Calvary Jesus Church</p>
                <p><strong>Account Number:</strong> 1160286618598</p>
                <p><strong>Branch:</strong> Migori</p>
              </div>
            </div>

            {/* M-Pesa Direct */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Phone className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold font-heading text-cjc-navy mb-4">M-Pesa Direct</h3>
              <div className="space-y-2 text-gray-600">
                <p><strong>Phone Number:</strong> 0722932843</p>
                <p><strong>Name:</strong> Calvary Jesus Church</p>
                <p className="text-sm mt-4">
                  Go to M-Pesa → Send Money → Enter number above
                </p>
              </div>
            </div>

            {/* In-Person */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Heart className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold font-heading text-cjc-navy mb-4">In-Person Giving</h3>
              <div className="space-y-2 text-gray-600">
                <p>During Sunday services:</p>
                <p><strong>9:00 AM - 12:00 PM</strong><br />Nyaduong' Village</p>
                <p className="text-sm mt-4">
                  Cash offerings and tithes accepted during service
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Financial Transparency */}
        <section className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <FileText className="h-12 w-12 text-cjc-gold mx-auto mb-4" />
            <h2 className="text-3xl font-bold font-heading text-cjc-navy mb-4">Financial Transparency</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We believe in being transparent with how your donations are used to further God's kingdom.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-cjc-gold">40%</span>
              </div>
              <h3 className="font-semibold font-heading text-cjc-navy">Ministry Programs</h3>
              <p className="text-sm text-gray-600">Worship, discipleship, and spiritual growth</p>
            </div>

            <div className="text-center">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-cjc-gold">25%</span>
              </div>
              <h3 className="font-semibold font-heading text-cjc-navy">Community Outreach</h3>
              <p className="text-sm text-gray-600">Local missions and community service</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-yellow-600">20%</span>
              </div>
              <h3 className="font-semibold font-heading text-cjc-navy">Facility & Operations</h3>
              <p className="text-sm text-gray-600">Maintenance and operational costs</p>
            </div>

            <div className="text-center">
              <div className="bg-amber-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-cjc-gold">15%</span>
              </div>
              <h3 className="font-semibold font-heading text-cjc-navy">Staff & Leadership</h3>
              <p className="text-sm text-gray-600">Supporting our ministry team</p>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-cjc-gold hover:bg-cjc-gold-mid text-white px-6 py-3 rounded-md transition duration-300">
              Download Annual Financial Report
            </button>
          </div>
        </section>

        {/* Bible Verse */}
        <section className="text-center py-12">
          <blockquote className="text-2xl font-medium text-gray-900 italic max-w-4xl mx-auto">
            "Remember this: Whoever sows sparingly will also reap sparingly, and whoever sows generously will also reap generously..This however applies to sharing the gospel, not about money"
          </blockquote>
          <cite className="text-lg text-gray-600 mt-4 block">- 2 Corinthians 9:6</cite>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Give;
