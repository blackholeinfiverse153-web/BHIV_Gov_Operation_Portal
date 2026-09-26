# Current Architecture Map

Status: Department Registry Phase 1 is implemented as a source-backed configuration module; authentication, tenant context, and authorisation remain unimplemented.

## Current Structure

```text
src/
  App.tsx                    Root application component
  main.tsx                   React root, ErrorBoundary, Sentry
  routes/AppRouter.tsx       BrowserRouter and route declarations
  layouts/DashboardLayout.tsx Shared sidebar/header shell
  pages/                     Login, Dashboard, Citizens, Officers, Requests,
                             Projects, RequestDetails, Profile, Settings,
                             DistrictIntelligence, PlantIntelligence
  components/layout/         Header, Sidebar, MobileMenu
  components/dashboard/      KPI cards, recent requests, dashboard widgets
  components/common/         loaders, errors, CSV export, search, buttons
  components/ui/             Mostly empty placeholder UI files
  services/api.ts            Gov Ops HTTP client and CRUD types
  config/departmentRegistry.ts Typed organisation registry and Maharashtra V1 data
  components/common/DepartmentSelect.tsx Shared registry-driven department control
  services/districtIntelligence.ts AIAIC catalog/unified client
  services/aqiaicPlant.ts    AIAIC plant status/analysis client
  services/exports.ts        CSV export client
```

Runtime: React 19 + TypeScript + Vite + Tailwind CSS + React Router + Lucide React.
State management: component-local React state. No authentication, tenant, authorization, or server-state library is present.

## Core Platform Modules

Implemented or partially implemented:

- Dashboard: live Gov Ops dashboard counts and recent requests.
- Citizens: API-backed CRUD UI.
- Officers: API-backed CRUD UI.
- Requests: API-backed CRUD UI, status update UI, filtering, details route.
- Projects: API-backed CRUD UI.
- Profile and Settings: frontend-local preference/profile forms; not backed by a verified identity service.
- CSV export: API-backed export requests in `src/services/exports.ts`.

Not implemented:

- Platform users, teams, roles, and permissions.
- Complete canonical department data or verified sub-department/service hierarchy. See `docs/department_registry.md`.
- Workflows, tasks, outcomes, audit/replay, or feedback records.
- Tenant context, tenant switching, tenant-aware routing, or tenant-aware API headers.

## AIAIC Domain Modules

Implemented:

- District Intelligence page and client using the AIAIC `/catalog` and `/intelligence/unified` endpoints.
- Plant Intelligence page and client using `/aqiaic/plant/status` and `/aqiaic/plant/analyze`.
- Source/freshness/provenance presentation where returned by the intelligence response.

Not implemented in this repository:

- Canonical farmer, farm, crop planning, harvest, FPO, processing, logistics, buyer, consumer, or realisation modules.
- A Farm-to-Market route or verified API contract.
- Frontend AI recommendation decision/feedback workflow.

## Authentication Flow

The `/` route renders `Login.tsx`. Submitting the form navigates directly to `/dashboard` with no API call, token, session, identity lookup, expiry handling, or logout flow. All dashboard routes are currently reachable without a protected-route guard.

Required integration boundary: Hemanth must provide the real login, refresh/session, logout, current-user, tenant, and role response contracts before authentication code is written.

## API Flow

Gov Ops pages call typed functions in `src/services/api.ts`, which sends HTTP requests to `VITE_API_BASE_URL` and optionally includes `VITE_GOV_OPS_API_KEY`. Known paths are `/api/citizens`, `/api/officers`, `/api/requests`, `/api/projects`, `/api/dashboard`, and request status/update/delete paths.

AIAIC uses separate clients. `districtIntelligence.ts` calls the configured `VITE_AQIAIC_BASE_URL` for `/catalog` and `/intelligence/unified`. `aqiaicPlant.ts` calls the same configured AIAIC service for plant status and analysis. These clients do not currently carry tenant or Rudra context.

The service clients expose transport errors to pages. Pages generally implement loading/error/empty states, but response validation and a centralized error taxonomy are not yet present.

## Static, Mock, and Local-Only Data

- No operational mock dataset was found under `src/` during this inspection.
- Login identity, profile fields, and sidebar identity labels are static frontend values.
- Department selectors use the Maharashtra RTI Online-sourced V1 subset; request types and officer designations are user-entered because no authoritative catalogs are integrated.
- `RequestDetails.tsx` reads `sessionStorage` rather than using a verified request-detail API contract.
- Existing comments in the API/page files still describe former localStorage adapters and should be reconciled during documentation cleanup.
- Environment files contain configuration names only in `.env.example`; `.env` is local and must not be committed.

## Routing

Public route: `/`.

Dashboard-layout routes: `/dashboard`, `/citizens`, `/projects`, `/requests`, `/requests/:id`, `/officers`, `/profile`, `/settings`, and `/district-intelligence`.

There is no route guard, tenant segment, organisation context, permission-aware navigation, or Farm-to-Market route.

## Deployment and Tests

- Build: `tsc -b && vite build`.
- Dev/preview: Vite scripts in `package.json`.
- SPA deployment: `vercel.json` rewrites all paths to `index.html`.
- E2E: Playwright config expects a Vite server on port 5173; the current flow tests frontend navigation and request creation.
- Unit: Vitest covers a basic test and AQIAIC plant client behavior. One AQIAIC test is environment-sensitive because it expects localhost while the current `.env` can point to a remote service.
- Sentry is initialized in `main.tsx` with a committed DSN; deployment ownership and production configuration should be confirmed.

## Problems Found

1. Login is a frontend-only redirect, not authentication.
2. Routes and API calls are not protected by identity, tenant, role, or Rudra decisions.
3. No tenant model or tenant isolation boundary exists in frontend state or requests.
4. No canonical contracts exist for users, organisations, departments, permissions, workflows, tasks, audit, or AI feedback.
5. Request details use session storage instead of an API-backed detail contract.
6. Existing documentation overstates browser-storage architecture and pending API status compared with the current HTTP integration.
7. Farm-to-Table is not implemented in this repository and must not be presented as complete.
8. Tests do not cover authentication, authorization, tenant boundaries, workflow behavior, or API failure across all resources.

## Recommended Migration Approach

1. Obtain and verify Hemanth's authentication/session/current-user contract and Rudra authorization decision contract.
2. Add typed integration adapters and contexts for authentication, current tenant, organisation, role, and permissions; keep them backend-driven and fail closed.
3. Add protected-route and permission-aware navigation behavior without changing existing CRUD service contracts.
4. Add tenant context to the centralized API transport only after the backend specifies the header/token/claim mechanism.
5. Replace request-detail session storage with the verified API endpoint.
6. Add workflow/task/audit interfaces only against canonical backend contracts.
7. Consume Gauri/Harsha canonical intelligence outputs through services; do not recreate calculations in React.
8. Add contract-focused tests, then update deployment variables and CI/CD documentation with Kaushalendra.

## Department Registry Phase 1

The portal uses a typed, organisation-configurable department registry. The current Maharashtra configuration contains only department labels listed in the official RTI Online public-authority directory; unpublished hierarchy and codes remain empty. Request APIs continue to receive the existing department string. See `docs/department_registry.md` for provenance, unknown fields, and the backend contract needed before hierarchical request routing.

## Authentication Boundary

Smallest safe implementation after team confirmation: introduce an adapter/interface layer for authentication, tenant identity, and Rudra decisions; add a protected application shell that preserves the existing routes in a compatibility mode; and document explicit blocked states when those services are unavailable. Do not invent endpoint paths, token formats, tenant headers, roles, or permission payloads.
