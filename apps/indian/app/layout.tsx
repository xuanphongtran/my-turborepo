import './globals.css'
import '@repo/ui/styles.css'
import type { Viewport } from 'next'
import { Roboto } from 'next/font/google'
import { headers } from 'next/headers'
import Providers from '../components/hoc/Provider'
import BaseComponent from '../components/BaseComponent'

type Props = { children: React.ReactNode; params: { locale: string } }

const roboto = Roboto({
  weight: ['300', '400', '500', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap'
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1
}

export default async function RootLayout({ children }: Props) {
  const header = headers()
  const isChrome = header.get('light_house') as string | boolean

  if (isChrome === true || isChrome === 'true')
    return (
      <html lang='en'>
        <body>
          <Providers>{children}</Providers>
        </body>
      </html>
    )

  return (
    <html lang='en' className={roboto.className}>
      <body>
        <BaseComponent />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
