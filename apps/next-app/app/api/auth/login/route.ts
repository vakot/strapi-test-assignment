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

    // Forward the response
    return NextResponse.json(data, { status: res.status })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Unknown error' },
      { status: 500 },
    )
  }
}
