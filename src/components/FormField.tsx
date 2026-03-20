'use client'

import { ReactNode } from 'react'

interface FormFieldProps {
  label: string
  children: ReactNode
}

export function FormField({ label, children }: FormFieldProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-semibold text-gray-100 block">{label}</label>
      {children}
    </div>
  )
}
