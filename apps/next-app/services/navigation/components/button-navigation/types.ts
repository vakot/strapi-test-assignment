import { useNavigation } from '@services/navigation/hooks/useNavigation'

export type ButtonNavigationState = {
  to: string
} & ReturnType<typeof useNavigation>
