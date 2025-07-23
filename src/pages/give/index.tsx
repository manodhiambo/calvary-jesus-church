import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CreditCard, Building2, Phone, Heart, FileText, Shield } from 'lucide-react';

const Give: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Give Generously</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." - 2 Corinthians 9:7
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Online Giving Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Online Giving</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Give conveniently and securely through our online platform. Your generous contributions help us continue God's work in our community.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Online Form Card */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <CreditCard className="h-8 w-8 text-blue-600 mr-3" />
                <h3 className="text-2xl font-semibold text-gray-900">Secure Online Form</h3>
              </div>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                    Donation Amount (KES)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">KES</span>
                    <input
                      type="number"
                      id="amount"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+254 xxx xxx xxx"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="anonymous"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
                    Make this donation anonymous
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300 font-semibold text-lg"
                >
                  Proceed to Payment
                </button>
              </form>
            </div>

            {/* Quick Give Options */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Quick Give Options</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[100, 500, 1000, 2000, 5000, 10000].map((amount) => (
                  <button
                    key={amount}
                    className="bg-gray-100 hover:bg-blue-100 text-gray-800 hover:text-blue-800 py-3 px-4 rounded-md transition duration-300 font-semibold"
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
                    <p className="text-sm text-green-600">256-bit SSL encryption</p>
                  </div>
                </div>

                <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                  <Heart className="h-6 w-6 text-blue-600 mr-3" />
                  <div>
                    <h4 className="font-semibold text-blue-800">Tax Deductible</h4>
                    <p className="text-sm text-blue-600">Receipts provided for all donations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Other Ways to Give */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Other Ways to Give</h2>
            <p className="text-lg text-gray-600">
              Choose the method that works best for you
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Bank Transfer */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Building2 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Bank Transfer</h3>
              <div className="space-y-2 text-gray-600">
                <p><strong>Bank:</strong> Kenya Commercial Bank</p>
                <p><strong>Account Name:</strong> Calvary Jesus Church</p>
                <p><strong>Account Number:</strong> 1234567890</p>
                <p><strong>Branch:</strong> Migori Branch</p>
              </div>
            </div>

            {/* M-Pesa */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Phone className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">M-Pesa Paybill</h3>
              <div className="space-y-2 text-gray-600">
                <p><strong>Paybill Number:</strong> 123456</p>
                <p><strong>Account Number:</strong> Your Phone Number</p>
                <p className="text-sm mt-4">
                  Go to M-Pesa → Lipa na M-Pesa → Pay Bill → Enter details above
                </p>
              </div>
            </div>

            {/* In-Person */}
            <div className="bg-white rounded-lg shadow-lg p-6 text-center">
              <Heart className="h-12 w-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">In-Person Giving</h3>
              <div className="space-y-2 text-gray-600">
                <p>During Sunday services:</p>
                <p><strong>9:00 AM - 12:00 PM</strong><br />Nyaduong' Village</p>
                <p><strong>2:00 PM - 4:00 PM</strong><br />Dip Primary School, Migori</p>
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
            <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Financial Transparency</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We believe in being transparent with how your donations are used to further God's kingdom.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-blue-600">40%</span>
              </div>
              <h3 className="font-semibold text-gray-900">Ministry Programs</h3>
              <p className="text-sm text-gray-600">Worship, discipleship, and spiritual growth</p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-green-600">25%</span>
              </div>
              <h3 className="font-semibold text-gray-900">Community Outreach</h3>
              <p className="text-sm text-gray-600">Local missions and community service</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-yellow-600">20%</span>
              </div>
              <h3 className="font-semibold text-gray-900">Facility & Operations</h3>
              <p className="text-sm text-gray-600">Maintenance and operational costs</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-purple-600">15%</span>
              </div>
              <h3 className="font-semibold text-gray-900">Staff & Leadership</h3>
              <p className="text-sm text-gray-600">Supporting our ministry team</p>
            </div>
          </div>

          <div className="text-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-300">
              Download Annual Financial Report
            </button>
          </div>
        </section>

        {/* Bible Verse */}
        <section className="text-center py-12">
          <blockquote className="text-2xl font-medium text-gray-900 italic max-w-4xl mx-auto">
            "Remember this: Whoever sows sparingly will also reap sparingly, and whoever sows generously will also reap generously."
          </blockquote>
          <cite className="text-lg text-gray-600 mt-4 block">- 2 Corinthians 9:6</cite>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Give;
