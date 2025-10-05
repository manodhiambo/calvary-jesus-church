import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import '@/styles/globals.css'

export default function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    // Add smooth scrolling behavior
    document.documentElement.style.scrollBehavior = 'smooth'
    
    // Handle route changes for analytics (if you add analytics later)
    const handleRouteChange = (url: string) => {
      // Track page views here if needed
      console.log('Route changed to:', url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router])

  return <Component {...pageProps} />
}
