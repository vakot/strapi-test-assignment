import {
  ButtonProcessableContent,
  type ButtonProcessableContentProps,
} from '@components/ui/button-processable'

export interface ButtonLogoutContentProps
  extends ButtonProcessableContentProps {}

/**
 * @name ButtonLogoutContent
 * @description Displays button content and Logout state. Wraps over root
 * `ButtonProcessableContent`
 * @see `ButtonLogout`
 * @see `ButtonProcessableContent`
 */
const ButtonLogoutContent: React.FC<ButtonLogoutContentProps> = (props) => {
  const {
    loadingText = "We'll miss you",
    successText = 'Goodbye!',
    ...rest
  } = props

  return (
    <ButtonProcessableContent
      loadingText={loadingText}
      successText={successText}
      {...rest}
    />
  )
}

export { ButtonLogoutContent }
