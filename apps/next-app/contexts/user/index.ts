import type { User } from '@services/user/types'
import * as React from 'react'

const DEFAULT_USER: Omit<User, 'details'> = { email: '' }

export const CtxUser = React.createContext<User>(DEFAULT_USER as User)

export { UserProvider } from './UserProvider'
