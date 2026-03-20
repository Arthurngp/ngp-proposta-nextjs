# NGP — Proposta Comercial v3.0

Gerador profissional de propostas comerciais com **Next.js**, **TypeScript**, **React** e **Tailwind CSS**. Funcionalidades incluem preview em tempo real, persistência de dados com localStorage, exportação para PDF e design responsivo.

## 🎯 Features

- ✅ **Aplicação Web Moderna**: Construída com Next.js 14, React 18 e TypeScript
- ✅ **Preview em Tempo Real**: 3 páginas A4 com formatação profissional
- ✅ **Persistência de Dados**: localStorage mantém dados entre sessões
- ✅ **Responsivo**: Desktop, tablet e mobile otimizado
- ✅ **Exportação PDF**: Ctrl+P para salvar como PDF
- ✅ **Serviços Dinâmicos**: Adicione/remova serviços com valor e notas
- ✅ **Formulário Estruturado**: 7 seções bem organizadas
- ✅ **Barra de Progresso**: Acompanhe o preenchimento em tempo real
- ✅ **Dark Theme**: Interface moderna com tema escuro

## 📂 Estrutura do Projeto

```
ngp-proposta-nextjs/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout com metadados
│   │   ├── page.tsx             # Página principal com estado
│   │   └── globals.css          # Estilos globais + Tailwind
│   ├── components/
│   │   ├── Sidebar.tsx          # Formulário principal com 7 seções
│   │   ├── FormSection.tsx      # Componente reutilizável de seção
│   │   ├── FormField.tsx        # Campo de formulário com label
│   │   ├── ServiceCard.tsx      # Card de serviço individual
│   │   ├── ProgressBar.tsx      # Barra de progresso
│   │   └── Preview.tsx          # Renderização das 3 páginas A4
│   └── lib/
│       ├── types.ts             # Definições TypeScript
│       ├── storage.ts           # Funções de localStorage
│       └── utils.ts             # Utilitários (formatação, escape, etc)
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
├── postcss.config.js
├── .eslintrc.json
├── .gitignore
└── README.md
```

## 🚀 Como Usar

### Instalação

```bash
# Clone ou navegue até o diretório
cd ngp-proposta-nextjs

# Instale as dependências (npm, yarn, pnpm ou bun)
npm install
# ou
pnpm install
```

### Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Build para Produção

```bash
npm run build
npm start
```

### Type Checking

```bash
npm run type-check
```

## 📄 Como Exportar para PDF

1. Preencha o formulário com os dados da proposta (à esquerda)
2. Verifique o preview das 3 páginas A4 (à direita, atualiza em tempo real)
3. Pressione **Ctrl+P** (ou **Cmd+P** no Mac) ou clique em "Imprimir / PDF"
4. Escolha "Salvar como PDF" ou imprima normalmente

## 🔄 Fluxo de Dados

```
Usuário preenche formulário
    ↓
Evento oninput dispara atualização de estado (React)
    ↓
Componentes re-renderizam (Sidebar + Preview)
    ↓
Dados salvos em localStorage (persistência)
    ↓
Ao recarregar → dados restaurados automaticamente
```

## 📋 Seções do Formulário

### 1. Identificação
- Nº da Proposta
- Data de Emissão
- Validade (dias)
- Responsável NGP

### 2. Dados do Cliente
- Razão Social/Nome
- CNPJ/CPF
- Decisor
- Cargo
- WhatsApp
- E-mail
- Cidade/Estado
- Segmento
- Site/Instagram

### 3. Contexto do Negócio
- Principal Dor/Desafio
- Faturamento Médio Mensal
- Ticket Médio
- Investe em Tráfego?
- Diagnóstico Comercial (4 campos):
  - Como o lead é recebido?
  - Tempo de primeiro contato
  - Taxa de conversão estimada
  - Usa CRM?

### 4. Escopo de Serviços
- Lista dinâmica com:
  - Descrição do serviço
  - Valor mensal
  - Notas/detalhes adicionais
- Cálculo automático do total mensal

### 5. Condições Comerciais
- Prazo de Contrato
- Forma de Pagamento
- Início Previsto
- Onboarding (dias úteis)

### 6. Observações
- Textarea para condições especiais e personalizações

### 7. Contato NGP
- WhatsApp
- E-mail
- Site da agência

## 🎨 Tecnologias

- **Next.js 14**: Framework React com SSR, SSG e API routes
- **React 18**: UI com hooks e componentes funcionais
- **TypeScript**: Tipagem estática para segurança
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS + Autoprefixer**: Processamento de CSS
- **ESLint**: Linting de código

## 🛠️ Desenvolvimento

### Adicionar Nova Seção no Formulário

1. Adicione a interface no `src/lib/types.ts` (se campos novos)
2. Adicione o `FormSection` no `src/components/Sidebar.tsx`
3. Atualize a lógica de renderização em `src/components/Preview.tsx`
4. Atualize o `DEFAULT_DATA` em `src/app/page.tsx`

### Modificar Estilos

- **Tailwind**: Use classes do Tailwind nos componentes JSX
- **Custom CSS**: Edite `src/app/globals.css` para estilos globais
- **Cores**: Personalize em `tailwind.config.ts` (seção `theme.extend.colors`)

### Melhorar Performance

- Componentes já usam `useMemo` para prevenir re-renders desnecessários
- O `Preview` só re-renderiza quando os dados mudam
- Considere lazy loading se adicionar muitas imagens

## 🔐 Segurança

- ✅ Escapamento HTML com `escapeHtml()` para prevenir XSS
- ✅ localStorage é isolado por domínio
- ✅ Tipos TypeScript para evitar erros em tempo de execução
- ✅ Sem dependências externas perigosas (apenas bibliotecas confiáveis)

## 📱 Compatibilidade

- ✅ Chrome / Edge v88+
- ✅ Firefox v85+
- ✅ Safari v14+
- ✅ Mobile (iOS Safari, Chrome Mobile)

## 📈 Roadmap

- [ ] Exportar dados em JSON
- [ ] Templates customizáveis
- [ ] Autenticação e cloud sync
- [ ] Integração com APIs (CRM, automação)
- [ ] Múltiplos idiomas (EN, ES, FR)
- [ ] Histórico de propostas
- [ ] Dark/Light mode toggle
- [ ] Análise e relatórios

## 🐛 Reportar Problemas

Encontrou um bug? Abra uma issue com:
- Descrição clara do problema
- Passos para reproduzir
- Screenshots ou logs do console (se aplicável)

## 📜 Licença

© 2026 NGP — Nova Gestão de Performance. Todos os direitos reservados.

---

**Versão**: 3.0 (Next.js Refactor)  
**Última atualização**: Março 2026  
**Mantido por**: Arthur Bezerra
