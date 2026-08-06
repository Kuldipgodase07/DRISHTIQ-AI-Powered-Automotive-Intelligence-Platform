# DrishtIQ - AI-Powered Automotive Intelligence Platform

An enterprise-grade automotive analytics and telemetry platform featuring AI-powered diagnostic workspace, warranty claims engine, supplier quality intelligence, and DrishtIQ Copilot.

## Project Structure

This project follows an enterprise monorepo workspace layout with clear separation between frontend application components and backend microservices:

```
automotive-insights-hub/
├── frontend/             # Dedicated React 19 + TanStack Start UI layer
│   ├── public/           # Static assets
│   ├── src/              # Source code (routes, components, hooks, lib, styles)
│   ├── components.json   # UI component registry configuration
│   ├── eslint.config.js  # Linter setup
│   ├── package.json      # Frontend app dependencies & scripts
│   ├── tsconfig.json     # TypeScript configuration
│   └── vite.config.ts    # Vite bundler & TanStack Start SSR setup
├── backend/              # Enterprise API & microservice boundary
│   └── README.md
├── package.json          # Root workspace runner
└── AGENTS.md             # Agent & developer guidelines
```

## Quick Start

### Development

To launch the frontend web application dev server from the workspace root:

```bash
npm run dev
```

Or target the frontend package directly:

```bash
cd frontend
npm run dev
```

### Production Build

To build the production bundle from the workspace root:

```bash
npm run build
```

### Linting & Formatting

```bash
npm run lint
npm run format
```
