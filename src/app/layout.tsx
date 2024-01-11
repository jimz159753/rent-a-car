'use client'
import { Quando, Quicksand } from 'next/font/google'
import Head from 'next/head'
import { AntdRegistry } from '@ant-design/nextjs-registry';
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
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </Head>
      <body className={`${quando.variable} ${quicksand.variable}`}>
        <AntdRegistry>{children}</AntdRegistry>
      </body>
    </html>
  )
}
