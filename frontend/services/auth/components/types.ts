import { Country } from '@/services/country/types'
import { User, UserDetails } from '@/services/user/types'

export type FormLoginData = Pick<User, 'email'> & {
  password: string
}

export type FormSignupData = Pick<User, 'email' | 'username'> &
  Omit<UserDetails, 'country'> & {
    password: string
    country: Country['id']
  }
