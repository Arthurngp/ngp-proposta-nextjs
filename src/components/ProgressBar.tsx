'use client'

import { useMemo } from 'react'
import { ProposalData } from '@/lib/types'

interface ProgressBarProps {
  data: ProposalData
}

export function ProgressBar({ data }: ProgressBarProps) {
  const progress = useMemo(() => {
    const fields = [
      data.num,
      data.data,
      data.val,
      data.resp,
      data.rz,
      data.cnpj,
      data.dec,
      data.cargo,
      data.wa,
      data.email,
      data.cidade,
      data.seg,
      data.site,
      data.dor,
      data.fat,
      data.tkt,
      data.traf,
      data.d1,
      data.d2,
      data.d3,
      data.d4,
      data.prazo,
      data.pag,
      data.inicio,
      data.onb,
      data.obs,
      data.nfone,
      data.nemail,
      data.nsite,
    ]

    const serviceFields = data.services.reduce(
      (count, svc) => count + (svc.desc ? 1 : 0) + (svc.val ? 1 : 0),
      0
    )

    const filled = fields.filter((f) => f?.toString().trim()).length + serviceFields
    const total = fields.length + (data.services.length * 2)
    const percentage = total > 0 ? Math.round((filled / total) * 100) : 0

    return { filled, total, percentage }
  }, [data])

  return (
    <div className="w-full bg-dark-secondary rounded h-2 overflow-hidden mb-6">
      <div
        className="h-full bg-gradient-to-r from-red-main to-red-dark transition-all duration-300"
        style={{ width: `${progress.percentage}%` }}
      />
    </div>
  )
}
