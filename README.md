# Jebbs Deli Admin Dashboard

## Author
**Fulness Ojebiyi**

## Overview
Jebbs Deli Admin Dashboard is a comprehensive management interface for the Jebbs Deli food delivery platform. Built with TanStack Start, it provides administrators with powerful tools to manage orders, restaurants, users, and analytics. The dashboard features a modern, responsive design with real-time data visualization and efficient management tools.

## Tech Stack
- **Framework**: TanStack Start (Vite + Nitro)
- **Routing**: TanStack Router
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand
- **UI Components**: Shadcn UI (Radix UI)
- **Data Fetching**: TanStack Query
- **Data Visualization**: Chart.js, Recharts
- **Form Handling**: React Hook Form with Zod validation
- **File Upload**: React Dropzone
- **Icons**: Lucide React, React Icons
- **Type Safety**: TypeScript

## Prerequisites
- Node.js (v18 or higher)
- pnpm

## Local Development Setup

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd jebbs-deli-admin
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Environment Variables Setup**
   Create a `.env` file in the root directory with the following variables:
   ```
   # API Configuration
   VITE_API_BASE_URL=http://localhost:8080/api
   ```

4. **Run the development server**
   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3001](http://localhost:3001) in your browser

## Project Structure
```
jebbs-deli-admin/
├── src/
│   ├── app/          # TanStack Router file routes
│   ├── components/   # Reusable UI components
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility functions and configurations
│   ├── modules/      # Feature-specific modules
│   ├── providers/    # React context providers
│   ├── state-store/  # Zustand state management
│   ├── types/        # TypeScript type definitions
│   ├── utils/        # Helper functions and utilities
│   ├── router.tsx    # Router factory
├── public/           # Static assets
└── ...
```

## Key Features
- Comprehensive admin dashboard
- Real-time data visualization with Chart.js and Recharts
- Advanced data tables with TanStack Table
- File upload capabilities with React Dropzone
- Form handling with React Hook Form and Zod validation
- Responsive and modern UI design
- Dark mode support
- Type-safe development

## Scripts
- `pnpm dev` — start Vite dev server on port 3001
- `pnpm build` — production build
- `pnpm start` — run production server (`node .output/server/index.mjs`)
- `pnpm lint` — run ESLint

## License
Copyright (c) 2024 Fulness Ojebiyi

All rights reserved.
