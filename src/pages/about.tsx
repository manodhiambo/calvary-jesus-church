import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

const AboutPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const beliefs = [
    {
      title: "Universal Sinfulness",
      verse: "Romans 5:12",
      description: "All human kind are born in Adam, sinners by birth: 'Therefore, just as sin came into the world through one man, and death through sin, and so death spread to all men because all sinned--'"
    },
    {
      title: "No Human Righteousness",
      verse: "Romans 3:10",
      description: "There is none righteous before God: 'None is righteous, no, not one; no one understands; no one seeks for God'"
    },
    {
      title: "God's Justice",
      verse: "Deuteronomy 32:4",
      description: "God is righteous and Just and can never allow sin into heaven: 'A God of faithfulness and without iniquity, just and upright is He'"
    },
    {
      title: "Salvation by Faith",
      verse: "Galatians 2:16",
      description: "No good deed from man can justify him: 'yet we know that a person is not justified by works of the law but through faith in Jesus Christ'"
    },
    {
      title: "Perfect Obedience Required",
      verse: "James 2:10",
      description: "Breaking one law makes you guilty of all: 'For whoever keeps the whole law but fails in one point has become guilty of all'"
    },
    {
      title: "Blood Sacrifice Necessity",
      verse: "Hebrews 9:22",
      description: "God can never forgive sin without shedding of blood: 'without the shedding of blood there is no forgiveness of sins'"
    },
    {
      title: "Jesus as the Only Sacrifice",
      verse: "Hebrews 10:5-10",
      description: "The only available sacrifice is Jesus Christ: 'Sacrifices and offerings you have not desired, but a body have you prepared for me'"
    },
    {
      title: "Forgiveness Through Christ",
      verse: "Acts 13:38-39",
      description: "Righteousness comes through forgiveness: 'through this man forgiveness of sins is proclaimed to you, and by him everyone who believes is freed'"
    },
    {
      title: "Jesus as the Only Way",
      verse: "John 14:6",
      description: "Without Jesus Christ nobody can enter heaven: 'I am the way, and the truth, and the life. No one comes to the Father except through me'"
    },
    {
      title: "Salvation from Wrath",
      verse: "Romans 5:9",
      description: "Through Jesus' death, believers are saved from Hell: 'having now been justified by His blood, we shall be saved from wrath through Him'"
    }
  ];

  const navigationLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Ministries', href: '/ministries' },
    { name: 'Events', href: '/events' },
    { name: 'Resources', href: '/resources' },
    { name: 'Give', href: '/give' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <>
      <Head>
        <title>About Us - Calvary Jesus Church</title>
        <meta name="description" content="Learn about our beliefs, mission, and biblical foundation at Calvary Jesus Church." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Navigation Header */}
        <nav className="bg-white shadow-lg sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center py-4">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">CJC</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-800">Calvary Jesus Church</h1>
                  <p className="text-xs text-gray-500">Unleashing God's Truth</p>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex space-x-1">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      link.name === 'About'
                        ? 'bg-blue-100 text-blue-700 shadow-sm'
                        : 'text-gray-600 hover:text-blue-700 hover:bg-blue-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                <div className="space-y-1">
                  <div className={`w-6 h-0.5 bg-gray-600 transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></div>
                  <div className={`w-6 h-0.5 bg-gray-600 transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
                  <div className={`w-6 h-0.5 bg-gray-600 transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
                </div>
              </button>
            </div>

            {/* Mobile Navigation */}
            {isMobileMenuOpen && (
              <div className="lg:hidden pb-4 border-t border-gray-100">
                <div className="flex flex-col space-y-1 mt-4">
                  {navigationLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        link.name === 'About'
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:text-blue-700 hover:bg-blue-50'
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center bg-blue-800/50 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                Founded on Biblical Truth
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                About 
                <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent"> Calvary Jesus</span> Church
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
                We are a community of believers united by our common faith, rooted in Biblical truth and the unwavering authority of God's Word.
              </p>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-10 right-10 w-32 h-32 border border-blue-400/20 rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-24 h-24 border border-blue-400/20 rounded-full"></div>
        </section>

        {/* Our Story */}
        <section className="py-20 bg-white relative">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center bg-blue-50 px-4 py-2 rounded-full text-blue-700 text-sm font-medium mb-4">
                  Our Foundation
                </div>
                <h2 className="text-4xl font-bold text-gray-800 mb-6">Built on the Solid Rock</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto"></div>
              </div>
              
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Calvary Jesus Church is founded on the solid rock of Biblical doctrine. We believe that the Bible 
                    is complete on its own and nothing exists outside the Bible claimed to be from God is true.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    Our faith is rooted in the truth that God has spoken to us through His Son, giving us the reason 
                    to rely solely on the Bible and hence the reason to study the Bible with dedication and reverence.
                  </p>
                  <div className="flex items-center space-x-4 p-4 bg-blue-50 rounded-lg">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">📖</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">2 Timothy 3:16-17</p>
                      <p className="text-sm text-gray-600">The Bible contains God's mind and will for our lives</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
                  <blockquote className="text-lg italic text-gray-700 leading-relaxed">
                    "Long ago, at many times and in many ways, God spoke to our fathers by the prophets, but in these 
                    last days, He has spoken to us by His Son, Whom He appointed the Heir of all things, through whom 
                    also, He created the world"
                  </blockquote>
                  <footer className="mt-4 text-blue-700 font-semibold">— Hebrews 1:1-2</footer>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Study the Bible */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center bg-white px-4 py-2 rounded-full text-blue-700 text-sm font-medium mb-4 shadow-sm">
                  Biblical Authority
                </div>
                <h2 className="text-4xl font-bold text-gray-800 mb-6">Why Study the Bible?</h2>
                <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto"></div>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    title: "Perfect and Complete",
                    verse: "Psalm 19:7",
                    description: "It is infallible in its totality and complete in every part.",
                    quote: "The law of the Lord is perfect, reviving the soul",
                    icon: "✨"
                  },
                  {
                    title: "Every Word True",
                    verse: "Proverbs 30:5-6",
                    description: "It is infallible and inerrant in all its parts.",
                    quote: "Every word of God proves true",
                    icon: "🎯"
                  },
                  {
                    title: "Authoritative and Final",
                    verse: "Psalm 119:89",
                    description: "God's word is the final authority in all matters of faith and practice.",
                    quote: "Forever O Lord, your word is firmly fixed",
                    icon: "⚖️"
                  },
                  {
                    title: "Sufficient for All Needs",
                    verse: "2 Timothy 3:16-17",
                    description: "It equips believers for every good work and spiritual need.",
                    quote: "that the man of God may be complete",
                    icon: "🛡️"
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                    <div className="text-3xl mb-4">{item.icon}</div>
                    <h3 className="text-lg font-bold text-gray-800 mb-3">{item.title}</h3>
                    <p className="text-sm text-blue-600 font-semibold mb-3">{item.verse}</p>
                    <p className="text-blue-700 text-sm italic mb-3">"{item.quote}"</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Core Beliefs */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-blue-50 px-4 py-2 rounded-full text-blue-700 text-sm font-medium mb-4">
                Doctrinal Foundation
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Core Beliefs</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                These fundamental truths form the bedrock of our faith and guide our understanding of God's plan of salvation.
              </p>
            </div>
            
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-6">
                {beliefs.map((belief, index) => (
                  <div key={index} className="group bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-2xl border-l-4 border-blue-500 hover:border-purple-500 transition-all duration-300 hover:shadow-lg">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 group-hover:bg-purple-100 rounded-full flex items-center justify-center transition-colors duration-300">
                        <span className="text-blue-600 group-hover:text-purple-600 font-bold text-sm">{index + 1}</span>
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-800 transition-colors duration-300">
                          {belief.title}
                        </h3>
                        <p className="text-sm text-blue-700 font-semibold mb-3">{belief.verse}</p>
                        <p className="text-gray-600 text-sm leading-relaxed">{belief.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-20 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-5xl mx-auto">
              <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-8">
                <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                Our Purpose
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Our Mission</h2>
              <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed">
                To unleash God's truth one verse at a time, teaching the Bible with unwavering commitment 
                to its authority, sufficiency, and transformative power in the lives of believers.
              </p>
              
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <h3 className="text-2xl font-bold mb-6 text-yellow-400">Our Primary Focus</h3>
                <p className="text-lg text-blue-100 leading-relaxed">
                  Teaching the Bible is our primary focus. We believe that through careful study and exposition 
                  of Scripture, believers are equipped to live lives that honor God and proclaim His truth to the world.
                </p>
              </div>
            </div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute top-20 right-20 w-40 h-40 border border-white/10 rounded-full"></div>
          <div className="absolute bottom-20 left-20 w-32 h-32 border border-white/10 rounded-full"></div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Join Us in Studying God's Word</h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                Experience the transformative power of God's Word in a community committed to Biblical truth and fellowship.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link href="/services" className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  <span className="flex items-center justify-center">
                    Join Our Services
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </span>
                </Link>
                <Link href="/contact" className="group border-2 border-blue-600 hover:bg-blue-600 hover:text-white text-blue-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  <span className="flex items-center justify-center">
                    Contact Us
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </span>
                </Link>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="text-3xl mb-4">🕐</div>
                  <h3 className="font-bold text-gray-800 mb-2">Service Times</h3>
                  <p className="text-gray-600 text-sm">Join us for worship and Bible study</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="text-3xl mb-4">📍</div>
                  <h3 className="font-bold text-gray-800 mb-2">Our Location</h3>
                  <p className="text-gray-600 text-sm">Find us in your community</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm">
                  <div className="text-3xl mb-4">🤝</div>
              <h3 className="font-bold text-gray-800 mb-2">Get Involved</h3>
                  <p className="text-gray-600 text-sm">Discover ways to serve and grow</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">CJC</span>
                  </div>
                  <div>
                    <h3 className="font-bold">Calvary Jesus Church</h3>
                    <p className="text-xs text-gray-400">Unleashing God's Truth</p>
                  </div>
                </div>
                <p className="text-gray-400 text-sm">
                  Founded on Biblical truth and committed to the authority of God's Word.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  {navigationLinks.slice(0, 4).map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">More Pages</h4>
                <ul className="space-y-2">
                  {navigationLinks.slice(4).map((link) => (
                    <li key={link.name}>
                      <Link href={link.href} className="text-gray-400 hover:text-white text-sm transition-colors">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Contact Info</h4>
                <div className="space-y-2 text-sm text-gray-400">
                  <p>📧 Pst.bruce67@gmail.com</p>
                  <p>📞 +254 (0) 735464102</p>
                  <p>📍 Nyaduong' Migori, Kenya</p>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center">
              <p className="text-gray-400 text-sm">
                © 2025 Calvary Jesus Church. All rights reserved. | Built with faith and dedication to God's Word.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AboutPage;
