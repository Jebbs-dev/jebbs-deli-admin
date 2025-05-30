# Jebbs Deli Admin Dashboard

## Author
**Fulness Ojebiyi**

## Overview
Jebbs Deli Admin Dashboard is a comprehensive management interface for the Jebbs Deli food delivery platform. Built with Next.js 14, it provides administrators with powerful tools to manage orders, restaurants, users, and analytics. The dashboard features a modern, responsive design with real-time data visualization and efficient management tools.

## Tech Stack
- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
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
- npm or yarn

## Local Development Setup

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd jebbs-deli-admin
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Variables Setup**
   Create a `.env.local` file in the root directory with the following variables:
   ```
   # API Configuration
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000 || https://your-production-domain.com

   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure
```
jebbs-deli-admin/
├── src/
│   ├── app/          # Next.js app directory and page components
│   ├── components/   # Reusable UI components
│   ├── hooks/        # Custom React hooks
│   ├── lib/          # Utility functions and configurations
│   ├── modules/      # Feature-specific modules
│   ├── providers/    # React context providers
│   ├── state-store/  # Zustand state management
│   ├── types/        # TypeScript type definitions
│   ├── utils/        # Helper functions and utilities
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

## Third-Party Libraries
- **@radix-ui/react-***: Accessible UI components
- **@tanstack/react-query**: Data fetching and caching
- **@tanstack/react-table**: Advanced table functionality
- **chart.js & react-chartjs-2**: Data visualization
- **recharts**: Additional charting capabilities
- **zustand**: State management
- **react-hook-form**: Form handling
- **zod**: Schema validation
- **react-dropzone**: File upload service
- **lucide-react**: Icon library
- **class-variance-authority**: Component styling utilities
- **tailwind-merge**: Tailwind CSS class merging
- **tailwindcss-animate**: Animation utilities

## Development Notes
- TypeScript is strictly enforced
- ESLint is configured for code quality
- Tailwind CSS is used with a custom configuration
- Modern ESLint configuration

## Deployment
The application can be deployed on Vercel or any other platform that supports Next.js applications. Make sure to:
1. Set up all environment variables in your deployment platform
2. Configure the UploadThing credentials for production
3. Update any API endpoints to production URLs

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
Copyright (c) 2024 Fulness Ojebiyi

All rights reserved.
