import type { Metadata } from 'next'
import { Elms_Sans } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import { jetbrainsMono, udevGothic } from '@/lib/font'

const elmsSans = Elms_Sans({ subsets: ['latin'], display: 'swap', variable: '--elms-sans', adjustFontFallback: false })
export const metadata: Metadata = {
  title: 'Remarkdown',
  description: 'Markdownを見ながらまとめ、翻訳する。',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='ja'
      className={`${jetbrainsMono.className} ${elmsSans.className} ${udevGothic.className}  h-full antialiased`}
    >
      <body className='h-dvh overflow-hidden w-dvw flex flex-col m-0 bg-cloud'>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
