import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Spinner } from '@/components/ui/spinner'
import { AlertCircleIcon } from 'lucide-react'

interface StateLoadingProps {}

const StateLoading: React.FC<StateLoadingProps> = () => {
  return (
    <div className="mx-auto my-10">
      <Spinner />
    </div>
  )
}

interface StateErrorProps {
  errors: string[]
}

const StateError: React.FC<StateErrorProps> = (props) => {
  const { errors } = props

  return (
    <Alert variant="destructive">
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
}

/**
 * @name FormContent
 * @description Auth form wrpper controlling error display and loading state
 */
const FormContent: React.FC<FormContentProps> = (props) => {
  const { children, loading, errors } = props

  // Setup
  const errorsFiltered = errors?.filter(Boolean) ?? []
  const hasErrors = !!errorsFiltered.length

  // Short-circuits
  if (loading) {
    return <StateLoading />
  }

  if (hasErrors) {
    return <StateError errors={errorsFiltered as string[]} />
  }

  return children
}

export { FormContent }
