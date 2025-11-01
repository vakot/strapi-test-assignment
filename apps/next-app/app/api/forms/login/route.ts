import { getErrorMessage, getErrorStatus } from '@lib/api'
import { strapi } from '@lib/strapi'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { data: form } = await strapi.get('/form-config-auth-login')

    return NextResponse.json(form)
  } catch (error: any) {
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: getErrorStatus(error) },
    )
  }
}
