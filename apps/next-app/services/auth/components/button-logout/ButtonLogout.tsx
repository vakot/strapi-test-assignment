import {
  ButtonProcessable,
  ButtonProcessableContent,
  ButtonProcessableError,
  ButtonProcessableTrigger,
} from '@components/ui/button-processable'
import { cn } from '@lib/utils'
import { useAuth } from '@services/auth/hooks/useAuth'

export interface ButtonLogoutProps {
  className?: string
}

/**
 * @name ButtonLogout
 * @description Simple button-processable wrapper for user logout action
 */
const ButtonLogout: React.FC<ButtonLogoutProps> = (props) => {
  const { className } = props

  // Mutation ~ Logout
  const { logout, loading, error } = useAuth()

  // Styles
  const classes = cn('w-full flex-col', className)

  return (
    <ButtonProcessable
      className={classes}
      loading={loading}
      loadingText="We will miss you :("
      error={error}
    >
      <ButtonProcessableTrigger
        type="button"
        variant="secondary"
        className="w-full"
        onClick={logout}
      >
        <ButtonProcessableContent>Logout</ButtonProcessableContent>
      </ButtonProcessableTrigger>
      <ButtonProcessableError className="text-center mt-2" />
    </ButtonProcessable>
  )
}

export { ButtonLogout }
