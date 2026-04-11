# Roadmap: Expanse

## Overview

Expanse will be built in four focused phases, moving from a skeletal Next.js application to a high-fidelity, premium expense tracker. We start with the foundation and storage, implement core CRUD logic, add financial metrics, and finally apply a "WOW" aesthetic with dark-mode glassmorphism.

## Phases

- [ ] **Phase 1: Foundation** - Initialize Next.js 15 and local storage logic.
- [ ] **Phase 2: Core CRUD** - Implement Add, List, and Delete operations.
- [ ] **Phase 3: Financial Metrics** - Add total spending calculation and dynamic updates.
- [ ] **Phase 4: Premium UI** - Apply Dark Mode, Glassmorphism, and animations.
- [ ] **Phase 5: AI Review** - Verify code quality using CodeRabbit-style practices.

## Phase Details

### Phase 1: Foundation
**Goal**: Environment setup and reliable data persistence.
**Depends on**: Nothing
**Requirements**: EXP-04
**Success Criteria**:
  1. Next.js 15 project is running locally.
  2. A "storage" utility can save and load test data to LocalStorage.
**Plans**: 1 plan

Plans:
- [ ] 01-01: Setup Next.js 15 and LocalStorage utility.

### Phase 2: Core CRUD
**Goal**: Functional expense management.
**Depends on**: Phase 1
**Requirements**: EXP-01, EXP-02, EXP-03, DASH-02
**Success Criteria**:
  1. User can add an expense via a form.
  2. Expense list updates instantly.
  3. Clicking "Delete" removes the item permanently.
**Plans**: 2 plans

Plans:
- [ ] 02-01: Build Expense Form and List components.
- [ ] 02-02: Implement Delete and Category labeling logic.

### Phase 3: Financial Metrics
**Goal**: Real-time spending insights.
**Depends on**: Phase 2
**Requirements**: DASH-01
**Success Criteria**:
  1. Header/Summary card displays the total sum of all expenses correctly.
  2. Total updates automatically when items are added or deleted.
**Plans**: 1 plan

Plans:
- [ ] 03-01: Implement Total Spending summary logic.

### Phase 4: Premium UI
**Goal**: High-fidelity "WOW" factor.
**Depends on**: Phase 3
**Requirements**: UI-01, UI-02, UI-03, EXP-05
**Success Criteria**:
  1. App uses a sleek Dark Theme by default.
  2. Background features subtle gradients/noise.
  3. Expense items are housed in "Glass" cards with blur effects.
**Plans**: 2 plans

Plans:
- [ ] 04-01: Apply Dark Theme and global layout styles.
- [ ] 04-02: Refine components with Glassmorphism and Lucide icons.

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/1 | Not started | - |
| 2. Core CRUD | 0/2 | Not started | - |
| 3. Metrics | 0/1 | Not started | - |
| 4. Premium UI | 0/2 | Not started | - |
| 5. AI Review | 0/1 | Not started | - |
