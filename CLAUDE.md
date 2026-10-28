# Instruções do projeto (para a IA)

Portfólio em React + Vite (JavaScript). Leia este arquivo antes de qualquer alteração e siga as regras abaixo.

## Stack

React, React Router, TanStack Query, React Hook Form + Zod, Supabase, EmailJS, CSS puro com variáveis, Vitest + Testing Library. Não adicione bibliotecas sem avisar e justificar.

## Arquitetura

- `src/components`: apenas apresentação, pequenos e reutilizáveis.
- `src/pages`: uma página por rota, só compõem componentes e hooks.
- `src/services`: todas as chamadas de API. Nunca faça `fetch` ou acesse o Supabase dentro de componentes.
- `src/hooks`: ligam serviços ao React (TanStack Query).
- `src/context`: tema e autenticação. Contexto em `nomeContext.js`, provider em `NomeProvider.jsx`.
- `src/schemas`: validações com Zod.
- Reaproveite `Button`, `ProjectCard`, `ProjectGrid`, `Field` e `StateMessage`. Não crie variações.

## Nomenclatura

- Componentes e páginas em PascalCase; hooks começam com `use`; serviços, utilitários e schemas em camelCase.
- Textos da interface em português, com acentuação correta.

## Commits

- Conventional Commits: `tipo: descrição no imperativo`. Tipos: feat, fix, docs, style, refactor, test, chore, perf.
- Um commit por mudança lógica. Mensagens curtas e específicas.
- Nunca faça commit direto na `main`.

## Branches

- Uma branch por funcionalidade: `feature/<nome>`; correções em `fix/<nome>`.
- Antes de começar, confirme a branch atual e crie a da funcionalidade se necessário.

## Requisitos que sempre valem

- Todo dado de API tem estados de carregamento, erro e lista vazia.
- Botões de envio ficam bloqueados durante o envio.
- Dashboard e páginas pesadas carregam sob demanda (`React.lazy` + `Suspense`).
- Skeletons têm a mesma altura do conteúdo final (sem salto de layout).
- Não repita chamadas à API do GitHub: use a chave de cache `github-projects`.
- Segredos só no `.env` (nunca versionado); novas variáveis entram no `.env.example`.
- Cores e espaçamentos vêm das variáveis CSS em `src/index.css`; nunca fixe cores nos componentes.

## Qualidade

- Rode `npm run lint` e `npm test` antes de propor um commit.
- Explique em poucas linhas o que mudou e por quê, para que o autor consiga justificar o código no vídeo.
