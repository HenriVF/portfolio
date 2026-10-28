# Portfólio

Site de portfólio pessoal em React. Os projetos vêm da API do GitHub, há um formulário de contato (salvo no banco e enviado por e-mail) e um dashboard protegido por login.

- **Site publicado:** _(cole aqui a URL da Vercel)_
- **Repositório:** https://github.com/HenriVF/portfolio

## Tecnologias

| Área                                  | Tecnologia                                       |
| ------------------------------------- | ------------------------------------------------ |
| Base                                  | React + Vite (JavaScript)                        |
| Rotas                                 | React Router                                     |
| Dados da API                          | TanStack Query                                   |
| Formulário                            | React Hook Form + Zod                            |
| Backend (login, mensagens, destaques) | Supabase                                         |
| E-mail                                | EmailJS                                          |
| Estilo                                | CSS puro com variáveis (tema claro/escuro)       |
| Testes                                | Vitest + Testing Library                         |
| Qualidade                             | ESLint, Prettier, Husky, lint-staged             |
| Deploy                                | Vercel (deploy automático a cada push na `main`) |

As justificativas de cada escolha estão em `docs/JUSTIFICATIVAS.md`.

## Como rodar

```bash
git clone https://github.com/HenriVF/portfolio.git
cd portfolio
npm install
cp .env.example .env   # preencha as variáveis
npm run dev
```

| Comando          | O que faz                   |
| ---------------- | --------------------------- |
| `npm run dev`    | Servidor de desenvolvimento |
| `npm run build`  | Build de produção           |
| `npm run lint`   | ESLint                      |
| `npm test`       | Testes (Vitest)             |
| `npm run format` | Prettier                    |

### Configuração dos serviços

1. **Supabase:** crie o projeto, rode `supabase/schema.sql` e crie o seu usuário em Authentication.
2. **EmailJS:** crie serviço e template com `{{from_name}}`, `{{reply_to}}` e `{{message}}`.
3. Preencha o `.env` (veja `.env.example`). O `.env` nunca é versionado.

Passo a passo completo em `docs/COMO-FAZER.md`.

## Estrutura de pastas

```
src/
  components/   componentes visuais reutilizáveis (Button, ProjectCard, Field...)
  pages/        uma página por rota
  services/     chamadas de API (GitHub, Supabase, EmailJS), sem JSX
  hooks/        hooks personalizados (useGithubProjects, useMessages...)
  context/      tema e autenticação
  schemas/      validações com Zod
  config/       dados do site (nome, usuário do GitHub)
  utils/        funções puras
```

Regra principal: **componentes só apresentam; lógica e chamadas de API ficam em `services` e `hooks`.**

## Convenções de nomenclatura

- Componentes e páginas: `PascalCase` (`ProjectCard.jsx`)
- Hooks: começam com `use` (`useMessages.js`)
- Serviços, utilitários e schemas: `camelCase` (`githubService.js`)
- Contextos: `nomeContext.js` e `NomeProvider.jsx`
- Testes ao lado do arquivo: `Nome.test.jsx`

## Commits

**Conventional Commits:** `tipo: descrição no imperativo`. Tipos aceitos: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`. O hook `commit-msg` do Husky recusa mensagens fora do padrão.

Exemplo: `feat: adiciona validação do formulário de contato`

## Branches

**GitHub Flow:**

- `main`: sempre estável; cada push gera deploy automático.
- Uma branch por funcionalidade: `feature/rotas`, `feature/github-api`, `feature/contato`, `feature/dashboard`, `feature/testes`.
- Correções: `fix/nome-do-problema`.
- Integração por Pull Request.

## Qualidade automática

Antes de cada commit, o Husky roda o lint-staged (ESLint e Prettier nos arquivos alterados) e valida a mensagem do commit.

## Instruções para a IA

As regras que a IA segue estão em `CLAUDE.md`, na raiz do repositório.
