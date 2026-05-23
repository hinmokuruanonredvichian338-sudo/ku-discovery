import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  variable: '--font-noto',
})

export const metadata: Metadata = {
  title: 'KU発見 - Kindle Unlimitedを探索しよう',
  description:
    'Kindle Unlimitedに登録されている本・マンガをジャンルから探して発見できるサイト',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body className="min-h-screen bg-gray-50 font-sans">{children}</body>
    </html>
  )
}
