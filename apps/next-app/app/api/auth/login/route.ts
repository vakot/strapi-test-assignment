import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    // Parse incoming JSON body
    const body = await req.json()

    // Send POST request to Strapi
    const res = await fetch(`${process.env.STRAPI_API_URL}/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    })

    const data = await res.json()

    // Check if Strapi returned a JWT
    const { jwt, user } = data
    const response = NextResponse.json(user, { status: res.status })

    if (jwt) {
      response.cookies.set('jwt', jwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        sameSite: 'lax',
      })
    }

    return response
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Unknown error' },
      { status: 500 },
    )
  }
}
