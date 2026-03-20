'use client'

import { Service } from '@/lib/types'
import { escapeHtml } from '@/lib/utils'

interface ServiceCardProps {
  service: Service
  onDescChange: (value: string) => void
  onValChange: (value: string) => void
  onNoteChange: (value: string) => void
  onRemove: () => void
}

export function ServiceCard({
  service,
  onDescChange,
  onValChange,
  onNoteChange,
  onRemove,
}: ServiceCardProps) {
  return (
    <div className="bg-dark-secondary border border-dark-border rounded p-4 mb-3 space-y-3">
      <input
        type="text"
        value={service.desc}
        onChange={(e) => onDescChange(e.target.value)}
        placeholder="Descrição do serviço"
        className="w-full"
      />
      <div className="grid grid-cols-2 gap-3">
        <input
          type="text"
          value={service.val}
          onChange={(e) => onValChange(e.target.value)}
          placeholder="Valor mensal"
          className="w-full"
        />
        <button
          type="button"
          onClick={onRemove}
          className="bg-red-main/20 hover:bg-red-main/30 text-red-light text-sm font-semibold rounded transition"
        >
          ✕ Remover
        </button>
      </div>
      <textarea
        value={service.note}
        onChange={(e) => onNoteChange(e.target.value)}
        placeholder="Notas/detalhes adicionais"
        rows={2}
        className="w-full text-sm"
      />
    </div>
  )
}
