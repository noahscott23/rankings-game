import './globals.css'
import { Poppins } from 'next/font/google'
import { Analytics } from "@vercel/analytics/next"

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

export const metadata = {
  title: 'US States Ranking Game',
  description: 'Test your knowledge of US state rankings',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

