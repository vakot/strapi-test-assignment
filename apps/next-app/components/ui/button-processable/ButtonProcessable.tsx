import { Button } from '@/components/ui/button'
import { FieldError } from '@/components/ui/field'
import { Spinner } from '@/components/ui/spinner'
import { Check } from 'lucide-react'

type ButtonProps = React.ComponentPropsWithoutRef<typeof Button>

interface ContentProps {
  loading?: boolean
  success?: boolean
  loadingText?: React.ReactNode
  successText?: React.ReactNode
  children?: React.ReactNode
}

const Content: React.FC<ContentProps> = (props) => {
  const {
    loading,
    success,
    loadingText = 'Loading...',
    successText = 'Success',
    children,
  } = props

  // Short-circuits
  if (loading) {
    return (
      <>
        <Spinner />
        {loadingText}
      </>
    )
  }

  if (success) {
    return (
      <>
        <Check />
        {successText}
      </>
    )
  }

  return children
}

export interface ButtonProcessableProps
  extends Omit<ContentProps, 'children'>,
    ButtonProps {
  error?: string | null
}

/**
 * @name ButtonProcessable
 * @description Simple button wrapper that displays async operations state
 */
const ButtonProcessable: React.FC<ButtonProcessableProps> = (props) => {
  const {
    loading,
    success,
    loadingText,
    successText,
    error,
    children,
    ...buttonProps
  } = props

  return (
    <>
      <Button {...buttonProps}>
        <Content
          loading={loading}
          success={success}
          loadingText={loadingText}
          successText={successText}
        >
          {children}
        </Content>
      </Button>
      {!!error && <FieldError errors={[{ message: error }]} />}
    </>
  )
}

export { ButtonProcessable }
