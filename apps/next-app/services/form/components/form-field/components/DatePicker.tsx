import * as React from 'react'

import { ChevronDownIcon } from 'lucide-react'

import { Button } from '@components/ui/button'
import { Calendar } from '@components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@components/ui/popover'
import { cn } from '@lib/utils'
import type { FormField, FormFieldControl } from '@services/form/types'

export interface DatePickerProps extends FormFieldControl {
  field: FormField
}

/**
 * @name DatePicker
 * @description Form controlled `DatePicker` component wrapper
 */
const DatePicker: React.FC<DatePickerProps> = (props) => {
  const { field, name, value, onChange } = props
  const { placeholder } = field

  // Hooks
  const [open, setOpen] = React.useState(false)

  // Styles
  const classes = cn('justify-between w-full text-sm font-normal shadow-sm', {
    'text-muted-foreground': !value,
  })

  // Markup
  const label = placeholder ?? 'Select date...'
  const copy = value ? value.toLocaleDateString() : label

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          type="button"
          id={name}
          role="combobox"
          className={classes}
        >
          {copy}
          <ChevronDownIcon className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="overflow-hidden p-0" align="start">
        <Calendar
          className="w-full"
          mode="single"
          selected={value}
          captionLayout="dropdown"
          onSelect={(date) => {
            onChange(date)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker }
