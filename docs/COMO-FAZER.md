# Guia de execução (do zero até a entrega)

O código está pronto, mas **você precisa rodar, entender e versionar** cada parte. O enunciado exige histórico de commits distribuído até 03/11 e que você explique tudo no vídeo. Então não suba tudo de uma vez: leia cada bloco, rode, teste e só então faça o commit.

## 1. Montar o projeto local

```bash
git clone https://github.com/HenriVF/portfolio.git
cd portfolio
npm create vite@latest . -- --template react
npm install
npm install react-router-dom @tanstack/react-query react-hook-form zod @hookform/resolvers @supabase/supabase-js @emailjs/browser
npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event prettier husky lint-staged
```

Depois:

1. Copie os arquivos desta pasta por cima do projeto (sobrescreva `index.html`, `vite.config.js`, `src/main.jsx`, `src/App.jsx` e `src/index.css`).
2. Apague o que sobrou do template: `src/App.css` e `src/assets/react.svg`.
3. Em `package.json`, adicione em `scripts`:

```json
"test": "vitest run",
"test:watch": "vitest",
"format": "prettier --write .",
"prepare": "husky"
```

4. Ative os hooks: `npm run prepare`. Os arquivos `.husky/pre-commit` e `.husky/commit-msg` já estão prontos.
5. Rode `npm run dev` e `npm test`. Se algo falhar, me mande a mensagem de erro.

## 2. Configurar os serviços externos

**Supabase** (login, mensagens e destaques)

1. Crie um projeto em supabase.com.
2. No SQL Editor, rode `supabase/schema.sql`.
3. Em Authentication > Providers > Email, desative o cadastro aberto ("Allow new users to sign up"). Em Authentication > Users, crie o seu usuário.
4. Copie a URL e a chave `anon` (Project Settings > API) para o `.env`.

**EmailJS** (aviso por e-mail)

1. Crie uma conta em emailjs.com, adicione um serviço de e-mail e um template.
2. No template, use as variáveis `{{from_name}}`, `{{reply_to}}` e `{{message}}`.
3. Copie Service ID, Template ID e Public Key para o `.env`.

**Vercel**: em Project Settings > Environment Variables, cadastre as mesmas variáveis do `.env` (todas começam com `VITE_`) e faça um novo deploy.

## 3. Plano de branches e commits

Cada bloco abaixo vira uma branch própria, integrada na `main` por Pull Request. Faça isso ao longo dos dias, conforme você lê e testa cada parte.

| Branch               | O que entra                                                                                         | Exemplo de commit                                      |
| -------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `feature/qualidade`  | Prettier, lint-staged, Husky                                                                        | `chore: configura prettier, husky e lint-staged`       |
| `feature/base`       | `main.jsx`, `Layout`, `Header`, `Footer`, `Button`, CSS, tema                                       | `feat: adiciona layout base e tema claro/escuro`       |
| `feature/rotas`      | `App.jsx`, `NotFound`, `vercel.json`                                                                | `feat: adiciona rotas e página 404`                    |
| `feature/github-api` | `githubService`, hooks, `ProjectCard`, `ProjectGrid`, skeleton, `Projects`, `ProjectDetail`, `Home` | `feat: lista projetos da API do GitHub com cache`      |
| `feature/contato`    | `contactSchema`, `ContactForm`, `contactService`, `Contact`                                         | `feat: adiciona formulário de contato com validação`   |
| `feature/dashboard`  | `AuthProvider`, `Login`, `ProtectedRoute`, `Dashboard`, painéis, services                           | `feat: adiciona dashboard protegido por login`         |
| `feature/testes`     | todos os `*.test.*` e `setup.js`                                                                    | `test: cobre validação do formulário e rota protegida` |
| `docs/entrega`       | README final, justificativas                                                                        | `docs: finaliza README e justificativas`               |

Fluxo de cada branch:

```bash
git checkout main && git pull
git checkout -b feature/nome
# ...trabalhe, teste, commite...
git push -u origin feature/nome
# abra o Pull Request no GitHub e faça o merge na main
```

## 4. Conferir os requisitos antes de entregar

| Requisito      | Como verificar                                                                                                                               |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. Rotas       | Abra `/projetos/<nome-de-um-repo>`, atualize (F5) e teste `/qualquer-coisa` (404). Desligue a internet e recarregue para ver a falha da API. |
| 2. Estados     | Veja skeletons ao recarregar. No DevTools (Network), simule "Offline" para ver o erro.                                                       |
| 3. GitHub      | Cards com descrição, linguagem e data. Troque de página e confira no Network que não repete a chamada.                                       |
| 4. Contato     | Envie vazio, com e-mail inválido e com mensagem curta. Depois envie uma válida e confira o e-mail e a mensagem no dashboard.                 |
| 5. Dashboard   | Acesse `/dashboard` deslogado (deve ir para `/login`). Marque mensagem como respondida e destaque projetos.                                  |
| 6. Tema        | Alterne, feche a aba e reabra.                                                                                                               |
| 7. Interface   | DevTools no modo celular (390 px) e desktop.                                                                                                 |
| 8. Performance | Lighthouse em modo mobile, nota 80 ou mais. `npm run build` mostra os pedaços separados (dashboard, páginas).                                |
| 9. Testes      | `npm test` passando.                                                                                                                         |
| 10. Deploy     | Faça um push na `main` e veja o deploy automático.                                                                                           |
| 11 e 12        | `git log --oneline` com mensagens no padrão; `npm run lint` limpo.                                                                           |

## 5. O que não está incluído

- **Cena 3D**: o enunciado a trata como opcional ("podendo incluir"). O destaque visual da home é o brilho que acompanha o mouse. Se quiser 3D, me peça: entra com React Three Fiber carregado sob demanda.
- **Imagens**: o site não usa imagens, então não há o que otimizar. Se você adicionar capturas de tela dos projetos, use WebP e `loading="lazy"` com largura e altura definidas.
- **Nome e texto**: troque `name`, `role` e `intro` em `src/config/site.js`.
