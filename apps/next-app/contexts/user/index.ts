import type { User } from '@services/user/types'
import { createContext } from 'react'

const DEFAULT_USER: Omit<User, 'details'> = { email: '' }

export const CtxUser = createContext<User>(DEFAULT_USER as User)

export { UserProvider } from './UserProvider'
