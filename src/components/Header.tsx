import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, Facebook, ChevronDown } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const navigationItems = [
    { name: 'Home', href: '/' },
    { 
      name: 'About Us', 
      href: '/about',
      dropdown: [
        { name: 'Our Story', href: '/about#story' },
        { name: 'Leadership Team', href: '/about#leadership' },
        { name: 'Beliefs & Values', href: '/about#beliefs' },
        { name: 'Mission Statement', href: '/about#mission' }
      ]
    },
    { 
      name: 'Services', 
      href: '/services',
      dropdown: [
        { name: 'Service Times', href: '/services#times' },
        { name: 'Online Services', href: '/services#online' },
        { name: 'Special Events', href: '/services#special-events' },
        { name: 'Sermon Archive', href: '/services#archive' }
      ]
    },
    { 
      name: 'Ministries', 
      href: '/ministries',
      dropdown: [
        { name: 'Children\'s Ministry', href: '/ministries#children' },
        { name: 'Youth Ministry', href: '/ministries#youth' },
        { name: 'Adult Ministry', href: '/ministries#adults' },
        { name: 'Music Ministry', href: '/ministries#music' },
        { name: 'Community Outreach', href: '/ministries#outreach' }
      ]
    },
    { name: 'Events', href: '/events' },
    { 
      name: 'Resources', 
      href: '/resources',
      dropdown: [
        { name: 'Sermons', href: '/resources/sermons' },
        { name: 'Bible Study', href: '/resources/bible-study' },
        { name: 'Prayer Requests', href: '/resources/prayer' },
        { name: 'Downloads', href: '/resources/downloads' }
      ]
    },
    { name: 'Give', href: '/give' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-blue-900 text-white py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <a href="tel:+254735464102" className="hover:text-blue-200 transition duration-300">
                +254 735 464 102
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <a href="mailto:Pst.bruce67@gmail.com" className="hover:text-blue-200 transition duration-300">
                calvaryjesuschurch.org
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span>Follow us:</span>
            <a 
              href="https://www.facebook.com/profile.php?id=100064378341874" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-blue-200 transition duration-300"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-lg' : 'bg-white/95 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                {/* Placeholder for logo - replace with actual logo image */}
                <img 
                  src="/images/logo/logo1.jpg" 
                  alt="Calvary Jesus Church Logo" 
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    // Fallback if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Calvary Jesus Church</h1>
                <p className="text-sm text-gray-600 hidden sm:block">Biblical Truth • One Verse at a Time</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative group">
                  <a
                    href={item.href}
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition duration-300 flex items-center"
                    onMouseEnter={() => item.dropdown && setActiveDropdown(item.name)}
                    onMouseLeave={() => !item.dropdown && setActiveDropdown(null)}
                  >
                    {item.name}
                    {item.dropdown && <ChevronDown className="ml-1 h-4 w-4" />}
                  </a>
                  
                  {/* Dropdown Menu */}
                  {item.dropdown && (
                    <div 
                      className={`absolute top-full left-0 mt-1 w-56 bg-white shadow-lg rounded-md border transition-all duration-200 ${
                        activeDropdown === item.name ? 'opacity-100 visible' : 'opacity-0 invisible'
                      }`}
                      onMouseEnter={() => setActiveDropdown(item.name)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className="py-2">
                        {item.dropdown.map((dropdownItem) => (
                          <a
                            key={dropdownItem.name}
                            href={dropdownItem.href}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-300"
                          >
                            {dropdownItem.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <a
                href="/give"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 font-semibold"
              >
                Give
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition duration-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="bg-white border-t border-gray-200">
            <div className="px-4 py-2 space-y-1">
              {navigationItems.map((item) => (
                <div key={item.name}>
                  <div className="flex items-center justify-between">
                    <a
                      href={item.href}
                      className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition duration-300 flex-1"
                      onClick={() => !item.dropdown && setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                    {item.dropdown && (
                      <button
                        onClick={() => handleDropdownToggle(item.name)}
                        className="p-2 text-gray-500 hover:text-blue-600"
                      >
                        <ChevronDown 
                          className={`h-4 w-4 transition-transform duration-200 ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`} 
                        />
                      </button>
                    )}
                  </div>
                  
                  {/* Mobile Dropdown */}
                  {item.dropdown && activeDropdown === item.name && (
                    <div className="ml-4 border-l-2 border-blue-100">
                      {item.dropdown.map((dropdownItem) => (
                        <a
                          key={dropdownItem.name}
                          href={dropdownItem.href}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition duration-300"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {dropdownItem.name}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile Contact Info */}
              <div className="pt-4 mt-4 border-t border-gray-200">
                <div className="px-3 py-2 space-y-2">
                  <a
                    href="tel:+254735464102"
                    className="flex items-center text-sm text-gray-600 hover:text-blue-600"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    +254 735 464 102
                  </a>
                  <a
                    href="mailto:Pst.bruce67@gmail.com"
                    className="flex items-center text-sm text-gray-600 hover:text-blue-600"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Pst.bruce67@gmail.com
                  </a>
                </div>
                <div className="px-3 py-2">
                  <a
                    href="/give"
                    className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Give
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
