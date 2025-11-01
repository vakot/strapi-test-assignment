import { NextResponse } from 'next/server'

export const JTW_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export const withCookieJWT = (res: NextResponse, jwt: string) => {
  res.cookies.set('jwt', jwt, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: JTW_MAX_AGE,
    sameSite: 'lax',
  })

  return res
}
