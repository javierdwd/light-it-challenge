# Patient Management System - Frontend

A Next.js 15 frontend application for managing patient records in a health clinic.

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Styled Components
- **HTTP Client**: Axios
- **Data Management**: TanStack Query
- **Forms**: React Hook Form + Zod
- **Code Quality**: ESLint + Prettier
- **Containerization**: Docker

## 📋 Prerequisites

- Docker & Docker Compose

## 🛠️ Setup

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd light-it-challenge
   ```

2. **Set up environment variables**

   ```bash
   cp frontend/.env.example frontend/.env
   # Edit frontend/.env with your configuration
   ```

3. **Start development server**
   ```bash
   docker compose up --build
   ```

## 🚀 Production

To run in production mode:

```bash
docker compose -f docker-compose.prod.yml up --build
```

## 🏗️ Project Structure

```
src/
├── app/                 # Next.js App Router pages
├── components/          # Reusable UI components
├── lib/                 # Utilities, providers, theme
└── types/               # TypeScript type definitions
└── hooks/               # Custom Hooks
└── queries/             # TanStack API queries
```

## 📝 Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js + React + React Hooks rules
- **Prettier**: Consistent code formatting
- **Styled Components**: CSS-in-JS with theme support

## 📄 License

This project is part of the Light-It Challenge.
