import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Menu, X, ChevronDown, Sun, Moon } from 'lucide-react'
import { cn } from '@/lib/utils'
import Button from './ui/Button'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
    }
  }

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { 
      name: 'Ministries', 
      href: '/ministries',
      submenu: [
        { name: 'Children Ministry', href: '/ministries#children' },
        { name: 'Youth Ministry', href: '/ministries#youth' },
        { name: 'Adult Ministry', href: '/ministries#adults' },
        { name: 'Music Ministry', href: '/ministries#music' },
        { name: 'Outreach', href: '/ministries#outreach' },
      ]
    },
    { name: 'Events', href: '/events' },
    { 
      name: 'Resources', 
      href: '/resources',
      submenu: [
        { name: 'Sermons', href: '/resources#sermons' },
        { name: 'Bible Study', href: '/resources#bible-study' },
        { name: 'Prayer', href: '/resources#prayer' },
        { name: 'Downloads', href: '/resources#downloads' },
      ]
    },
    { name: 'Give', href: '/give' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (href: string) => router.pathname === href

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isScrolled 
        ? "bg-white/95 dark:bg-navy-900/95 backdrop-blur-md shadow-lg" 
        : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="text-white font-bold text-lg lg:text-xl">CJC</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg lg:text-xl font-bold text-navy-900 dark:text-white">
                Calvary Jesus Church
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-300 -mt-1">
                Unleashing God's truth one verse at a time
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200",
                    isActive(item.href)
                      ? "text-primary-600 bg-primary-50 dark:bg-primary-900/20"
                      : "text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                  )}
                  onMouseEnter={() => item.submenu && setOpenSubmenu(item.name)}
                  onMouseLeave={() => setOpenSubmenu(null)}
                >
                  {item.name}
                  {item.submenu && (
                    <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                  )}
                </Link>
                
                {/* Submenu */}
                {item.submenu && openSubmenu === item.name && (
                  <div 
                    className="absolute left-0 mt-2 w-48 bg-white dark:bg-navy-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 py-1 z-50"
                    onMouseEnter={() => setOpenSubmenu(item.name)}
                    onMouseLeave={() => setOpenSubmenu(null)}
                  >
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.name}
                        href={subItem.href}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-primary-600 dark:hover:text-primary-400"
                        onClick={() => setOpenSubmenu(null)}
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {/* Give Button */}
            <div className="hidden sm:block">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => router.push('/give')}
              >
                Give
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-navy-900 rounded-b-lg shadow-lg">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200",
                      isActive(item.href)
                        ? "text-primary-600 bg-primary-50 dark:bg-primary-900/20"
                        : "text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.submenu && (
                    <div className="pl-4 space-y-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-3 py-1 text-sm text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <Button
                  variant="secondary"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    router.push('/give')
                    setIsMenuOpen(false)
                  }}
                >
                  Give
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
