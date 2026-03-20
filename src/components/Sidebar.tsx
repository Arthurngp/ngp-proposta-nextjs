'use client'

import { ProposalData, Service } from '@/lib/types'
import { generateId, calculateTotal, formatCurrency } from '@/lib/utils'
import { FormSection } from './FormSection'
import { FormField } from './FormField'
import { ServiceCard } from './ServiceCard'
import { ProgressBar } from './ProgressBar'

interface SidebarProps {
  data: ProposalData
  onDataChange: (data: ProposalData) => void
  onClear: () => void
  onExportPDF: () => void
  isMobileOpen?: boolean
  onMobileClose?: () => void
}

export function Sidebar({
  data,
  onDataChange,
  onClear,
  onExportPDF,
  isMobileOpen = false,
  onMobileClose,
}: SidebarProps) {
  const updateField = (field: keyof ProposalData, value: any) => {
    onDataChange({ ...data, [field]: value })
  }

  const addService = () => {
    const newService: Service = {
      id: generateId(),
      desc: '',
      val: '',
      note: '',
    }
    const services = Array.isArray(data.services) ? data.services : []
    updateField('services', [...services, newService])
  }

  const updateService = (
    id: string,
    field: keyof Service,
    value: string
  ) => {
    const services = Array.isArray(data.services)
      ? data.services.map((svc) =>
          svc.id === id ? { ...svc, [field]: value } : svc
        )
      : []
    updateField('services', services)
  }

  const removeService = (id: string) => {
    const services = Array.isArray(data.services)
      ? data.services.filter((svc) => svc.id !== id)
      : []
    updateField('services', services)
  }

  const total = formatCurrency(
    calculateTotal(Array.isArray(data.services) ? data.services : []).toString()
  )

  const services = Array.isArray(data.services) ? data.services : []

  return (
    <div
      className={`fixed md:relative w-full md:w-[420px] h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex flex-col border-r border-dark-border transition-all duration-300 z-40 ${
        isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}
    >
      {/* Header */}
      <div className="p-5 border-b border-dark-border">
        <h1 className="text-xl font-bold mb-1">
          NGP <span className="text-xs font-normal text-gray-400">Nova Gestão de Performance</span>
        </h1>
        <p className="text-xs text-gray-400">Preencha à esquerda — preview atualiza em tempo real</p>
      </div>

      {/* Progress Bar */}
      <div className="px-5 pt-4">
        <ProgressBar data={data} />
      </div>

      {/* Form Sections */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {/* 1. Identification */}
        <FormSection number={1} title="Identificação" open>
          <FormField label="Nº Proposta">
            <input
              type="text"
              value={data.num}
              onChange={(e) => updateField('num', e.target.value)}
              placeholder="001"
            />
          </FormField>
          <FormField label="Emissão">
            <input
              type="date"
              value={data.data}
              onChange={(e) => updateField('data', e.target.value)}
            />
          </FormField>
          <FormField label="Validade (dias)">
            <input
              type="text"
              value={data.val}
              onChange={(e) => updateField('val', e.target.value)}
              placeholder="15"
            />
          </FormField>
          <FormField label="Responsável NGP">
            <input
              type="text"
              value={data.resp}
              onChange={(e) => updateField('resp', e.target.value)}
              placeholder="Arthur Bezerra"
            />
          </FormField>
        </FormSection>

        {/* 2. Client Data */}
        <FormSection number={2} title="Dados do Cliente" open>
          <FormField label="Razão Social / Nome">
            <input
              type="text"
              value={data.rz}
              onChange={(e) => updateField('rz', e.target.value)}
              placeholder="Empresa XYZ Ltda."
            />
          </FormField>
          <FormField label="CNPJ / CPF">
            <input
              type="text"
              value={data.cnpj}
              onChange={(e) => updateField('cnpj', e.target.value)}
              placeholder="00.000.000/0001-00"
            />
          </FormField>
          <FormField label="Decisor / Responsável">
            <input
              type="text"
              value={data.dec}
              onChange={(e) => updateField('dec', e.target.value)}
              placeholder="João da Silva"
            />
          </FormField>
          <FormField label="Cargo">
            <input
              type="text"
              value={data.cargo}
              onChange={(e) => updateField('cargo', e.target.value)}
              placeholder="Diretor / CEO"
            />
          </FormField>
          <FormField label="WhatsApp">
            <input
              type="text"
              value={data.wa}
              onChange={(e) => updateField('wa', e.target.value)}
              placeholder="(81) 9 9999-0000"
            />
          </FormField>
          <FormField label="E-mail">
            <input
              type="email"
              value={data.email}
              onChange={(e) => updateField('email', e.target.value)}
              placeholder="contato@empresa.com.br"
            />
          </FormField>
          <FormField label="Cidade / Estado">
            <input
              type="text"
              value={data.cidade}
              onChange={(e) => updateField('cidade', e.target.value)}
              placeholder="Caruaru — PE"
            />
          </FormField>
          <FormField label="Segmento">
            <input
              type="text"
              value={data.seg}
              onChange={(e) => updateField('seg', e.target.value)}
              placeholder="Varejo, Saúde..."
            />
          </FormField>
          <FormField label="Site / Instagram">
            <input
              type="text"
              value={data.site}
              onChange={(e) => updateField('site', e.target.value)}
              placeholder="@empresa"
            />
          </FormField>
        </FormSection>

        {/* 3. Business Context */}
        <FormSection number={3} title="Contexto do Negócio">
          <FormField label="Principal Dor / Desafio Atual">
            <textarea
              value={data.dor}
              onChange={(e) => updateField('dor', e.target.value)}
              placeholder="Descreva o problema central que o cliente enfrenta..."
              rows={3}
            />
          </FormField>
          <FormField label="Faturamento Médio Mensal">
            <input
              type="text"
              value={data.fat}
              onChange={(e) => updateField('fat', e.target.value)}
              placeholder="R$ 80.000"
            />
          </FormField>
          <FormField label="Ticket Médio">
            <input
              type="text"
              value={data.tkt}
              onChange={(e) => updateField('tkt', e.target.value)}
              placeholder="R$ 350"
            />
          </FormField>
          <FormField label="Investe em Tráfego?">
            <select
              value={data.traf}
              onChange={(e) => updateField('traf', e.target.value)}
            >
              <option value="">—</option>
              <option>Sim</option>
              <option>Não</option>
              <option>Pouco / Esporádico</option>
            </select>
          </FormField>
          <FormField label="Como o lead é recebido?">
            <input
              type="text"
              value={data.d1}
              onChange={(e) => updateField('d1', e.target.value)}
              placeholder="Ex: Via WhatsApp, sem protocolo"
            />
          </FormField>
          <FormField label="Tempo de primeiro contato">
            <input
              type="text"
              value={data.d2}
              onChange={(e) => updateField('d2', e.target.value)}
              placeholder="Ex: 30 min a 2 horas"
            />
          </FormField>
          <FormField label="Taxa de conversão estimada">
            <input
              type="text"
              value={data.d3}
              onChange={(e) => updateField('d3', e.target.value)}
              placeholder="Ex: ~10% de leads"
            />
          </FormField>
          <FormField label="Usa CRM?">
            <input
              type="text"
              value={data.d4}
              onChange={(e) => updateField('d4', e.target.value)}
              placeholder="Ex: Não, controla no WhatsApp"
            />
          </FormField>
        </FormSection>

        {/* 4. Services */}
        <FormSection number={4} title="Escopo de Serviços" open>
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onDescChange={(val) => updateService(service.id, 'desc', val)}
              onValChange={(val) => updateService(service.id, 'val', val)}
              onNoteChange={(val) => updateService(service.id, 'note', val)}
              onRemove={() => removeService(service.id)}
            />
          ))}
          <button
            type="button"
            onClick={addService}
            className="w-full py-2 border border-dark-border rounded hover:bg-dark-secondary transition text-sm font-semibold"
          >
            ＋ Adicionar serviço
          </button>
        </FormSection>

        {/* 5. Commercial Terms */}
        <FormSection number={5} title="Condições Comerciais">
          <FormField label="Prazo de Contrato">
            <select
              value={data.prazo}
              onChange={(e) => updateField('prazo', e.target.value)}
            >
              <option value="">—</option>
              <option>Mensal (sem fidelidade)</option>
              <option>3 meses</option>
              <option>6 meses</option>
              <option>12 meses</option>
            </select>
          </FormField>
          <FormField label="Forma de Pagamento">
            <select
              value={data.pag}
              onChange={(e) => updateField('pag', e.target.value)}
            >
              <option value="">—</option>
              <option>PIX / Transferência</option>
              <option>Boleto bancário</option>
              <option>Cartão de crédito</option>
              <option>Parcelado (negociar)</option>
            </select>
          </FormField>
          <FormField label="Início Previsto">
            <input
              type="date"
              value={data.inicio}
              onChange={(e) => updateField('inicio', e.target.value)}
            />
          </FormField>
          <FormField label="Onboarding (dias úteis)">
            <input
              type="text"
              value={data.onb}
              onChange={(e) => updateField('onb', e.target.value)}
              placeholder="5"
            />
          </FormField>
        </FormSection>

        {/* 6. Observations */}
        <FormSection number={6} title="Observações">
          <FormField label="Condições especiais / personalização">
            <textarea
              value={data.obs}
              onChange={(e) => updateField('obs', e.target.value)}
              placeholder="Descontos, condições especiais, contexto da negociação..."
              rows={5}
            />
          </FormField>
        </FormSection>

        {/* 7. NGP Contact */}
        <FormSection number={7} title="Contato NGP">
          <FormField label="WhatsApp">
            <input
              type="text"
              value={data.nfone}
              onChange={(e) => updateField('nfone', e.target.value)}
              placeholder="(81) 9 9999-0000"
            />
          </FormField>
          <FormField label="E-mail">
            <input
              type="email"
              value={data.nemail}
              onChange={(e) => updateField('nemail', e.target.value)}
              placeholder="contato@grupongp.com.br"
            />
          </FormField>
          <FormField label="Site">
            <input
              type="text"
              value={data.nsite}
              onChange={(e) => updateField('nsite', e.target.value)}
              placeholder="grupongp.com.br"
            />
          </FormField>
        </FormSection>
      </div>

      {/* Total Badge */}
      <div className="p-4 border-t border-dark-border bg-dark-secondary">
        <div className="text-xs text-gray-400 mb-1">Total Mensal</div>
        <div className="text-2xl font-bold text-red-light">{total}</div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-dark-border flex gap-2">
        <button
          onClick={onClear}
          className="flex-1 py-2 bg-dark-secondary hover:bg-dark-tertiary rounded font-semibold text-sm transition print-hide"
        >
          🗑 Limpar
        </button>
        <button
          onClick={onExportPDF}
          className="flex-1 py-2 bg-gradient-to-r from-red-main to-red-dark hover:from-red-light hover:to-red-main text-white rounded font-semibold text-sm transition print-hide"
        >
          🖨 Imprimir / PDF
        </button>
      </div>

      {/* Mobile Close Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-30"
          onClick={onMobileClose}
        />
      )}
    </div>
  )
}
