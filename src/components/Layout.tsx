import React from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import { cn } from '@/lib/utils'

interface LayoutProps {
  children: React.ReactNode
  title?: string
  description?: string
  keywords?: string
  ogImage?: string
  noIndex?: boolean
  className?: string
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title = 'Calvary Jesus Church - Unleashing God\'s truth one verse at a time',
  description = 'Calvary Jesus Church is based on Biblical doctrine solely. We believe that the Bible is complete and the only source of divine authority. Join us in Migori for Sunday services.',
  keywords = 'Calvary Jesus Church, Migori, Kenya, Bible study, Christian church, Sunday service, Biblical doctrine, faith, worship',
  ogImage = '/images/og-image.jpg',
  noIndex = false,
  className = ''
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0ea5e9" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:site_name" content="Calvary Jesus Church" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Canonical URL */}
        <link rel="canonical" href={`https://calvaryjesuschurch.com${typeof window !== 'undefined' ? window.location.pathname : ''}`} />
        
        {/* No Index */}
        {noIndex && <meta name="robots" content="noindex, nofollow" />}
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Church",
              "name": "Calvary Jesus Church",
              "description": description,
              "url": "https://calvaryjesuschurch.com",
              "telephone": "+254735464102",
              "email": "Pst.bruce67@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Nyaduong' village, next to Nyaduong' Secondary School",
                "addressLocality": "Migori",
                "addressCountry": "Kenya"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -1.063976,
                "longitude": 34.473376
              },
              "openingHours": "Su 09:00-12:00,14:00-16:00",
              "sameAs": [
                "https://www.facebook.com/profile.php?id=100064378341874"
              ]
            })
          }}
        />
      </Head>
      
      <div className={cn("min-h-screen flex flex-col", className)}>
        <Header />
        <main className="flex-1 pt-16 lg:pt-20">
          {children}
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Layout
