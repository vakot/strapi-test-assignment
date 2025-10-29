import { Toaster } from '@components/ui/sonner'
import { UserProvider } from '@contexts/user/UserProvider'
import type { User } from '@services/user/types'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { cookies } from 'next/headers'
import './globals.css'

const getUser = async () => {
  const c = await cookies()
  const token = c.get('jwt')?.value

  let user = null

  if (token) {
    const res = await fetch(`${process.env.STRAPI_API_URL}/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: 'no-store',
    })

    if (res.ok) {
      user = await res.json()
    }
  }

  return user
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'App',
  description: 'Authenticated Next.js app',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Query ~ User
  const user: User = await getUser()

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-sm`}
      >
        <UserProvider value={user}>{children}</UserProvider>
        <Toaster />
      </body>
    </html>
  )
}
