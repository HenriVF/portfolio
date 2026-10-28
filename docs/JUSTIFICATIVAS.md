# Justificativas da stack e do harness de IA

Use este arquivo como base da parte 2 e da parte 3 do vídeo. **Revise com suas palavras**: você precisa defender cada escolha na "entrevista".

## Stack

| Escolha                                 | O que comparei                | Critério                                                                                                     | O que aceitei perder                             |
| --------------------------------------- | ----------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------ |
| React + Vite                            | Next.js                       | Site estático, sem necessidade de servidor; build e dev rápidos                                              | Renderização no servidor (SSR) e SEO mais forte  |
| JavaScript                              | TypeScript                    | Menos configuração e prazo curto                                                                             | Checagem de tipos que pega erros cedo            |
| React Router                            | TanStack Router, wouter       | Padrão do mercado, muita documentação, lazy por rota                                                         | Tipagem de rotas do TanStack Router              |
| TanStack Query                          | SWR, `useState` + `useEffect` | Cache, estados de loading/erro e deduplicação prontos (cumpre o requisito de não repetir chamadas ao GitHub) | Mais uma dependência                             |
| React Hook Form + Zod                   | Formik, validação manual      | Poucos re-renders, schema reutilizável nos testes, mensagem por campo                                        | Curva de aprendizado de duas bibliotecas         |
| Supabase                                | Firebase, PocketBase          | Banco SQL, login e políticas de acesso (RLS) num só serviço, plano gratuito                                  | Dependência de serviço externo                   |
| EmailJS                                 | Formspree, backend próprio    | Envia e-mail direto do navegador, sem servidor                                                               | A chave pública fica exposta no front            |
| CSS puro com variáveis                  | Tailwind, MUI, shadcn/ui      | Tema claro/escuro vira troca de variáveis; zero dependência; identidade visual própria                       | Velocidade dos utilitários do Tailwind           |
| Vitest + Testing Library                | Playwright                    | Roda junto do Vite, rápido, cobre validação e rota protegida                                                 | Não testa o navegador real de ponta a ponta      |
| Vercel                                  | Netlify, Hostinger            | Deploy automático por push, integração direta com o GitHub                                                   | Menos controle de infraestrutura                 |
| ESLint + Prettier + Husky + lint-staged | Biome                         | Ecossistema mais comum; ESLint já vem no template                                                            | Biome é mais rápido e mais simples de configurar |

## Arquitetura

- `components`: apenas apresentação, reaproveitados (`Button`, `ProjectCard`, `ProjectGrid`, `StateMessage`, `Field`).
- `services`: único lugar com chamadas de API (GitHub, Supabase, EmailJS).
- `hooks`: ligam os serviços ao React usando TanStack Query.
- `pages`: uma por rota, só compõem componentes e hooks.
- `context`: tema e autenticação.
- Critério para dividir componentes: se aparece em mais de uma página ou tem estado próprio, vira componente.

## Caminho de uma alteração

Branch `feature/x` → commits no padrão (validados pelo Husky) → lint e Prettier no commit → Pull Request → merge na `main` → Vercel faz o deploy automático.

## Harness de IA (preencha com a sua realidade)

- **Ferramenta e modelo:** _[ex.: Claude Code com Claude Sonnet / Cursor / Copilot, e por que você escolheu]_
- **Instruções do projeto:** `CLAUDE.md` na raiz, versionado. Define stack, arquitetura, nomenclatura, commits, branches e requisitos que sempre valem.
- **Skills, MCPs e agentes:** _[liste o que de fato usou. Se não usou nenhum, diga e explique o motivo.]_
- **Guardrails automáticos:** o Husky valida a mensagem de commit e roda lint antes de cada commit. Assim, mesmo que a IA erre o padrão, o commit é recusado.
- **Como a IA segue os padrões:** ela lê o `CLAUDE.md`; o que ela não seguir, o lint, os testes e o hook de commit barram.
- **Como conduzi a IA:** _[descreva: pediu por blocos pequenos? revisou cada diff? corrigiu alguma decisão dela? Dê um exemplo concreto.]_
