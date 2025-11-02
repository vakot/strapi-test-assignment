import * as React from 'react'

import type { User } from '@services/user/types'

const DEFAULT_USER: Omit<User, 'details'> = { email: '' }

export const CtxUser = React.createContext<User>(DEFAULT_USER as User)

export { UserProvider } from './UserProvider'
