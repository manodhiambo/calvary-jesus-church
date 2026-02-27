import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Clock, Heart, BookOpen } from 'lucide-react';

const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Ministries', href: '/ministries' },
    { name: 'Events', href: '/events' },
    { name: 'Resources', href: '/resources' },
    { name: 'Give', href: '/give' },
    { name: 'Contact', href: '/contact' },
  ];

  const ministries = [
    { name: "Children's Ministry", href: '/ministries#children' },
    { name: 'Youth Ministry', href: '/ministries#youth' },
    { name: 'Adult Ministry', href: '/ministries#adults' },
    { name: 'Music Ministry', href: '/ministries#music' },
    { name: 'Community Outreach', href: '/ministries#outreach' },
  ];

  return (
    <footer className="bg-cjc-navy text-white">
      {/* Gold accent top line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-cjc-gold to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Church identity */}
          <div className="lg:col-span-1 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-cjc-gold/40 flex-shrink-0">
                <img
                  src="/images/logo/logo1.jpg"
                  alt="CJC Logo"
                  className="w-full h-full object-cover"
                  onError={e => {
                    const t = e.target as HTMLImageElement;
                    t.style.display = 'none';
                  }}
                />
              </div>
              <div>
                <h3 className="font-heading text-base font-bold leading-tight">Calvary Jesus Church</h3>
                <p className="text-cjc-gold text-xs font-medium tracking-wider uppercase mt-0.5">Migori, Kenya</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              A Bible-centered church dedicated to teaching God's Word faithfully,
              building lives on the solid foundation of Biblical truth.
            </p>
            <a
              href="https://www.facebook.com/profile.php?id=100064378341874"
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-cjc-blue/60 hover:bg-cjc-gold/20 border border-white/10 hover:border-cjc-gold/40 text-gray-300 hover:text-cjc-gold px-4 py-2 rounded-lg text-sm transition-all duration-300"
            >
              <Facebook className="w-4 h-4" /> Follow on Facebook
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-base font-semibold mb-5 text-cjc-gold">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(link => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-400 hover:text-cjc-gold transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-cjc-gold/40 group-hover:bg-cjc-gold transition-colors flex-shrink-0" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ministries */}
          <div>
            <h4 className="font-heading text-base font-semibold mb-5 text-cjc-gold">Ministries</h4>
            <ul className="space-y-2.5">
              {ministries.map(m => (
                <li key={m.name}>
                  <Link href={m.href} className="text-gray-400 hover:text-cjc-gold transition-colors text-sm flex items-center gap-2 group">
                    <span className="w-1 h-1 rounded-full bg-cjc-gold/40 group-hover:bg-cjc-gold transition-colors flex-shrink-0" />
                    {m.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-base font-semibold mb-5 text-cjc-gold">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-cjc-gold mt-0.5 flex-shrink-0" />
                <p className="text-gray-400 text-sm leading-relaxed">
                  Nyaduong' Village, Migori<br />
                  Next to Nyaduong' Secondary School
                </p>
              </div>
              <a href="tel:+254735464102" className="flex items-center gap-3 text-gray-400 hover:text-cjc-gold transition-colors text-sm">
                <Phone className="w-4 h-4 text-cjc-gold flex-shrink-0" />
                +254 735 464 102
              </a>
              <a href="mailto:Pst.bruce67@gmail.com" className="flex items-center gap-3 text-gray-400 hover:text-cjc-gold transition-colors text-sm">
                <Mail className="w-4 h-4 text-cjc-gold flex-shrink-0" />
                Pst.bruce67@gmail.com
              </a>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-cjc-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-400 text-sm">Sunday Service</p>
                  <p className="text-white text-sm font-medium">9:00 AM – 12:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scripture quote */}
        <div className="mt-12 pt-10 border-t border-white/10 text-center">
          <BookOpen className="w-6 h-6 text-cjc-gold/50 mx-auto mb-4" />
          <blockquote className="scripture-text text-gray-300 text-lg max-w-2xl mx-auto mb-3">
            "Long ago, at many times and in many ways, God spoke to our fathers by the prophets,
            but in these last days He has spoken to us by His Son..."
          </blockquote>
          <cite className="text-cjc-gold text-sm not-italic font-medium">— Hebrews 1:1-2</cite>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Calvary Jesus Church. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-gray-500 text-sm">
            Made with <Heart className="w-3.5 h-3.5 text-cjc-gold fill-cjc-gold" /> for God's glory
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
