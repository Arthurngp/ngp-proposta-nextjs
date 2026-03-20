'use client'

import { useMemo } from 'react'
import { ProposalData } from '@/lib/types'
import {
  formatDate,
  escapeHtml,
  formatCurrency,
  displayValue,
  calculateTotal,
} from '@/lib/utils'

interface PreviewProps {
  data: ProposalData
}

export function Preview({ data }: PreviewProps) {
  const pages = useMemo(() => {
    const services = Array.isArray(data.services) ? data.services : []
    const total = calculateTotal(services)

    return {
      page1: renderPage1(data),
      page2: renderPage2(data, services),
      page3: renderPage3(data, services, total),
    }
  }, [data])

  return (
    <div className="flex-1 flex flex-col bg-white text-black overflow-hidden">
      <div className="bg-dark-secondary text-white p-4 border-b border-dark-border print-hide">
        <h2 className="text-lg font-bold">📄 Preview — 3 páginas</h2>
        <p className="text-xs text-gray-400">Ctrl+P para salvar como PDF</p>
      </div>

      <div className="flex-1 overflow-y-auto" id="pages">
        <div
          className="page"
          dangerouslySetInnerHTML={{ __html: pages.page1 }}
        />
        <div
          className="page"
          dangerouslySetInnerHTML={{ __html: pages.page2 }}
        />
        <div
          className="page"
          dangerouslySetInnerHTML={{ __html: pages.page3 }}
        />
      </div>
    </div>
  )
}

// Page rendering functions
function renderPage1(data: ProposalData): string {
  const headerHtml = `
    <div style="text-align: center; margin-bottom: 40px;">
      <h1 style="font-size: 48px; font-weight: 900; margin: 0; color: #C41230;">
        NGP
      </h1>
      <p style="font-size: 12px; color: #666; margin: 0;">
        Nova Gestão de Performance
      </p>
    </div>

    <div style="background: linear-gradient(135deg, #C41230 0%, #9B0F26 100%); color: white; padding: 20px; border-radius: 6px; margin-bottom: 30px;">
      <h2 style="font-size: 20px; font-weight: 700; margin-top: 0; margin-bottom: 15px;">
        PROPOSTA COMERCIAL
      </h2>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; font-size: 13px;">
        <div>
          <strong>Nº Proposta:</strong> ${escapeHtml(data.num || '—')}
        </div>
        <div>
          <strong>Data:</strong> ${formatDate(data.data) || '—'}
        </div>
        <div>
          <strong>Validade:</strong> ${escapeHtml(data.val || '—')} dias
        </div>
        <div>
          <strong>Responsável:</strong> ${escapeHtml(data.resp || '—')}
        </div>
      </div>
    </div>

    <div style="margin-bottom: 30px;">
      <h3 style="font-size: 14px; font-weight: 700; border-bottom: 2px solid #C41230; padding-bottom: 10px; margin-bottom: 15px;">
        CLIENTE
      </h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; font-size: 13px;">
        <div>
          <strong>Empresa:</strong> ${escapeHtml(data.rz || '—')}
        </div>
        <div>
          <strong>CNPJ/CPF:</strong> ${escapeHtml(data.cnpj || '—')}
        </div>
        <div>
          <strong>Decisor:</strong> ${escapeHtml(data.dec || '—')}
        </div>
        <div>
          <strong>Cargo:</strong> ${escapeHtml(data.cargo || '—')}
        </div>
        <div>
          <strong>WhatsApp:</strong> ${escapeHtml(data.wa || '—')}
        </div>
        <div>
          <strong>E-mail:</strong> ${escapeHtml(data.email || '—')}
        </div>
        <div>
          <strong>Cidade/Estado:</strong> ${escapeHtml(data.cidade || '—')}
        </div>
        <div>
          <strong>Segmento:</strong> ${escapeHtml(data.seg || '—')}
        </div>
      </div>
    </div>

    <div style="margin-bottom: 30px;">
      <h3 style="font-size: 14px; font-weight: 700; border-bottom: 2px solid #C41230; padding-bottom: 10px; margin-bottom: 15px;">
        CONTEXTO DO NEGÓCIO
      </h3>
      <div style="font-size: 12px; line-height: 1.6;">
        <p><strong>Principal Dor/Desafio:</strong> ${escapeHtml(data.dor || '—')}</p>
        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; margin-top: 10px;">
          <div>
            <strong>Faturamento Mensal:</strong> ${escapeHtml(data.fat || '—')}
          </div>
          <div>
            <strong>Ticket Médio:</strong> ${escapeHtml(data.tkt || '—')}
          </div>
          <div>
            <strong>Investe em Tráfego:</strong> ${escapeHtml(data.traf || '—')}
          </div>
        </div>
      </div>
    </div>

    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 11px; color: #666;">
      <p style="margin: 0;">Proposta válida por ${escapeHtml(data.val || '15')} dias a partir de ${formatDate(
        data.data
      )}</p>
    </div>
  `

  return wrapPage(headerHtml)
}

function renderPage2(data: ProposalData, services: any[]): string {
  const servicesHtml = services
    .map(
      (svc, idx) => `
    <div style="margin-bottom: 20px; padding: 15px; background: #f9f9f9; border-radius: 6px;">
      <h4 style="margin: 0 0 8px 0; font-size: 13px; font-weight: 700; color: #333;">
        ${idx + 1}. ${escapeHtml(svc.desc || '—')}
      </h4>
      <p style="margin: 0 0 10px 0; font-size: 12px; color: #666;">
        ${escapeHtml(svc.note || '—')}
      </p>
      <div style="text-align: right; font-size: 13px; font-weight: 600; color: #C41230;">
        ${formatCurrency(svc.val || '0')} / mês
      </div>
    </div>
  `
    )
    .join('')

  const pageHtml = `
    <h2 style="font-size: 24px; font-weight: 900; color: #C41230; margin-bottom: 20px;">
      ESCOPO DE SERVIÇOS
    </h2>

    <div style="margin-bottom: 30px;">
      ${servicesHtml || '<p style="color: #999;">Nenhum serviço adicionado</p>'}
    </div>

    <div style="margin-top: 40px; padding: 20px; background: linear-gradient(135deg, #C41230 0%, #9B0F26 100%); color: white; border-radius: 6px; text-align: center;">
      <p style="font-size: 12px; margin: 0 0 10px 0;">INVESTIMENTO MENSAL</p>
      <p style="font-size: 32px; font-weight: 900; margin: 0;">
        ${formatCurrency(calculateTotal(services).toString())}
      </p>
    </div>

    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 11px; color: #666;">
      <h4 style="margin-top: 0;">Diagnóstico Comercial:</h4>
      <ul style="margin: 5px 0; padding-left: 20px;">
        <li><strong>Recebimento de leads:</strong> ${escapeHtml(data.d1 || '—')}</li>
        <li><strong>Primeiro contato:</strong> ${escapeHtml(data.d2 || '—')}</li>
        <li><strong>Conversão:</strong> ${escapeHtml(data.d3 || '—')}</li>
        <li><strong>CRM:</strong> ${escapeHtml(data.d4 || '—')}</li>
      </ul>
    </div>
  `

  return wrapPage(pageHtml)
}

function renderPage3(
  data: ProposalData,
  services: any[],
  total: number
): string {
  const pageHtml = `
    <h2 style="font-size: 24px; font-weight: 900; color: #C41230; margin-bottom: 20px;">
      CONDIÇÕES COMERCIAIS
    </h2>

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 30px;">
      <div style="padding: 15px; background: #f9f9f9; border-radius: 6px;">
        <strong>Prazo:</strong> ${escapeHtml(data.prazo || '—')}
      </div>
      <div style="padding: 15px; background: #f9f9f9; border-radius: 6px;">
        <strong>Pagamento:</strong> ${escapeHtml(data.pag || '—')}
      </div>
      <div style="padding: 15px; background: #f9f9f9; border-radius: 6px;">
        <strong>Início:</strong> ${formatDate(data.inicio) || '—'}
      </div>
      <div style="padding: 15px; background: #f9f9f9; border-radius: 6px;">
        <strong>Onboarding:</strong> ${escapeHtml(data.onb || '—')} dias úteis
      </div>
    </div>

    ${
      data.obs
        ? `
    <div style="margin-bottom: 30px;">
      <h3 style="font-size: 14px; font-weight: 700; border-bottom: 2px solid #C41230; padding-bottom: 10px; margin-bottom: 15px;">
        OBSERVAÇÕES
      </h3>
      <p style="font-size: 12px; color: #333; line-height: 1.6;">
        ${escapeHtml(data.obs)}
      </p>
    </div>
  `
        : ''
    }

    <div style="margin-top: 40px; padding: 20px; background: #f9f9f9; border-radius: 6px;">
      <h3 style="font-size: 14px; font-weight: 700; margin-top: 0; margin-bottom: 15px;">
        CONTATO NGP
      </h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 15px; font-size: 12px;">
        <div>
          <strong>WhatsApp:</strong> ${escapeHtml(data.nfone || '—')}
        </div>
        <div>
          <strong>E-mail:</strong> ${escapeHtml(data.nemail || '—')}
        </div>
        <div>
          <strong>Site:</strong> ${escapeHtml(data.nsite || '—')}
        </div>
      </div>
    </div>

    <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; font-size: 10px; color: #999;">
      <p style="margin: 0;">
        NGP — Nova Gestão de Performance<br />
        Proposta gerada em ${formatDate(new Date().toISOString().split('T')[0])}
      </p>
    </div>
  `

  return wrapPage(pageHtml)
}

function wrapPage(content: string): string {
  return `
    <div style="
      width: 210mm;
      height: 297mm;
      padding: 30mm;
      background: white;
      color: black;
      font-family: 'Barlow', sans-serif;
      font-size: 12px;
      line-height: 1.6;
      box-sizing: border-box;
      page-break-after: always;
      break-after: page;
    ">
      ${content}
    </div>
  `
}
