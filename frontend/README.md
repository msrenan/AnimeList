# AnimeList — Frontend

SPA em React + TypeScript + Vite para gerenciar a coleção de animes.

## Scripts

```bash
npm install       # instala dependências
npm run dev       # ambiente de desenvolvimento
npm run build     # type-check + build de produção
npm run lint      # ESLint
npm run preview   # pré-visualiza a build
```

## Configuração

Crie/edite o arquivo `.env`:

```env
VITE_API_URL=http://localhost:8080
```

## Organização

- `src/api` — cliente Axios e rotas da API.
- `src/hooks` — estado, carregamento e mutações.
- `src/components` — componentes de UI, cards, modais e menus.
- `src/pages` — Login, Registro, Home, Animes e Listas.
- `src/types` — tipos de request/response, enums e contextos.

As rotas de interface são `/login`, `/register`, `/home`, `/anime` e `/list`.
