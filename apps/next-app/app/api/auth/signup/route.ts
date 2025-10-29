import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    // Parse incoming JSON body
    const body = await req.json()

    // Send POST request to Strapi register endpoint
    const res = await fetch(
      `${process.env.STRAPI_API_URL}/auth/local/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify(body),
        cache: 'no-store',
      },
    )

    const data = await res.json()

    // Handle Strapi errors
    if (!res.ok) {
      const errorMsg =
        data.error?.message || data.message || 'Registration failed'
      return NextResponse.json({ error: errorMsg }, { status: res.status })
    }

    // Check for JWT and user in response
    const { jwt, user } = data
    if (!jwt || !user) {
      return NextResponse.json(
        { error: 'Invalid response from authentication server' },
        { status: 500 },
      )
    }

    // Set JWT cookie
    const response = NextResponse.json(user, { status: 200 })
    response.cookies.set('jwt', jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'lax',
    })

    return response
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Unknown server error' },
      { status: 500 },
    )
  }
}
