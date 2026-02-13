# Cow Catalog

A small Angular application demonstrating clean architecture, typed domain modeling,
and common catalog flows such as listing, filtering, creation, and detail views.

The project is intentionally scoped to focus on clarity, maintainability, and correct
domain behavior.

---

## Project Overview

Cow Catalog is a frontend-only Angular application that allows users to browse and manage
a simple catalog of cattle records.

## Live Demo

🔗 https://ravishsingh01.github.io/cow-catalog/


### Core Features
- Cow list with pagination
- Search and filtering with URL-based state
- Add new cow flow with validation
- Cow detail page with event timeline and summary metrics

**UI Library:** PrimeNG  
**Persistence:** Browser `localStorage` (no backend)

---

## Functional Coverage

### Cow List
- Displays:
  - Ear Tag (ID)
  - Sex (human-readable label)
  - Pen
  - Status
  - Last event date
- Client-side pagination
- Pagination state persisted in URL query parameters

### Search & Filter
- Case-insensitive search by ear tag
- Filter by status and pen
- Filters and pagination persist across refresh and navigation

### Add New Cow
- Accessible from the list page
- Reactive Form with validation:
  - Ear tag (required, unique)
  - Sex (required)
  - Pen (required)
  - Status (restricted to creation-safe values)
  - Weight (optional, validated range)
- New records are saved to `localStorage`
- List updates immediately after save

### Cow Detail View
- Displays cow identity and current state
- Daily weight gain shown only when sufficient historical data exists
- Event timeline rendered chronologically
- Last event date derived from event history

---

## Architecture & Design Decisions

### Separation of Concerns
- A dedicated service acts as the single source of truth for:
  - Data seeding
  - Persistence
  - Filtering and pagination
- Components are presentation-focused and subscribe to observable state

### State Management
- Service-based state with RxJS is used
- No global state library (NgRx) was introduced to avoid unnecessary complexity
- The approach is sufficient for the limited shared state and absence of a backend

### Persistence Strategy
- `localStorage` is used to persist data across reloads
- This keeps the application deterministic and easy to reason about

### Domain Rules
- Daily weight gain requires at least two weight records
- Terminal states (e.g. deceased) are represented as events rather than initial values

---

## Technology Stack

- Angular (CLI project)
- TypeScript
- PrimeNG
- RxJS
- Browser `localStorage`

---

## Setup & Run Locally

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm start
# or
ng serve
```

### Open in browser:
http://localhost:4200/


### Reset application state (optional)
To reset seeded data:

1. Open browser DevTools
2. Navigate to Application → Local Storage
3. Remove the following keys:
   - `cows`
   - `cows_version`

---

## Trade-offs
The following were intentionally not implemented to keep the project focused and
within a limited scope:

- Backend integration
- Edit/update cow flow
- UI for adding historical events
- Advanced state management (NgRx)
- Extensive UI customization

**Rationale:**
The emphasis is on correctness, readability, and maintainable structure rather than
feature completeness.

---

## Known Limitations & Future Improvements

### Known Limitations
- Event notes are partially string-based
- No automated tests included
- No authentication or multi-user considerations
- Accessibility and UX polish are minimal

### Future Improvements
- Structured event metadata instead of free-text notes
- Unit tests for filtering, pagination, and creation logic
- Backend integration with server-side paging
- Edit cow flow and event creation UI

## Key Files
- `cow.model.ts` — domain models
- `cows.data.ts` — mock data generator
- `cow.service.ts` — persistence, filtering, pagination
- `cow.constants.ts` — centralized labels and options
- `features/cows/` — list, create, and detail pages
- `shared/` — reusable components and helpers