import { getErrorMessage, getErrorStatus } from '@lib/api'
import { withCookieJWT } from '@lib/auth'
import { strapi } from '@lib/strapi'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const { data } = await strapi.post('/auth/local', body)

    if (!data.jwt || !data.user) {
      return NextResponse.json(
        { error: 'Invalid response from authentication server' },
        { status: 500 },
      )
    }

    const response = NextResponse.json(data.user, { status: 200 })
    return withCookieJWT(response, data.jwt)
  } catch (error: any) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: getErrorStatus(error) },
    )
  }
}
