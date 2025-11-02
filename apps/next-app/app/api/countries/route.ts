import { NextResponse } from 'next/server'

import { getErrorMessage, getErrorStatus } from '@lib/api'
import { strapi } from '@lib/strapi'

export async function GET() {
  try {
    const { data: countries } = await strapi.get('/countries?sort=name:asc')

    return NextResponse.json(countries)
  } catch (error: any) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: getErrorStatus(error) },
    )
  }
}
