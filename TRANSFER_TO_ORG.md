# Transferindo o Repositório para a Organização `grupongp`

Como o repositório foi criado na conta pessoal (@Arthurngp), siga os passos abaixo para transferi-lo para a organização `grupongp`:

## Opção 1: Via Web Interface (Recomendado)

1. Acesse: https://github.com/Arthurngp/ngp-proposta-nextjs
2. Clique em **Settings** (⚙️ engrenagem)
3. Role até **Danger Zone**
4. Clique em **Transfer** (sob "Transfer ownership")
5. Selecione `grupongp` como novo proprietário
6. Digite o nome do repositório: `ngp-proposta-nextjs`
7. Clique em **I understand, transfer this repository.**

## Opção 2: Via CLI (Requer Permissões)

```bash
# Se você tem permissão para transferir via CLI
gh repo transfer Arthurngp/ngp-proposta-nextjs --new-owner grupongp
```

## Após a Transferência

O repositório estará disponível em: `https://github.com/grupongp/ngp-proposta-nextjs`

Atualize o remote local (se necessário):

```bash
git remote set-url origin https://github.com/grupongp/ngp-proposta-nextjs.git
```

---

## Estrutura do Repositório Transferido

A organização `grupongp` terá acesso ao código completo com:

✅ Histórico de commits semânticos
✅ Documentação completa (README)
✅ Configuração de TypeScript e ESLint
✅ Pronto para CI/CD (GitHub Actions)
✅ Estrutura modular e escalável
