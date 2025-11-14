# Lookly Proto Web

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Overview

Lookly Proto Web is a modern web application built using Next.js, TypeScript, and Tailwind CSS. It includes a structured API, reusable components, and a modular architecture to support scalable development.

### Key Features:

- **Next.js Framework**: Server-side rendering and static site generation.
- **TypeScript**: Strongly typed codebase for better maintainability.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Supabase Integration**: Backend services for authentication and database management.
- **Component-Based Architecture**: Reusable and modular components for scalability.

---

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js (v16 or higher)
- npm, yarn, pnpm, or bun (package managers)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/m4xx1k/lookly-proto-web.git
   cd lookly-proto-web
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

---

## Project Structure

### Key Directories:

- **`src/api`**: Contains API routes for server-side logic, including endpoints for job creation, image uploads, and user management.
- **`src/components`**: Reusable UI components such as buttons, inputs, and job-related widgets.
- **`src/hooks`**: Custom React hooks for shared logic, such as polling jobs or managing user state.
- **`src/lib`**: Utility functions and shared helpers.
- **`src/services`**: Service layer for interacting with APIs and managing business logic.
- **`src/supabase`**: Supabase integration for authentication, database operations, and user management.
- **`src/types`**: TypeScript type definitions for the database and application.
- **`src/app`**: Application entry point, including global styles, layouts, and pages.

### Architecture Overview

The application follows a modular architecture to ensure scalability and maintainability:

1. **API Layer**:

   - Located in `src/api`.
   - Handles server-side logic and integrates with Supabase for database operations.

2. **Component-Based Design**:

   - UI components are modular and reusable, located in `src/components`.
   - Organized by feature (e.g., `job-widget`, `auth`).

3. **Service Layer**:

   - Abstracts API calls and business logic.
   - Located in `src/services`.

4. **State Management**:

   - Custom hooks in `src/hooks` manage shared state and logic.

5. **Supabase Integration**:

   - Handles authentication, user management, and database operations.
   - Configuration is centralized in `src/supabase`.

6. **TypeScript**:
   - Strongly typed codebase ensures reliability and easier debugging.

---

## Environment Variables

This project uses environment variables to configure various aspects of the application. Below is a guide to setting up the required `.env` files:

### `.env.local`

This file is used for local development. Create a `.env.local` file in the root of your project and add the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Admin Configuration
NEXT_PUBLIC_ADMIN_EMAIL=admin@example.com

# Other Environment Variables
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

### `.env.production`

This file is used for production deployments. Ensure the values are updated to match your production environment:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-production-supabase-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-production-anon-key
NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY=your-production-service-role-key

# Admin Configuration
NEXT_PUBLIC_ADMIN_EMAIL=admin@yourdomain.com

# Other Environment Variables
NEXT_PUBLIC_API_BASE_URL=https://your-production-domain.com/api
```

### Notes

- Never commit `.env` files to version control. Add `.env*` to your `.gitignore` file.
- Replace placeholder values (e.g., `your-supabase-url`) with actual values from your Supabase project or other services.

---

## Developer Notes

### Key Considerations:

1. **Supabase Configuration**:

   - Ensure the `NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY` is kept secure and not exposed in the client-side code.

2. **API Endpoints**:

   - All API routes are located in `src/api`. Follow the existing patterns when adding new endpoints.

3. **Component Development**:

   - Reuse existing components where possible.
   - Follow the folder structure and naming conventions.

4. **State Management**:

   - Use custom hooks for shared logic.
   - Avoid adding global state unless necessary.

5. **Styling**:

   - Use Tailwind CSS for consistent and rapid styling.

6. **TypeScript**:

   - Always define types for new components, hooks, and services.

7. **Testing**:

   - Add unit tests for critical components and services.

8. **Deployment**:
   - Use Vercel for production deployments.
   - Ensure `.env.production` is correctly configured before deploying.

---

For further questions or onboarding assistance, refer to the project documentation or contact the project maintainer.
