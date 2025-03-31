'use client'

import { usePathname } from 'next/navigation'
import NextTopLoader from 'nextjs-toploader'

const ignoreLoader = ['/search']

export default function NextTopLoaderClient() {
  const pathname = usePathname()
  const isIgnoreLoader = Boolean(ignoreLoader.find((path) => path === pathname))

  return (
    <NextTopLoader
      color={isIgnoreLoader ? 'transparent' : '#0061BD'}
      initialPosition={0.08}
      crawlSpeed={200}
      height={3}
      crawl={true}
      showSpinner={false}
      easing='ease'
      speed={200}
    />
  )
}
