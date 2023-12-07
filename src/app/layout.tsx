import { Quando, Quicksand } from 'next/font/google'
import './globals.css'

const quando = Quando({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-quando'
})

const quicksand = Quicksand({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-quicksand'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${quando.variable} ${quicksand.variable}`}>{children}</body>
    </html>
  )
}
