'use client'
import { createContext } from 'react'
import type { User } from '../services/user/types'

const DEFAULT_USER: Omit<User, 'details'> = { email: '' }

export const CtxUser = createContext<User>(DEFAULT_USER as User)
