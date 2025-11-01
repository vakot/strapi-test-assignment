import { cn } from '@lib/utils'
import { HTMLAttributes } from 'react'

export interface LayoutAuthProps extends HTMLAttributes<HTMLDivElement> {}

const LayoutAuth: React.FC<LayoutAuthProps> = (props) => {
  const { className, ...rest } = props

  // Styles
  const classes = cn('w-full max-w-sm mx-auto px-4 mt-10 md:mt-20', className)

  return <div className={classes} {...rest} />
}

export { LayoutAuth }
