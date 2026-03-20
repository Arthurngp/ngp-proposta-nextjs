'use client'

import { ReactNode, useState } from 'react'

interface FormSectionProps {
  number: number
  title: string
  children: ReactNode
  open?: boolean
}

export function FormSection({
  number,
  title,
  children,
  open = false,
}: FormSectionProps) {
  const [isOpen, setIsOpen] = useState(open)

  return (
    <div className="border border-dark-border rounded mb-2 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 p-4 bg-dark-secondary hover:bg-dark-tertiary transition font-semibold text-left"
      >
        <span className="flex items-center justify-center w-8 h-8 bg-red-main rounded-full text-sm">
          {number}
        </span>
        <span className="flex-1">{title}</span>
        <span className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {isOpen && (
        <div className="p-4 bg-dark-primary border-t border-dark-border space-y-3">
          {children}
        </div>
      )}
    </div>
  )
}
