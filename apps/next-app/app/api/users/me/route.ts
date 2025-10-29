import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const token = req.headers.get('authorization')

  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 401 })
  }

  const res = await fetch(`${process.env.STRAPI_API_URL}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  })

  if (!res.ok) {
    const errorText = await res.text()
    return NextResponse.json({ error: errorText }, { status: res.status })
  }

  const data = await res.json()
  return NextResponse.json(data)
}
