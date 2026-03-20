'use client'

import { useState, useEffect } from 'react'
import { ProposalData, Service } from '@/lib/types'
import { saveProposalData, loadProposalData, clearProposalData } from '@/lib/storage'
import { generateId } from '@/lib/utils'
import { Sidebar } from '@/components/Sidebar'
import { Preview } from '@/components/Preview'

const DEFAULT_SERVICES: Service[] = [
  { id: generateId(), desc: 'Gestão de Tráfego Pago (Meta Ads / Google Ads)', val: '', note: '' },
  { id: generateId(), desc: 'Estruturação Comercial e Diagnóstico', val: '', note: '' },
  { id: generateId(), desc: 'Gestão de CRM e Pipeline de Vendas', val: '', note: '' },
]

const DEFAULT_DATA: ProposalData = {
  num: '',
  data: new Date().toISOString().split('T')[0],
  val: '15',
  resp: '',
  rz: '',
  cnpj: '',
  dec: '',
  cargo: '',
  wa: '',
  email: '',
  cidade: '',
  seg: '',
  site: '',
  dor: '',
  fat: '',
  tkt: '',
  traf: '',
  d1: '',
  d2: '',
  d3: '',
  d4: '',
  services: DEFAULT_SERVICES,
  prazo: '',
  pag: '',
  inicio: '',
  onb: '',
  obs: '',
  nfone: '',
  nemail: '',
  nsite: '',
}

export default function Page() {
  const [data, setData] = useState<ProposalData>(DEFAULT_DATA)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = loadProposalData()
    if (saved && Object.keys(saved).length > 0) {
      setData({
        ...DEFAULT_DATA,
        ...saved,
        services: (saved.services && saved.services.length > 0) ? saved.services : DEFAULT_SERVICES,
      })
    }
    setMounted(true)
  }, [])

  // Save to localStorage whenever data changes
  useEffect(() => {
    if (mounted) {
      saveProposalData(data)
    }
  }, [data, mounted])

  const handleDataChange = (newData: ProposalData) => {
    setData(newData)
    setIsMobileOpen(false)
  }

  const handleClear = () => {
    if (typeof window !== 'undefined' && confirm('Deseja limpar todos os dados?')) {
      clearProposalData()
      setData(DEFAULT_DATA)
    }
  }

  const handleExportPDF = () => {
    if (typeof window !== 'undefined') {
      window.print()
    }
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-screen bg-dark-primary text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">NGP</h1>
          <p className="text-gray-400">Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-dark-primary">
      {/* Sidebar */}
      <Sidebar
        data={data}
        onDataChange={handleDataChange}
        onClear={handleClear}
        onExportPDF={handleExportPDF}
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
      />

      {/* Preview */}
      <Preview data={data} />

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed bottom-4 right-4 md:hidden w-14 h-14 bg-gradient-to-r from-red-main to-red-dark hover:from-red-light hover:to-red-main text-white rounded-full font-bold text-xl shadow-lg transition z-50 flex items-center justify-center print-hide"
        title="Abrir formulário"
      >
        ✏️
      </button>
    </div>
  )
}
