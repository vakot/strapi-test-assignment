import {
  ButtonProcessableContent,
  type ButtonProcessableContentProps,
} from '@components/ui/button-processable'

export interface ButtonNavigationContentProps
  extends Omit<ButtonProcessableContentProps, 'successText' | 'loadingText'> {}

/**
 * @name ButtonNavigationContent
 * @description Displays button content and navigation state. Wraps over root
 * `ButtonProcessableContent`
 * @see `ButtonNavigation`
 * @see `ButtonProcessableContent`
 */
const ButtonNavigationContent: React.FC<ButtonNavigationContentProps> = (
  props,
) => {
  const { children } = props

  return (
    <ButtonProcessableContent loadingText={children}>
      {children}
    </ButtonProcessableContent>
  )
}

export { ButtonNavigationContent }
