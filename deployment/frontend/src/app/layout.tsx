import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hotel Operations Management',
  description: 'Manage hotel operations efficiently',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        {children}
      </body>
    </html>
  )
}