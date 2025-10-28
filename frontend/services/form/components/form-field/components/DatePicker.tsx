import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import type { FormFieldControl } from '@/services/form/types'
import classNames from 'classnames'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'

export interface DatePickerProps extends FormFieldControl {}

/**
 * @name DatePicker
 * @description Form controlled `DatePicker` component wrapper
 */
const DatePicker: React.FC<DatePickerProps> = (props) => {
  const { name, value, onChange } = props

  // Hooks
  const [open, setOpen] = useState(false)

  // Styles
  const classes = classNames(
    'justify-between w-full text-sm font-normal shadow-sm',
    { 'text-muted-foreground': !value },
  )

  // Markup
  const copy = value ? value.toLocaleDateString() : 'Select date...'

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
