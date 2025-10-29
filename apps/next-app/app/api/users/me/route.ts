import { NextResponse } from 'next/server'

export async function GET(req: Request) {
  // Get the token from the incoming request headers
  const authHeader = req.headers.get('authorization')

  if (!authHeader) {
    return NextResponse.json({ error: 'Missing token' }, { status: 401 })
  }

  // Forward request to Strapi
  const res = await fetch(`${process.env.STRAPI_API_URL}/users/me`, {
    headers: { Authorization: authHeader },
    cache: 'no-store',
  })

  if (!res.ok) {
    const errorText = await res.text()
    return NextResponse.json({ error: errorText }, { status: res.status })
  }

  const data = await res.json()
  return NextResponse.json(data)
}
