# PRD — SvelteKit Portfolio Project

## 1. Project Overview

- **Name:** Portfolio
- **Stack:** SvelteKit 2 + TypeScript + PostgreSQL (Drizzle ORM) + Tailwind CSS + TanStack Query
- **Server:** Node.js (via `@sveltejs/adapter-node`)
- **Deployment:** Docker (Alpine + Bun runtime, port 8000)
- **Purpose:** Backend API with RBAC auth system, serving as a portfolio backend

---

## 2. Project Structure

```
.
├── PRD.md                       # ← This file
├── src/
│   ├── routes/                  # SvelteKit file-based routing
│   │   ├── +page.svelte         # Welcome page
│   │   ├── +layout.svelte
│   │   ├── +error.svelte
│   │   └── api/
│   │       ├── [...path]/
│   │       │   └── +server.ts   # Catches all /api/* → delegates to bootstrap
│   │       └── docs/
│   │           └── +server.ts   # Scalar API Reference UI
│   │
│   ├── api/                      # Frontend API hooks ($api alias)
│   │   ├── index.ts               # Barrel export * as authApi, guestApi, policyApi
│   │   ├── auth/
│   │   │   ├── index.ts           # export { postLogin, deleteLogout, getUser }
│   │   │   ├── postLogin.ts       # POST /auth/login — useMutation
│   │   │   ├── deleteLogout.ts    # DELETE /auth/logout — useMutation
│   │   │   └── getUser.ts         # GET /auth/user — useQuery
│   │   ├── guest/
│   │   │   ├── index.ts           # export { getPing }
│   │   │   └── getPing.ts         # GET /guest/ping — useQuery
│   │   └── policy/
│   │       ├── index.ts           # export { getRoleList, getPermissionList, postPermission, deletePermission }
│   │       ├── getRoleList.ts     # GET /policy/role — useQuery
│   │       ├── getPermissionList.ts# GET /policy/permission — useQuery
│   │       ├── postPermission.ts  # POST /policy/permission — useMutation
│   │       └── deletePermission.ts# DELETE /policy/permission/:id — useMutation
│   │   ├── bootstrap/
│   │   │   └── app.ts           # Entry point: imports providers + routes, exports handlers
│   │   ├── controllers/         # Thin controllers → delegates to repositories
│   │   │   ├── authController.ts
│   │   │   ├── guestController.ts
│   │   │   ├── docController.ts
│   │   │   ├── policyController.ts
│   │   │   └── index.ts         # Barrel export * as ... from './...'
│   │   ├── repositories/        # Business logic layer (1 API per file)
│   │   │   ├── auth/
│   │   │   │   ├── index.ts     # export { loginRepository, logoutRepository, userRepository }
│   │   │   │   ├── loginRepository.ts
│   │   │   │   ├── logoutRepository.ts
│   │   │   │   └── userRepository.ts
│   │   │   └── policy/
│   │   │       ├── index.ts     # export { roleListRepository, permissionListRepository, ... }
│   │   │       ├── roleListRepository.ts
│   │   │       ├── permissionListRepository.ts
│   │   │       ├── permissionStoreRepository.ts
│   │   │       └── permissionDestroyRepository.ts
│   │   ├── resources/           # Data transformers (encodeId on every id field)
│   │   │   ├── auth/
│   │   │   │   ├── index.ts     # export { userResource }
│   │   │   │   └── userResource.ts
│   │   │   └── policy/
│   │   │       ├── index.ts     # export { roleListResource, permissionResource }
│   │   │       ├── roleListResource.ts
│   │   │       └── permissionResource.ts
│   │   ├── request/             # Zod validation schemas
│   │   │   ├── auth/
│   │   │   │   ├── index.ts     # export { loginRequest }
│   │   │   │   └── loginRequest.ts
│   │   │   └── policy/
│   │   │       ├── index.ts     # export { permissionStoreRequest }
│   │   │       └── permissionStoreRequest.ts
│   │   ├── middleware/          # Express-style middleware
│   │   │   ├── index.ts         # Auto-imports all middleware
│   │   │   ├── authMiddleware.ts
│   │   │   └── hashMiddleware.ts
│   │   ├── provider/            # Core framework
│   │   │   ├── routeProvider.ts # Custom router (Route DSL, middleware, policies)
│   │   │   ├── authProvider.ts  # Policy/role checking engine
│   │   │   └── appProvider.ts   # Imports middleware
│   │   ├── helper/
│   │   │   └── response.ts      # Response utilities
│   │   ├── routes/
│   │   │   └── api.ts           # All API route definitions
│   │   └── openapi/             # OpenAPI documentation
│   │       └── generate-openapi.js  # Build script, scans controllers for @openapi JSDoc tags
│   │
│   ├── db/                      # Database layer
│   │   ├── index.ts             # Drizzle client initialization
│   │   ├── commands/            # CLI scripts (seeder, db-cli)
│   │   └── schema/              # Drizzle schema definitions
│   │       ├── index.ts
│   │       ├── users.ts
│   │       ├── user_details.ts
│   │       ├── auths.ts
│   │       ├── roles.ts
│   │       ├── permissions.ts
│   │       ├── role_has_permissions.ts
│   │       └── user_has_roles.ts
│   │
│   ├── lib/                     # Libraries ($lib alias, SvelteKit built-in)
│   │   ├── index.ts
│   │   ├── axiosLib.ts          # Axios instance + URLSearchParams query builder + error handler
│   │   ├── hashLib.ts           # bcrypt + Hashids
│   │   ├── jwtLib.ts            # JWT sign/verify
│   │   ├── loggerLib.ts         # Winston logger
│   │   ├── zodLib.ts            # Zod + i18n validation
│   │   └── tanstackUtil.ts      # QueryClient + useQuery/useMutation wrappers
│   │
│   ├── utils/                   # Simple utility functions ($utils alias)
│   │   ├── index.ts
│   │   ├── dateUtil.ts
│   │   └── uuidUtil.ts
│   │
│   ├── config/                  # Environment config ($config alias)
│   │   ├── secretPrivate.ts     # Private env vars (PRIVATE_*)
│   │   └── secretPublic.ts      # Public env vars (PUBLIC_*)
│   │
│   ├── lang/                    # Internationalization ($lang alias)
│   │   ├── lang.ts              # t._() translation helper
│   │   ├── langType.ts          # ILang interface
│   │   └── locales/
│   │       └── en.lang.ts       # English translations
│   │
│   ├── assets/
│   ├── css/
│   ├── app.d.ts
│   └── app.html
│
├── drizzle/                     # Drizzle migrations output
├── svelte.config.js             # SvelteKit config + aliases
├── vite.config.ts
├── tsconfig.json
├── drizzle.config.ts
├── Dockerfile
├── deploy.sh
└── package.json
```

---

## 3. Architecture & Patterns

### 3.1 Custom Router System (NOT SvelteKit file-routing for API)

The project uses a **custom route provider** (`src/core/provider/routeProvider.ts`) instead of SvelteKit's file-based routing for API endpoints.

**Flow:**
```
HTTP Request
  → src/routes/api/[...path]/+server.ts
    → src/core/bootstrap/app.ts (handlers: GET, POST, PUT, DELETE)
      → routeProvider.handleRequest()
        → matches custom Route definitions
          → runs middleware chain
          → runs policy checks (RBAC)
          → runs handler
```

### 3.2 Route Definition (`src/core/routes/api.ts`)

```ts
Route.get('path', handler)
Route.post('path', handler)
Route.put('path', handler)
Route.delete('path', handler)
Route.group('prefix', (group) => { /* subgroup routes */ })

// Chaining:
group.post('login', handler).middleware('auth').policy('permission-name')
```

Route patterns support:
- Dynamic params: `{param}` or `:param` → `event.params.param`

### 3.3 Middleware

Middleware is registered globally via `registerMiddleware(name, fn)`. Applied per-route via `.middleware('name')`.

**Existing middleware:**
| Name | File | Purpose |
|------|------|---------|
| `auth` | `authMiddleware.ts` | Validates JWT cookie, sets `event.user_id` |
| `hash` | `hashMiddleware.ts` | Decodes Hashids params to numeric IDs |

### 3.4 Policy/RBAC

Policies are checked via `authProvider.ts`. Uses `user_has_roles → role_has_permissions → permissions` chain.

Applied per-route via `.policy('permission.name')`. Returns 403 if user lacks permission.

### 3.5 Controller → Repository Pattern

```
Controller (thin, delegates)
  → Repository (business logic, db queries)
    → Resource (data transformation)
```

Controllers are `export const` functions that delegate to repositories. Repositories are `export const` async functions.

### 3.6 Response Helpers

All from `src/core/helper/response.ts`:
| Function | Purpose |
|----------|---------|
| `resSuccess(msg, status)` | Success message |
| `resSuccessData(data, msg, status)` | Success with data |
| `resError(msg, errors, status)` | Error response |
| `resPaginate(data, meta, msg)` | Paginated response |
| `resCatch(error)` | Catch-block handler |
| `resValidate(error)` | Zod validation error |

**Standard response format:**
```json
{
  "message": "...",
  "data": { ... },
  "errors": { ... },
  "meta": { "total": 0, "page": 1, "limit": 10, "total_page": 0 }
}
```

---

## 4. Database Schema

All tables use `bigserial` PKs and Drizzle ORM with relations.

### Tables:

| Table | Columns | Relations |
|-------|---------|-----------|
| `users` | id, email, username, password, created_at, updated_at, deleted_at | → auths, user_details, user_has_roles |
| `user_details` | id, user_id, first_name, last_name, created_at, updated_at | → users |
| `auths` | id, user_id, token, revoke, ip, user_agent, created_at, updated_at | → users |
| `roles` | id, name, notes, created_at, updated_at, deleted_at | → user_has_roles, role_has_permissions |
| `permissions` | id, name, notes, created_at, updated_at, deleted_at | → role_has_permissions |
| `role_has_permissions` | role_id, permission_id (composite PK) | → roles, permissions |
| `user_has_roles` | user_id, role_id (composite PK) | → users, roles |

### Key relationships:
- User M:N Role via `user_has_roles`
- Role M:N Permission via `role_has_permissions`
- All junction tables use composite primary keys
- `deleted_at` used for soft-delete on users, roles, permissions

### Drizzle client:
```ts
// src/db/index.ts
export const db = drizzle({
  client: postgres(DB_URL),
  schema,  // enables db.query.* for relational queries
  logger: customDrizzleLogger,  // only in local env
})
```

---

## 5. API Endpoints

| Method | Path | Auth | Policy | Controller | Description |
|--------|------|------|--------|------------|-------------|
| GET | `/api/openapi.json` | - | - | `docController.openapi` | OpenAPI spec (local only) |
| POST | `/api/auth/login` | - | - | `authController.login` | Login, sets cookie |
| DELETE | `/api/auth/logout` | auth | - | `authController.logout` | Revoke token + clear cookie |
| GET | `/api/auth/user` | auth | - | `authController.user` | Current user info |
| GET | `/api/policy/role` | - | - | `policyController.roleList` | List roles with permissions |
| GET | `/api/policy/permission` | - | - | `policyController.permissionList` | List permissions |
| POST | `/api/policy/permission` | - | - | `policyController.permissionStore` | Create permission |
| DELETE | `/api/policy/permission/:id` | - | - | `policyController.permissionDestroy` | Delete permission (soft) |
| GET | `/api/guest/ping` | - | - | `guestController.ping` | Health check |

---

## 6. Libraries & Utilities

### Libraries (`src/lib/` — `$lib` alias):

| File | Exports | Purpose |
|------|---------|---------|
| `axiosLib.ts` | `headerAxios`, `throwAxios`, `createQueryStr`, `instance` | Axios instance + URLSearchParams query builder + error handler |
| `hashLib.ts` | `generate`, `verify`, `encodeId`, `decodeId` | bcrypt hashing + Hashids encoding |
| `jwtLib.ts` | `create`, `verify` | JWT sign/verify with APP_SECRET |
| `loggerLib.ts` | `fileLogger`, `consoleLogger`, `customDrizzleLogger` | Winston logging |
| `zodLib.ts` | `create` (z), `type` (ZodType), `ZodError`, `validate`, `infer` | Zod with i18n validation messages |
| `tanstackUtil.ts` | `useQuery`, `useMutation`, `queryClient` | TanStack Query wrappers with global defaults (refetchOnWindowFocus: false, retry: false, staleTime: 15m) |

### Utilities (`src/utils/` — `$utils` alias):

| File | Exports | Purpose |
|------|---------|---------|
| `dateUtil.ts` | `now`, `formatByDate`, `formatByStr` | Date formatting |
| `uuidUtil.ts` | `create`, `verify` | UUID v4 generation & validation |

---

## 7. Configuration & Environment

### Path Aliases (from `svelte.config.js`):

| Alias | Path |
|-------|------|
| `$api` | `src/api` |
| `$assets` | `src/assets` |
| `$css` | `src/css` |
| `$core` | `src/core` |
| `$lang` | `src/lang` |
| `$config` | `src/config` |
| `$utils` | `src/utils` |
| `$db` | `src/db` |
| `$lib` | `src/lib` (SvelteKit built-in) |

### Environment Variables (.env):

| Variable | Example | Scope |
|----------|---------|-------|
| `PRIVATE_APP_ENV` | `local` | Private |
| `PRIVATE_APP_LOCALE` | `en` | Private |
| `PRIVATE_APP_SECRET` | `secret` | Private |
| `PRIVATE_APP_JWT_DURATION` | `1d` | Private |
| `PRIVATE_DB_URL` | `postgresql://...` | Private |
| `PUBLIC_API_URL` | `http://localhost:8000` | Public |

Private config: `$config/secretPrivate` (from `$env/dynamic/private`)
Public config: `$config/secretPublic` (from `$env/dynamic/public`)

---

## 8. Internationalization

Custom i18n system at `src/lang/`:
- `t._('key')` → returns translated string
- `t._('key', { arg: 'value' })` → replaces `:arg` in string
- Currently only `en` locale exists
- `PRIVATE_APP_LOCALE` / `PUBLIC_APP_LOCALE` controls active language

---

## 9. Code Conventions

- **Controllers:** `export const` functions that delegate to repositories. For multiple methods on same resource, use nested object (e.g. `export const permission = { list, store, destroy }`). Barrel via `src/core/controllers/index.ts`.
- **Repositories:** `export const repositoryName = async (event: ApiEvent) => { ... }`; **1 file per API endpoint** with specific name (`roleListRepository`, `permissionStoreRepository`). Barrel via `index.ts` per subfolder.
- **Resources:** `export const single()` dan `export const collection()`, bukan class. Setiap field `id` wajib di-encode dengan `hashLib.encodeId()`. Barrel via `index.ts` per subfolder.
- **API hooks:** `src/api/` berisi wrapper TanStack Query per endpoint. Naming: `{method}{Name}` (getUser, postLogin, deleteLogout, dll). Barrel per subfolder. Query function menerima `options?` untuk override default.
- **Request schemas:** Zod schemas in `src/core/request/`, barrel via `index.ts` per subfolder.
- **Middleware:** `export const middlewareName = async (event) => { ... }` + `registerMiddleware('name', fn)`
- **Imports:** Use path aliases (`$core/`, `$db/`, `$lib/`, `$config/`, etc.) or relative imports within `src/core/`.
- **Async handlers:** Return `Response` objects via helper functions.
- **TypeScript:** Strict mode, `ApiEvent` type for request events.
- **Formatting:** Prettier with Svelte + Tailwind plugins.
- **Naming:** PascalCase for classes, camelCase for functions/variables, snake_case for DB columns.
- **OpenAPI docs:** Inline `@openapi` JSDoc tag in controller files, compact YAML format.
- **Barrel pattern:** Each subfolder exports its own `index.ts`. No parent-level barrel to avoid ambiguity.

---

## 10. NPM Scripts

| Script | Command |
|--------|---------|
| `dev` | `vite dev --host` (port 3000) |
| `build` | Generate OpenAPI + `vite build` |
| `preview` | `vite preview --host` (port 8080) |
| `check` | `svelte-kit sync && svelte-check` |
| `lint` | `prettier --check .` |
| `format` | `prettier --write .` |
| `db:generate` | `drizzle-kit generate` |
| `db:migrate` | `drizzle-kit migrate` |
| `db:pull` | `drizzle-kit pull` |
| `db:push` | `drizzle-kit push` |
| `db:seed` | Run seeder script |

---

## 11. Deployment

- **Docker:** Multi-stage build with `oven/bun:canary-alpine`
- **Build output:** `build/` directory
- **Port:** 8000 (internal), configurable via `PORT` env var
- **Entry:** `bun build/index.js`
