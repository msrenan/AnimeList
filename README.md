# AnimeList

Aplicação full stack para organizar sua coleção de animes: acompanhe temporadas, episódios, lançamentos e monte listas personalizadas.

![Stack](https://img.shields.io/badge/Spring%20Boot-4.1-6DB33F?style=flat-square)
![Stack](https://img.shields.io/badge/React-19-61DAFB?style=flat-square)
![Stack](https://img.shields.io/badge/TypeScript-6-3178C6?style=flat-square)
![Stack](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square)
![Stack](https://img.shields.io/badge/PostgreSQL-18-4169E1?style=flat-square)

## Funcionalidades

- Cadastro, login e sessão com JWT.
- Coleção global de animes com temporada, episódio, dia de lançamento, status e acompanhamento.
- Busca por título e filtros por favoritos, assistindo, assistidos e "começar".
- Favoritos sincronizados com a lista padrão **Favoritos** de cada conta.
- Listas personalizadas com criação, renomeação, exclusão e gerenciamento de animes.
- Última temporada e edição de perfil.
- Interface responsiva com temas escuros, feedback por toasts, modais e estados de carregamento.

## Stack

**Backend**
- Java 25 + Spring Boot 4.1
- Spring Web, Spring Data JPA, Spring Security
- JWT com `java-jwt`
- PostgreSQL
- Validação com Jakarta Bean Validation
- Lombok

**Frontend**
- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- React Router
- Axios
- React Icons
- React Toastify

## Estrutura

```text
.
├── backend/                  # API Spring Boot
│   ├── src/main/java/        # Controllers, Services, Repositories, DTOs, Security
│   ├── src/test/             # Teste de contexto com H2
│   └── compose.yaml          # PostgreSQL via Docker
├── frontend/                 # SPA React + Vite
│   └── src/
│       ├── api/              # Cliente Axios e rotas da API
│       ├── components/       # Componentes e UI compartilhada
│       ├── hooks/            # Estado e chamadas de API
│       ├── pages/            # Login, Registro, Home, Animes e Listas
│       └── types/            # Tipos e contextos
├── Makefile
├── run.sh
└── clear.sh
```

## Como rodar

### Pré-requisitos

- Java 25+ (o projeto também compila em JDKs mais recentes)
- Node.js 20+
- Docker e Docker Compose
- `make` (opcional)

### 1. Banco de dados

```bash
make up
# ou
sudo docker compose -f backend/compose.yaml up -d
```

O banco sobe em `localhost:5432` com:
- database: `animelist-db`
- usuário: `api`
- senha: `senha`

O dump inicial fica em `backend/backups/dump.sql`.

### 2. Backend

```bash
cd backend
./mvnw spring-boot:run
```

A API fica disponível em `http://localhost:8080`.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

A interface fica disponível em `http://localhost:5173`.

### Atalho

```bash
./run.sh
```

O script sobe o banco, o backend e o frontend juntos. Use `Ctrl+C` para encerrar e gerar backup automaticamente.

## Variáveis de ambiente

### Backend (`backend/src/main/resources/application.properties`)

| Variável | Padrão | Descrição |
| --- | --- | --- |
| `DB_URL` | `jdbc:postgresql://localhost:5432/animelist-db` | URL do PostgreSQL |
| `DB_USER` | `api` | Usuário do banco |
| `DB_PASSWORD` | `senha` | Senha do banco |
| `JWT_SECRET` | valor de desenvolvimento | Segredo usado para assinar o JWT |
| `JWT_EXPIRATION_HOURS` | `6` | Expiração do token em horas |

Em produção, **defina `JWT_SECRET` e as credenciais do banco por variáveis de ambiente**.

### Frontend (`frontend/.env`)

| Variável | Padrão | Descrição |
| --- | --- | --- |
| `VITE_API_URL` | `http://localhost:8080` | URL base da API |

## Rotas da API

Todas as rotas (exceto login e registro) exigem `Authorization: Bearer <token>`.

### Autenticação

| Método | Rota | Descrição |
| --- | --- | --- |
| `POST` | `/auth/register` | Cria conta e retorna token |
| `POST` | `/auth/login` | Autentica e retorna token |
| `GET` | `/auth/check` | Valida o token atual |

### Conta

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/account/{accountId}` | Busca dados da conta |
| `PUT` | `/account/{accountId}` | Edita o nickname |
| `DELETE` | `/account/{accountId}` | Exclui a conta |
| `GET` | `/account/{accountId}/lists` | Lista as listas da conta (`?search=`) |
| `POST` | `/account/{accountId}/lists` | Cria uma lista |

### Animes

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/anime` | Lista animes (`?search=` ou `?filter=`) |
| `GET` | `/anime/id/{animeId}` | Busca anime por ID |
| `POST` | `/anime` | Cria anime |
| `PUT` | `/anime/id/{animeId}` | Edita anime |
| `DELETE` | `/anime/id/{animeId}` | Exclui anime |

Filtros disponíveis: `FAVORITOS`, `ASSISTIDOS`, `ASSISTINDO`, `COMEÇAR`.

### Listas

| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/list/{listId}` | Busca lista por ID |
| `GET` | `/list/{listId}/animes` | Lista animes da lista |
| `PATCH` | `/list/{listId}/add/id/{animeId}` | Adiciona anime |
| `PATCH` | `/list/{listId}/remove/id/{animeId}` | Remove anime |
| `PUT` | `/list/{listId}` | Renomeia lista |
| `DELETE` | `/list/{listId}` | Exclui lista |

A lista **Favoritos** é padrão e não pode ser renomeada, excluída ou editada manualmente.

## Scripts úteis

```bash
# Backend
cd backend
./mvnw test          # testes (H2 em memória)
./mvnw clean package # build

# Frontend
cd frontend
npm run lint         # ESLint
npm run build        # type-check + build de produção

# Na raiz
make up              # sobe o PostgreSQL
make backup          # gera dump do banco
make down            # backup + derruba o banco
make test            # testes/lint/build dos dois projetos
```

## Melhorias desta versão

**Backend**
- Transações (`@Transactional`) e consultas `readOnly` nos serviços.
- `EntityGraph` e consultas derivadas para reduzir N+1.
- Favoritos agora são atualizados na lista **Favoritos da conta autenticada**, corrigindo o cenário com múltiplas contas.
- Validação de e-mail, tamanho de campos e duplicidade de títulos.
- Tratamento centralizado de erros: 400, 401, 404, 409 e 500 com JSON consistente.
- Filtro JWT retorna 401 em token inválido, em vez de estourar erro interno.
- Configuração externalizada por variáveis de ambiente.
- Teste de contexto usando H2 em memória.

**Frontend**
- Design responsivo reconstruído com tema escuro, tipografia dedicada e componentes reutilizáveis.
- Busca com debounce, filtros, skeletons, empty states e toasts.
- Formulários controlados (sem perda de valores no blur) e validações amigáveis.
- Modais acessíveis com foco, `Esc` e clique no backdrop.
- Sessão restaurada com validação real do token e tratamento de expiração.
- Menus de contexto posicionados via portal, sem cortes por overflow.
- Página inicial com estatísticas e visão rápida das listas.

## Observações

- A coleção de animes é **compartilhada entre as contas** (comportamento original). As listas, favoritos e perfil são por conta.
- Para produção, recomenda-se também restringir o acesso por dono nos endpoints de conta/lista e usar HTTPS.
