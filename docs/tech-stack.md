# Technology Stack

---

## Overview
This document outlines the complete technology stack for the patient management system. The entire solution is built using **TypeScript** and runs in Docker containers.

---

## ⚠️ Important Development Guidelines
- All dependencies and their versions listed in this document must be respected during development
- If any developer updates, adds, or changes dependencies, this `tech_stack.md` file **MUST** be updated accordingly.

---

## Docker Configuration
- **Base Image**: node:22
- **Architecture**: Multi-container setup (Frontend, Backend API, PostgreSQL Database)

---

## Frontend Container

### Main Framework
- **Next.js v15** - https://nextjs.org/docs

### Code Quality & Linting
- **ESLint**: 
  - eslint-config-next (included with Next.js)
  - eslint-plugin-react - https://www.npmjs.com/package/eslint-plugin-react
  - eslint-plugin-react-hooks - https://www.npmjs.com/package/eslint-plugin-react-hooks
- **Prettier** - https://prettier.io/docs/

### HTTP & Data Management
- **HTTP Client**: Axios - https://axios-http.com/docs/intro
- **API Queries & Caching**: TanStack Query - https://tanstack.com/query/latest/docs/

### Form Handling & Validation
- **Form Management**: React Hook Form - https://react-hook-form.com/get-started
- **Schema Validation**: Zod - https://zod.dev

### UI & Styling
- **Component Styling**: Styled Components - https://styled-components.com/docs

---

## Backend API Container

### Main Framework
- **Express.js** - https://expressjs.com

### Request Validation
- **TypeBox** - https://github.com/sinclairzx81/typebox
- **AJV** - https://www.npmjs.com/package/ajv

### Database ORM
- **Drizzle ORM** (TypeScript ORM) - https://github.com/drizzle-team/drizzle-orm

---

## Database Container

### Database
- **PostgreSQL** - Standard Docker PostgreSQL image

---

## Development Language
- **TypeScript** - Used across the entire system (Frontend and Backend)