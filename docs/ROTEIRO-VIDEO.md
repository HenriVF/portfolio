# Roteiro do vídeo (máximo 8 minutos)

Rosto e tela visíveis o tempo todo. Publique como **não listado** no YouTube.

| Tempo       | Conteúdo                                    | O que mostrar na tela                                                                                            |
| ----------- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| 0:00 - 0:30 | Apresentação: quem você é e o que construiu | Site publicado na Vercel                                                                                         |
| 0:30 - 3:00 | **Parte 1: stack e arquitetura**            | Diagrama de pastas e fluxo de dados; fluxo da branch ao deploy; um card sendo carregado (skeleton, depois dados) |
| 3:00 - 5:30 | **Parte 2: justificativas**                 | Tabela de `docs/JUSTIFICATIVAS.md`: para cada escolha, o que comparou, o critério e o que perdeu                 |
| 5:30 - 7:45 | **Parte 3: harness de IA**                  | `CLAUDE.md` no repositório; um commit recusado pelo Husky; uma conversa com a IA mostrando como você a conduziu  |
| 7:45 - 8:00 | Fechamento                                  | Link do repositório e do site                                                                                    |

## Diagrama de fluxo de dados (para desenhar ou mostrar)

```
Visitante
  |
  v
Página (pages) --usa--> Hook (hooks) --chama--> Serviço (services) --> GitHub API
      |                       |                                   --> Supabase
      v                       v                                   --> EmailJS
Componentes (components)   TanStack Query (cache)
```

## Dicas

- Ensaie uma vez com cronômetro. Passar de 8 minutos é perder ponto.
- Prepare as abas antes de gravar: site, repositório, `CLAUDE.md`, `git log`, DevTools.
- Responda como numa entrevista: "escolhi X em vez de Y porque..., aceitei perder...".
- Esteja pronto para abrir qualquer arquivo e explicar o que ele faz.
