# u:Engage Dashboard Application

A modern, professional React dashboard application built with TypeScript, featuring multi-tab navigation, advanced filtering, pagination, and detailed item views. The application displays data from JSONPlaceholder API with a beautiful dark theme and green accent colors.

## 🚀 Tech Stack

### Core Technologies
- **React 18.2.0** - Modern UI library with hooks and functional components
- **TypeScript 5.2.2** - Type-safe JavaScript for better development experience
- **Vite 5.0.8** - Fast build tool and development server
- **React Router v6.20.0** - Client-side routing for single-page applications

### Additional Libraries
- **Axios 1.13.4** - HTTP client for API calls
- **@vercel/node 5.5.28** - Serverless functions for API proxying

### Development Tools
- **ESLint** - Code linting and quality checks
- **Prettier** - Code formatting
- **TypeScript ESLint** - TypeScript-specific linting rules

## 📁 Project Structure

```
UengageAssig/
├── api/                          # Vercel serverless functions (API proxy)
│   ├── users.ts                  # Users endpoint handler
│   ├── users/[id].ts             # Single user endpoint handler
│   ├── posts.ts                  # Posts endpoint handler
│   ├── posts/[id].ts             # Single post endpoint handler
│   ├── comments.ts               # Comments endpoint handler
│   ├── comments/[id].ts         # Single comment endpoint handler
│   ├── albums.ts                 # Albums endpoint handler
│   └── albums/[id].ts            # Single album endpoint handler
│
├── src/
│   ├── components/               # Reusable UI components
│   │   ├── DashboardTabs/       # Tab navigation component
│   │   │   ├── DashboardTabs.tsx
│   │   │   └── DashboardTabs.css
│   │   ├── SharedFilters/        # Search and filter inputs
│   │   │   ├── SharedFilters.tsx
│   │   │   └── SharedFilters.css
│   │   ├── Pagination/           # Pagination controls
│   │   │   ├── Pagination.tsx
│   │   │   └── Pagination.css
│   │   ├── Layout/               # Main layout wrapper
│   │   │   ├── Layout.tsx
│   │   │   └── Layout.css
│   │   ├── Header/               # Header component
│   │   │   ├── Header.tsx
│   │   │   └── Header.css
│   │   ├── Footer/               # Footer component
│   │   │   ├── Footer.tsx
│   │   │   └── Footer.css
│   │   ├── Loader/               # Loading spinner
│   │   │   ├── Loader.tsx
│   │   │   └── Loader.css
│   │   ├── SkeletonLoader/       # Skeleton loading state
│   │   │   ├── SkeletonLoader.tsx
│   │   │   └── SkeletonLoader.css
│   │   └── DetailSkeleton/       # Detail page skeleton
│   │       ├── DetailSkeleton.tsx
│   │       └── DetailSkeleton.css
│   │
│   ├── pages/                    # Page-level components
│   │   ├── Dashboard/            # Main dashboard container
│   │   │   ├── Dashboard.tsx
│   │   │   └── Dashboard.css
│   │   ├── DashboardList/        # List view for all tabs
│   │   │   ├── DashboardList.tsx
│   │   │   └── DashboardList.css
│   │   ├── DetailView/           # Detail page for items
│   │   │   ├── DetailView.tsx
│   │   │   └── DetailView.css
│   │   ├── Home/                 # Home page (unused)
│   │   │   ├── Home.tsx
│   │   │   └── Home.css
│   │   └── About/                # About page (unused)
│   │       ├── About.tsx
│   │       └── About.css
│   │
│   ├── context/                  # React Context providers
│   │   └── FilterContext.tsx     # Shared filter state management
│   │
│   ├── services/                 # API and utility services
│   │   ├── api.ts                # API service functions
│   │   └── cache.ts              # Caching utility
│   │
│   ├── types/                    # TypeScript type definitions
│   │   └── index.ts              # All type definitions
│   │
│   ├── hooks/                    # Custom React hooks (empty)
│   ├── utils/                    # Utility functions (empty)
│   │
│   ├── App.tsx                   # Root component with routing
│   ├── main.tsx                  # Application entry point
│   ├── index.css                 # Global styles and CSS variables
│   └── vite-env.d.ts             # Vite type definitions
│
├── dist/                         # Production build output
├── node_modules/                 # Dependencies
│
├── index.html                    # HTML entry point
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── tsconfig.node.json            # TypeScript config for Node.js
├── vite.config.ts                # Vite configuration
├── vercel.json                   # Vercel deployment configuration
└── README.md                     # This file
```

## 🛠️ Getting Started

### Prerequisites

- **Node.js** (v16 or higher recommended)
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory:
   ```bash
   cd UengageAssig
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   The application will automatically open at `http://localhost:3000`

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint

# Format code with Prettier
npm run format
```

## 🏗️ Application Architecture

### Component Hierarchy

```
App
└── FilterProvider (Context)
    └── Layout
        ├── Header
        ├── Main Content
        │   └── Dashboard
        │       ├── DashboardTabs
        │       └── Routes
        │           ├── DashboardList
        │           │   ├── SharedFilters
        │           │   ├── List Items
        │           │   └── Pagination
        │           └── DetailView
        └── Footer
```

### Data Flow

1. **User Interaction** → Component Event Handler
2. **State Update** → React State or Context Update
3. **URL Update** → React Router Navigation
4. **Component Re-render** → New Data Fetch (if needed)
5. **API Call** → Service Layer → Cache Check → API Request
6. **Response** → Update State → UI Update

## 🧭 Routing

### Route Structure

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Redirect | Automatically redirects to `/dashboard/users` |
| `/dashboard/:tab` | `DashboardList` | List view for the specified tab (users, posts, comments, albums) |
| `/dashboard/:tab/:id` | `DetailView` | Detail page for a specific item |

### Available Tabs

- **`/dashboard/users`** - Display list of users
- **`/dashboard/posts`** - Display list of posts with thumbnails
- **`/dashboard/comments`** - Display list of comments
- **`/dashboard/albums`** - Display list of albums

### URL Parameters

- **Query Parameters** (persisted in URL):
  - `search` - Search filter text
  - `userId` - Filter by user ID
  - `page` - Current page number (defaults to 1 if not specified)

### Example URLs

```
/dashboard/users?search=john&page=2
/dashboard/posts?userId=1
/dashboard/comments/5
/dashboard/users/10
```

## 🔄 State Management

### Filter Context (`FilterContext`)

The application uses React Context to manage shared filter state across all tabs.

**State Properties:**
- `search` - Search query string
- `userId` - User ID filter value

**Context Methods:**
- `updateFilters(filters)` - Update filter values
- `resetFilters()` - Clear all filters

**Features:**
- Filters persist when switching between tabs
- Filters are stored in URL query parameters
- Page resets to 1 when filters change





---

**Built with ❤️ for u:Engage**
