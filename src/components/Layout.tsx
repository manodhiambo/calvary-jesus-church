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
  canonicalPath?: string
}

const SITE_URL = 'https://cjc.org'
const SITE_NAME = 'Calvary Jesus Church'
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-image.jpg`

const Layout: React.FC<LayoutProps> = ({
  children,
  title = `${SITE_NAME} – Unleashing God's Truth One Verse at a Time`,
  description = 'Calvary Jesus Church (CJC) in Migori, Kenya. A Bible-centered church dedicated to expository teaching of God\'s Word, fellowship, prayer, and building lives on solid Biblical doctrine.',
  keywords = 'Calvary Jesus Church, CJC, cjc.org, Migori church, Kenya church, Bible teaching, expository preaching, Sunday service, Christian fellowship, Biblical doctrine, Pastor Bruce',
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
  className = '',
  canonicalPath = '',
}) => {
  const canonicalUrl = `${SITE_URL}${canonicalPath}`
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`

  return (
    <>
      <Head>
        {/* Primary Meta */}
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#d97706" />
        <meta name="author" content="Calvary Jesus Church" />

        {/* Robots */}
        {noIndex
          ? <meta name="robots" content="noindex, nofollow" />
          : <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        }

        {/* Canonical */}
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content="en_KE" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        {/* Geo tags */}
        <meta name="geo.region" content="KE-44" />
        <meta name="geo.placename" content="Migori, Kenya" />
        <meta name="geo.position" content="-1.063976;34.473376" />
        <meta name="ICBM" content="-1.063976, 34.473376" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Structured Data – Church */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Church",
              "name": SITE_NAME,
              "alternateName": "CJC",
              "description": description,
              "url": SITE_URL,
              "logo": `${SITE_URL}/images/logo/cjc-logo.png`,
              "image": ogImage,
              "telephone": "+254735464102",
              "email": "Pst.bruce67@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Nyaduong' Village, next to Nyaduong' Secondary and Primary Schools",
                "addressLocality": "Migori",
                "addressRegion": "Migori County",
                "addressCountry": "KE"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -1.063976,
                "longitude": 34.473376
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Sunday",
                  "opens": "09:00",
                  "closes": "12:00"
                }
              ],
              "sameAs": [
                "https://www.facebook.com/profile.php?id=100064378341874"
              ],
              "foundingDate": "2010",
              "denomination": "Non-denominational / Biblical"
            })
          }}
        />

        {/* Breadcrumb / WebSite Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": SITE_NAME,
              "url": SITE_URL,
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${SITE_URL}/resources/sermons?search={search_term_string}`
                },
                "query-input": "required name=search_term_string"
              }
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
