import { AxiosError } from 'axios'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { getErrorMessage, getErrorStatus } from '@lib/api'
import { strapi } from '@lib/strapi'

export async function GET(req: NextRequest) {
  try {
    const Authorization: string | null = req.headers.get('authorization')

    if (!Authorization) {
      return NextResponse.json(
        { error: 'Unauthorized: missing token' },
        { status: 401 },
      )
    }

    const { data: user } = await strapi.get(
      `${process.env.STRAPI_API_URL}/users/me`,
      { headers: { Authorization } },
    )

    return NextResponse.json(user)
  } catch (error: any) {
    if (error.code === AxiosError.ERR_BAD_REQUEST) {
      NextResponse.json(
        { error: 'Unauthorized: invalid token' },
        { status: 401 },
      )
    }

    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: getErrorStatus(error) },
    )
  }
}
