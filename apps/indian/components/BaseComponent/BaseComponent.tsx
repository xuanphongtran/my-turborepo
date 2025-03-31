'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { useEffect } from 'react'
import { NEXT_PUBLIC_GOOGLE_GTM } from '../../constants/env'
import { deleteCookie, getCookie } from 'cookies-next'

/**
 * Defined class TailwindCss
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const definedClassName =
  'btn-primary-outline gap-[15px] lg:gap-5 grid-cols-5 lg:grid-cols-1 lg:h-[22px] h-[34px] w-[60px] w-[74px] space-y-4 lg:space-y-6 lg:w-[67px] lg:w-[82px]'

export default function BaseComponent() {
  const pathname = usePathname()
  /**
   * Add script for Cloudflare Turnstile
   */
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit'
    script.async = true
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  useEffect(() => {
    const link = document.createElement('link')
    link.href =
      'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;1,100;1,300;1,400;1,500;1,700&display=swap'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
    return () => {
      document.head.removeChild(link)
    }
  }, [])

  /**
   * Delete cookie __category_search if is not in search page
   */
  useEffect(() => {
    if (pathname !== '/search' && getCookie('__category_search')) {
      deleteCookie('__category_search')
    }
  }, [pathname])

  return (
    <>
      <Script
        id='google-tag-manager'
        dangerouslySetInnerHTML={{
          __html: `<!-- Google Tag Manager -->
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${NEXT_PUBLIC_GOOGLE_GTM}');
          <!-- End Google Tag Manager -->`
        }}
      />
    </>
  )
}
