import { Toaster } from '@components/ui/sonner'
import { API_BASE_URL } from '@constants/api'
import { ApiEndpoints } from '@constants/routes'
import { UserProvider } from '@contexts/user/UserProvider'
import type { User } from '@services/user/types'
import axios from 'axios'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { cookies as headers } from 'next/headers'
import './globals.css'

const getUser = async () => {
  const cookies = await headers()
  const cookie = cookies.get('jwt')
  const token = cookie?.value

  if (!token) return null

  try {
    const { data: user } = await axios.get(
      `${API_BASE_URL}/${ApiEndpoints.Me}`,
      { headers: { Authorization: `Bearer ${token}` } },
    )

    return user
  } catch {
    return null
  }
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
