'use client'

import type { User } from '@services/user/types'

import { CtxUser } from './'

export interface UserProviderProps {
  children: React.ReactNode
  value: User
}

const UserProvider: React.FC<UserProviderProps> = (props) => {
  const { children, value } = props

  return <CtxUser.Provider value={value}>{children}</CtxUser.Provider>
}

export { UserProvider }
