import { Country } from '@/services/country/types'

export type UserDetails = {
  country: Country
  first_name?: string
  last_name?: string
  zip?: string
  birthdate?: Date
  phone?: string
}

export type User = {
  id?: string
  email: string
  username?: string
  details: UserDetails
}
