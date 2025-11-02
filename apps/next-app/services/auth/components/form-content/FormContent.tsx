import { AlertCircleIcon } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@components/ui/alert'
import { Spinner } from '@components/ui/spinner'

interface StateLoadingProps {
  className?: string
}

const StateLoading: React.FC<StateLoadingProps> = (props) => {
  const { className } = props

  return (
    <div className={className}>
      <Spinner className="size-6" />
    </div>
  )
}

interface StateLoadingOverlayProps {}

const StateLoadingOverlay: React.FC<StateLoadingOverlayProps> = () => {
  return (
    <>
      <div className="absolute -inset-1 bg-background opacity-50" />
      <StateLoading className="absolute left-1/2 top-1/2 -translate-1/2" />
    </>
  )
}

interface StateErrorProps {
  errors: string[]
}

const StateError: React.FC<StateErrorProps> = (props) => {
  const { errors } = props

  return (
    <Alert variant="destructive" className="col-span-full">
      <AlertCircleIcon />
      <AlertTitle>Unable to load form configuration.</AlertTitle>
      <AlertDescription>
        <ul className="list-inside list-disc">
          {errors.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  )
}

interface FormContentProps {
  children?: React.ReactNode
  loading: boolean
  errors?: (string | null)[]
  className?: string
}

/**
 * @name FormContent
 * @description Auth form wrapper controlling error display and loading state
 */
const FormContent: React.FC<FormContentProps> = (props) => {
  const { className, loading, errors, children } = props

  // Setup
  const errorsFiltered = errors?.filter(Boolean) ?? []
  const hasErrors = !!errorsFiltered.length

  return (
    <div className="relative min-h-24">
      {loading && !children && <StateLoading className="mx-auto my-12" />}
      {hasErrors && <StateError errors={errorsFiltered as string[]} />}
      <div className={className}>{!hasErrors && children}</div>
      {loading && children && <StateLoadingOverlay />}
    </div>
  )
}

export { FormContent }
