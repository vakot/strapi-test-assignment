import { cn } from '@lib/utils'

import * as React from 'react'

export interface LayoutAuthProps extends React.HTMLAttributes<HTMLDivElement> {}

const LayoutAuth: React.FC<LayoutAuthProps> = (props) => {
  const { className, ...rest } = props

  // Styles
  const classes = cn('w-full max-w-sm mx-auto px-4 mt-10 md:mt-20', className)

  return <div className={classes} {...rest} />
}

export { LayoutAuth }
