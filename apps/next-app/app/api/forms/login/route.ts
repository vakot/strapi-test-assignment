import { NextResponse } from 'next/server'

export async function GET() {
  const res = await fetch(
    `${process.env.STRAPI_API_URL}/form-config-auth-login`,
    {
      headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
      cache: 'no-store',
    },
  )

  const data = await res.json()
  return NextResponse.json(data)
}
