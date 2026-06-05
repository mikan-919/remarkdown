import { JetBrains_Mono } from 'next/font/google'
import localFont from 'next/font/local'

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--jetbrains-mono',
})

export const udevGothic = localFont({
  src: [
    {
      path: '../../fonts/UDEVGothicNF-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../fonts/UDEVGothicNF-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-udev',
  display: 'swap',
})
