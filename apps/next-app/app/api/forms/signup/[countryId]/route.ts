import { getErrorMessage, getErrorStatus } from '@lib/api'
import { strapi } from '@lib/strapi'
import { NextResponse } from 'next/server'

interface Params {
  params: Promise<{ countryId: string }>
}

export async function GET(_: Request, { params }: Params) {
  try {
    const { countryId } = await params

    if (!countryId) {
      return NextResponse.json(
        { error: 'Missing country details' },
        { status: 400 },
      )
    }

    const { data: form } = await strapi.get(`/form-config-auth/${countryId}`)

    return NextResponse.json(form)
  } catch (error: any) {
    if (error.status === 404) {
      return NextResponse.json(
        { error: 'Form configuration not found' },
        { status: 404 },
      )
    }

    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status: getErrorStatus(error) },
    )
  }
}
