import React from 'react'
import Link from 'next/link'
import { Phone, Mail, MapPin, Facebook, Clock, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'

const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Ministries', href: '/ministries' },
    { name: 'Events', href: '/events' },
    { name: 'Resources', href: '/resources' },
    { name: 'Contact', href: '/contact' },
  ]

  const ministries = [
    { name: 'Children Ministry', href: '/ministries#children' },
    { name: 'Youth Ministry', href: '/ministries#youth' },
    { name: 'Adult Ministry', href: '/ministries#adults' },
    { name: 'Music Ministry', href: '/ministries#music' },
    { name: 'Outreach', href: '/ministries#outreach' },
  ]

  const resources = [
    { name: 'Sermons', href: '/resources#sermons' },
    { name: 'Bible Study', href: '/resources#bible-study' },
    { name: 'Prayer Requests', href: '/resources#prayer' },
    { name: 'Downloads', href: '/resources#downloads' },
  ]

  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Church Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">CJC</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">Calvary Jesus Church</h3>
                <p className="text-gray-300 text-sm">Unleashing God's truth one verse at a time</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              We are a dedicated church focused on Biblical doctrine, believing that the Bible is complete 
              and the only source of divine authority for our lives.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=100064378341874"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ministries */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Ministries</h4>
            <ul className="space-y-2">
              {ministries.map((ministry) => (
                <li key={ministry.name}>
                  <Link
                    href={ministry.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {ministry.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-400 mt-0.5" />
                <div>
                  <p className="text-gray-300 text-sm">
                    Nyaduong' village, Migori<br />
                    Next to Nyaduong' Secondary School
                  </p>
                  <p className="text-gray-300 text-sm mt-1">
                    Oruba, Migori Town<br />
                    Inside Dip Primary School
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-400" />
                <a
                  href="tel:+254735464102"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  +254 735 464 102
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-400" />
                <a
                  href="mailto:Pst.bruce67@gmail.com"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Pst.bruce67@gmail.com
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-primary-400 mt-0.5" />
                <div>
                  <p className="text-gray-300 text-sm">Sunday Services:</p>
                  <p className="text-gray-300 text-sm">9:00 AM - 12:00 PM</p>
                  <p className="text-gray-300 text-sm">2:00 PM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scripture Quote */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="text-center">
            <blockquote className="scripture-text text-gray-300 text-lg italic mb-4">
              "Long ago, at many times and in many ways, God spoke to our fathers by the prophets, 
              but in these last days, He has spoken to us by His Son..."
            </blockquote>
            <cite className="text-primary-400 text-sm">Hebrews 1:1-2</cite>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-gray-300 text-sm">
            <span>&copy; {new Date().getFullYear()} Calvary Jesus Church. All rights reserved.</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-300 text-sm mt-4 md:mt-0">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>for God's glory</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
