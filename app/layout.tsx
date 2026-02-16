import type { Metadata } from 'next'
import { Playfair_Display, Lato } from 'next/font/google'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Angie Created | DIY, Recipes & Gardening',
  description:
    'Handmade with love. Custom tote bags, live DIY workshops, upcycling projects, recipes, and gardening inspiration from Angie Gibson.',
  keywords: ['DIY', 'upcycling', 'custom tote bags', 'online workshops', 'gardening', 'recipes', 'handmade'],
  openGraph: {
    title: 'Angie Created | DIY, Recipes & Gardening',
    description: 'Handmade with love. Custom tote bags, live workshops, and creative inspiration.',
    type: 'website',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Angie Created',
    description: 'Handmade with love. Custom tote bags, live workshops, and creative inspiration.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${lato.variable}`}>
      <body className="bg-cream text-bark font-body min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
