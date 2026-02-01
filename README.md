# Multi-Tab Dashboard with Routing

A professional React dashboard application with multiple tabs, shared filters, pagination, and API integration.

## 🚀 Tech Stack

- **React 18** - Hooks + Functional Components
- **TypeScript** - Type-safe JavaScript
- **Axios** - HTTP client for API calls
- **React Router v6** - URL-based routing
- **Vite** - Fast build tool and dev server

## 📁 Project Structure

```
src/
├── components/
│   ├── DashboardTabs/    # Tab navigation component
│   ├── SharedFilters/    # Shared filter component
│   ├── Pagination/        # Pagination component
│   ├── Loader/            # Loading spinner
│   ├── Layout/            # Layout wrapper
│   ├── Header/            # Header component
│   └── Footer/            # Footer component
├── pages/
│   ├── Dashboard/         # Main dashboard with routing
│   ├── DashboardList/     # List view for each tab
│   └── DetailView/        # Detail page for items
├── context/
│   └── FilterContext.tsx  # Shared filter state
├── services/
│   └── api.ts             # API service functions
├── types/
│   └── index.ts           # TypeScript definitions
└── App.tsx                # Root component
```

## 🛠️ Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:3000`

## 📋 Routing Structure

| Route | Description |
|-------|-------------|
| `/` | Redirects to `/dashboard/users` |
| `/dashboard/:tab` | Main dashboard (users, posts, comments, albums) |
| `/dashboard/:tab/:id` | Detail page for specific item |

### Tabs

- `/dashboard/users` - Users list
- `/dashboard/posts` - Posts list
- `/dashboard/comments` - Comments list
- `/dashboard/albums` - Albums list

## 🔄 State Flow

1. **Filter State**: Managed via React Context (`FilterContext`)
   - Shared across all tabs
   - Persists when switching tabs
   - Includes search and userId filters

2. **Routing**: URL-based navigation
   - Tabs controlled by URL params
   - Refresh preserves current tab
   - Back button works correctly

3. **Pagination**: 
   - 10 items per page
   - Resets on tab/filter change
   - Local state per route

4. **API Integration**:
   - Base URL: `https://jsonplaceholder.org`
   - Endpoints: `/users`, `/posts`, `/comments`, `/albums`
   - Error handling for invalid IDs (404)

## ✨ Features

- ✅ Multi-tab dashboard with URL routing
- ✅ Shared filters across all tabs
- ✅ Pagination (10 items per page)
- ✅ Detail view with back navigation
- ✅ Loading states and error handling
- ✅ Responsive design
- ✅ Professional dark theme with green accents

## 🎨 Theme

The application uses a dark theme with green gradient accents matching the u:Engage branding:
- Black background (`#000000`)
- Green primary color (`#00ff88`)
- Dark cards with subtle shadows

## 📦 Build

```bash
npm run build
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

