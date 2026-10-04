import type { Metadata } from 'next'
import './globals.css'
import { WorldShell } from './components/world/WorldShell'

export const metadata: Metadata = {
  title: 'Noor World 🌻',
  description: 'A tiny corner of the internet made of flowers, friends, little games and kind things.',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover'
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        <WorldShell>
          {children}
        </WorldShell>
      </body>
    </html>
  )
}

