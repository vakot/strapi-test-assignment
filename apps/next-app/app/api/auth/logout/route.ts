import { NextResponse } from 'next/server'

export async function POST() {
  const res = NextResponse.json({ message: 'Logged out' })

  // Remove the cookie by setting it with maxAge=0
  res.cookies.set('jwt', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0, // expires immediately
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  })

  return res
}
