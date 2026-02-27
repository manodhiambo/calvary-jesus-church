import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Mail, Facebook, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    {
      name: 'About Us', href: '/about',
      dropdown: [
        { name: 'Our Story', href: '/about#story' },
        { name: 'Leadership Team', href: '/about#leadership' },
        { name: 'Beliefs & Values', href: '/about#beliefs' },
        { name: 'Mission Statement', href: '/about#mission' },
      ],
    },
    {
      name: 'Services', href: '/services',
      dropdown: [
        { name: 'Service Times', href: '/services#times' },
        { name: 'Online Services', href: '/services#online' },
        { name: 'Special Events', href: '/services#special-events' },
        { name: 'Sermon Archive', href: '/services#archive' },
      ],
    },
    {
      name: 'Ministries', href: '/ministries',
      dropdown: [
        { name: "Children's Ministry", href: '/ministries#children' },
        { name: 'Youth Ministry', href: '/ministries#youth' },
        { name: 'Adult Ministry', href: '/ministries#adults' },
        { name: 'Music Ministry', href: '/ministries#music' },
        { name: 'Community Outreach', href: '/ministries#outreach' },
      ],
    },
    { name: 'Events', href: '/events' },
    {
      name: 'Resources', href: '/resources',
      dropdown: [
        { name: 'Sermons', href: '/resources/sermons' },
        { name: 'Bible Study', href: '/resources/bible-study' },
        { name: 'Prayer Requests', href: '/resources/prayer' },
        { name: 'Downloads', href: '/resources/bible-study' },
      ],
    },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <>
      {/* ── Gold Top Bar ── */}
      <div className="bg-cjc-navy text-white py-2 px-4 hidden md:block border-b border-cjc-gold/20">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-xs">
          <div className="flex items-center gap-6">
            <a href="tel:+254735464102" className="flex items-center gap-1.5 hover:text-cjc-gold transition-colors">
              <Phone className="w-3 h-3 text-cjc-gold" />
              +254 735 464 102
            </a>
            <a href="mailto:Pst.bruce67@gmail.com" className="flex items-center gap-1.5 hover:text-cjc-gold transition-colors">
              <Mail className="w-3 h-3 text-cjc-gold" />
              Pst.bruce67@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3 text-gray-300">
            <span>Sunday 9:00 AM – 12:00 PM</span>
            <span className="text-cjc-gold/40">|</span>
            <a
              href="https://www.facebook.com/profile.php?id=100064378341874"
              target="_blank" rel="noopener noreferrer"
              className="hover:text-cjc-gold transition-colors flex items-center gap-1.5"
            >
              <Facebook className="w-3 h-3" /> Facebook
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Header ── */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md border-b border-gray-100'
          : 'bg-white/98 backdrop-blur-sm border-b border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 flex-shrink-0">
              <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-cjc-gold/30 flex-shrink-0">
                <img
                  src="/images/logo/logo1.jpg"
                  alt="CJC Logo"
                  className="w-full h-full object-cover"
                  onError={e => {
                    const t = e.target as HTMLImageElement;
                    t.style.display = 'none';
                    const fb = t.nextElementSibling as HTMLElement;
                    if (fb) fb.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-full h-full bg-cjc-navy flex items-center justify-center">
                  <span className="text-cjc-gold font-bold text-lg font-heading">C</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-cjc-navy leading-tight font-heading">Calvary Jesus Church</p>
                <p className="text-[10px] text-cjc-gold font-medium tracking-wider uppercase hidden sm:block">
                  Unleashing God's Truth
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map(item => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-0.5 px-3 py-2 text-sm font-medium text-gray-700 hover:text-cjc-gold transition-colors rounded-md group"
                  >
                    {item.name}
                    {item.dropdown && (
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180 text-cjc-gold' : ''}`} />
                    )}
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-cjc-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-200 rounded-full" />
                  </Link>

                  {item.dropdown && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                      {/* gold accent top bar */}
                      <div className="absolute top-0 left-4 right-4 h-0.5 bg-gradient-to-r from-transparent via-cjc-gold to-transparent rounded-full" />
                      {item.dropdown.map(sub => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-600 hover:text-cjc-gold hover:bg-cjc-gold/5 transition-colors"
                        >
                          <span className="w-1 h-1 rounded-full bg-cjc-gold/50 flex-shrink-0" />
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Give CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/give"
                className="bg-cjc-gold hover:bg-cjc-gold-mid text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm"
              >
                Give
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:text-cjc-gold hover:bg-gray-50 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
          <div className="bg-white border-t border-gray-100 px-4 py-3 space-y-1">
            {navItems.map(item => (
              <div key={item.name}>
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    className="flex-1 px-3 py-2.5 text-sm font-medium text-gray-700 hover:text-cjc-gold transition-colors"
                    onClick={() => !item.dropdown && setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                      className="p-2 text-gray-400 hover:text-cjc-gold transition-colors"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                    </button>
                  )}
                </div>
                {item.dropdown && activeDropdown === item.name && (
                  <div className="ml-4 border-l-2 border-cjc-gold/30 pl-3 space-y-0.5 mb-1">
                    {item.dropdown.map(sub => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="block py-2 text-sm text-gray-500 hover:text-cjc-gold transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile contact + give */}
            <div className="pt-3 mt-3 border-t border-gray-100 space-y-2">
              <a href="tel:+254735464102" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500">
                <Phone className="w-4 h-4 text-cjc-gold" /> +254 735 464 102
              </a>
              <a href="mailto:Pst.bruce67@gmail.com" className="flex items-center gap-2 px-3 py-2 text-sm text-gray-500">
                <Mail className="w-4 h-4 text-cjc-gold" /> Pst.bruce67@gmail.com
              </a>
              <Link
                href="/give"
                className="block w-full text-center bg-cjc-gold hover:bg-cjc-gold-mid text-white py-2.5 rounded-lg text-sm font-semibold transition-colors mt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Give
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
