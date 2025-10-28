import dynamic from 'next/dynamic'

const Select = dynamic(async () => {
  return import('./Select').then((mod) => mod.Select)
})

const DatePicker = dynamic(async () => {
  return import('./DatePicker').then((mod) => mod.DatePicker)
})

const Input = dynamic(async () => {
  return import('./Input').then((mod) => mod.Input)
})

export { DatePicker, Input, Select }
