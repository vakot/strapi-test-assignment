import type { Country } from '@services/country/types'
import type { User, UserDetails } from '@services/user/types'

export type FormLoginData = Pick<User, 'email'> & {
  password: string
}

export type FormSignupData = Pick<User, 'email' | 'username'> &
  Omit<UserDetails, 'country'> & {
    password: string
    country: Country['id']
  }
