import { NextResponse } from 'next/server'

interface Params {
  params: Promise<{ countryId: string }>
}

export async function GET(_: Request, { params }: Params) {
  const { countryId } = await params

  if (!countryId) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  }

  const res = await fetch(
    `${process.env.STRAPI_API_URL}/form-config-auth/${countryId}`,
    {
      headers: { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` },
      cache: 'no-store',
    },
  )

  if (!res.ok) {
    const errorText = await res.text()
    return NextResponse.json({ error: errorText }, { status: res.status })
  }

  const data = await res.json()
  return NextResponse.json(data)
}
