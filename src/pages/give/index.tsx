import React, { useState } from 'react';
import Link from 'next/link';
import { CreditCard, Building, Phone, Heart, DollarSign, Shield, CheckCircle } from 'lucide-react';

const GivePage = () => {
  const [activeTab, setActiveTab] = useState('online');
  const [donationAmount, setDonationAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donationType, setDonationType] = useState('tithe');

  const predefinedAmounts = [1000, 2000, 5000, 10000, 20000, 50000];

  const handleAmountSelect = (amount: number) => {
    setDonationAmount(amount.toString());
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
    setDonationAmount('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount || donationAmount;
    if (!finalAmount) {
      alert('Please select or enter an amount');
      return;
    }
    // Handle donation submission
    alert(`Thank you for your ${donationType} of KES ${finalAmount}!`);
  };

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
              <Link href="/give" className="text-blue-600 font-semibold">Give</Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600">Contact</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-900 to-green-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Heart className="w-16 h-16 mx-auto mb-4 text-green-200" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Give</h1>
          <p className="text-xl text-green-100 max-w-2xl mx-auto">
            Support God's work through your generous giving
          </p>
          <div className="mt-8 bg-green-800 bg-opacity-50 rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-green-100 italic">
              "Each one must give as he has decided in his heart, not reluctantly or under compulsion, 
              for God loves a cheerful giver." - 2 Corinthians 9:7
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center mb-8 bg-white rounded-lg shadow-sm p-2">
          <button
            onClick={() => setActiveTab('online')}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              activeTab === 'online'
                ? 'bg-green-600 text-white'
                : 'text-gray-600 hover:text-green-600'
            }`}
          >
            <CreditCard className="inline-block w-5 h-5 mr-2" />
            Online Giving
          </button>
          <button
            onClick={() => setActiveTab('ways')}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              activeTab === 'ways'
                ? 'bg-green-600 text-white'
                : 'text-gray-600 hover:text-green-600'
            }`}
          >
            <Building className="inline-block w-5 h-5 mr-2" />
            Other Ways
          </button>
          <button
            onClick={() => setActiveTab('transparency')}
            className={`px-6 py-3 rounded-md font-medium transition-colors ${
              activeTab === 'transparency'
                ? 'bg-green-600 text-white'
                : 'text-gray-600 hover:text-green-600'
            }`}
          >
            <Shield className="inline-block w-5 h-5 mr-2" />
            Transparency
          </button>
        </div>

        {/* Online Giving Tab */}
        {activeTab === 'online' && (
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Online Giving</h2>
              <p className="text-gray-600">Give securely online with M-Pesa or bank transfer</p>
            </div>
            
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8">
              {/* Donation Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Type of Giving
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setDonationType('tithe')}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      donationType === 'tithe'
                        ? 'border-green-600 bg-green-50 text-green-700'
                        : 'border-gray-300 hover:border-green-300'
                    }`}
                  >
                    <DollarSign className="w-6 h-6 mx-auto mb-2" />
                    <span className="block font-medium">Tithe</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDonationType('offering')}
                    className={`p-4 rounded-lg border-2 transition-colors ${
                      donationType === 'offering'
                        ? 'border-green-600 bg-green-50 text-green-700'
                        : 'border-gray-300 hover:border-green-300'
                    }`}
                  >
                    <Heart className="w-6 h-6 mx-auto mb-2" />
                    <span className="block font-medium">Offering</span>
                  </button>
                </div>
              </div>

              {/* Amount Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Amount (KES)
                </label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {predefinedAmounts.map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleAmountSelect(amount)}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        donationAmount === amount.toString()
                          ? 'border-green-600 bg-green-50 text-green-700'
                          : 'border-gray-300 hover:border-green-300'
                      }`}
                    >
                      KES {amount.toLocaleString()}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <input
                    type="number"
                    placeholder="Enter custom amount"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    KES
                  </span>
                </div>
              </div>

              {/* Donor Information */}
              <div className="mb-6">
                <label htmlFor="donor_name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="donor_name"
                  name="donor_name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="donor_phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number (M-Pesa)
                </label>
                <input
                  type="tel"
                  id="donor_phone"
                  name="donor_phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0700000000"
                />
              </div>

              <div className="mb-6">
                <label htmlFor="donor_email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email (Optional)
                </label>
                <input
                  type="email"
                  id="donor_email"
                  name="donor_email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 px-6 rounded-md font-medium hover:bg-green-700 transition-colors"
              >
                Give KES {customAmount || donationAmount || '0'}
              </button>
            </form>
          </div>
        )}

        {/* Other Ways Tab */}
        {activeTab === 'ways' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Other Ways to Give</h2>
              <p className="text-gray-600">Choose the method that works best for you</p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2">
              {/* M-Pesa */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center mb-4">
                  <Phone className="w-8 h-8 text-green-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">M-Pesa</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Paybill Number:</span>
                    <span className="text-green-600 font-bold">522522</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Account Number:</span>
                    <span className="text-green-600 font-bold">CALVARY</span>
                  </div>
                  <div className="mt-4 p-3 bg-green-50 rounded-md">
                    <p className="text-sm text-green-700">
                      Go to M-Pesa → Lipa na M-Pesa → Paybill → Enter 522522 → Account: CALVARY → Enter amount → PIN
                    </p>
                  </div>
                </div>
              </div>

              {/* Bank Transfer */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center mb-4">
                  <Building className="w-8 h-8 text-blue-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Bank Transfer</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Bank:</span>
                    <span className="text-blue-600 font-bold">Equity Bank</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Account Name:</span>
                    <span className="text-blue-600 font-bold">Calvary Jesus Church</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Account Number:</span>
                    <span className="text-blue-600 font-bold">1234567890</span>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-md">
                    <p className="text-sm text-blue-700">
                      Please include your name and "Church Offering" in the transaction reference
                    </p>
                  </div>
                </div>
              </div>

              {/* In-Person */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center mb-4">
                  <Heart className="w-8 h-8 text-purple-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">In-Person</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-600">
                    You can give during our Sunday services at either location:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Nyaduong' Village</p>
                        <p className="text-sm text-gray-600">Sunday 9:00 AM - 12:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-600 mr-2 mt-0.5" />
                      <div>
                        <p className="font-medium">Oruba, Migori Town</p>
                        <p className="text-sm text-gray-600">Sunday 2:00 PM - 4:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact for Questions */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="flex items-center mb-4">
                  <Phone className="w-8 h-8 text-orange-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900">Questions?</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-600 mb-4">
                    If you have any questions about giving, please contact us:
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <span className="font-medium">Email:</span>
                      <a href="mailto:Pst.bruce67@gmail.com" className="text-blue-600 hover:underline ml-2">
                        Pst.bruce67@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium">Phone:</span>
                      <a href="tel:+254735464102" className="text-blue-600 hover:underline ml-2">
                        +254735464102
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Transparency Tab */}
        {activeTab === 'transparency' && (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Financial Transparency</h2>
              <p className="text-gray-600">We are committed to responsible stewardship of your gifts</p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2">
              {/* How We Use Your Gifts */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">How We Use Your Gifts</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Ministry & Outreach</span>
                    <span className="text-green-600 font-bold">40%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Facilities & Operations</span>
                    <span className="text-blue-600 font-bold">25%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Staff & Leadership</span>
                    <span className="text-purple-600 font-bold">20%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">Community Support</span>
                    <span className="text-orange-600 font-bold">15%</span>
                  </div>
                </div>
              </div>

              {/* Our Commitment */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Our Commitment</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Biblical Stewardship</p>
                      <p className="text-sm text-gray-600">
                        We handle all funds according to biblical principles of stewardship
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Regular Reporting</p>
                      <p className="text-sm text-gray-600">
                        Financial reports are shared with the congregation quarterly
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Accountability</p>
                      <p className="text-sm text-gray-600">
                        Our finances are overseen by a board of trusted church members
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Annual Report */}
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Annual Financial Report</h3>
              <p className="text-gray-600 mb-6">
                Our detailed annual financial report is available to all church members
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors">
                Download 2023 Annual Report
              </button>
            </div>
          </div>
        )}
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

export default GivePage;
