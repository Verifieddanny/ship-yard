# Shipyard — Frontend

The dashboard frontend for Shipyard, a CI/CD deployment pipeline. Built with Next.js 16, React 19, and Tailwind CSS v4.

## Pages

**Landing Page** — Developer-focused landing page with hero section, feature highlights, how-it-works steps, and CTA. Includes GitHub OAuth sign-in modal.

**Dashboard** — Overview of all connected projects with build status badges, last deployment time, and quick actions. Empty state for new users.

**New Project** — Split layout for connecting a GitHub repo. Left side: organization selector and repo browser with search. Right side: configuration form (branch, install command, build command, output directory, environment variables).

**Project Detail** — Individual project view with build history, deployment status, configuration settings, and rebuild option.

**Deployment Detail** — Terminal-style build log viewer with real-time streaming via Socket.io. Build metadata (commit, branch, author, duration) and deployed URL link.

**Settings** — User profile management (username, email).

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React
- **Real-time:** Socket.io Client (for build log streaming)

## Project Structure

```
app/
├── (landing)/
│   ├── layout.tsx               # Landing page layout with navbar + footer
│   └── page.tsx                 # Landing page
├── (dashboard)/
│   └── dashboard/
│       ├── layout.tsx           # Dashboard layout with sidebar + top bar
│       ├── page.tsx             # Projects overview
│       ├── new/
│       │   └── page.tsx         # New project setup
│       ├── projects/
│       │   └── [id]/
│       │       └── page.tsx     # Project detail (builds, settings)
│       ├── deployments/
│       │   └── [id]/
│       │       └── page.tsx     # Deployment detail (build logs)
│       └── settings/
│           └── page.tsx         # User profile settings

components/
├── auth/
│   └── auth-modal.tsx           # GitHub OAuth sign-in modal
├── landing/
│   ├── hero.tsx                 # Hero section with code snippet
│   ├── features.tsx             # Feature highlights grid
│   ├── steps.tsx                # How it works steps
│   └── cta.tsx                  # Call to action section
├── dashboard/
│   ├── sidebar.tsx              # Navigation sidebar
│   ├── sidebar-link.tsx         # Sidebar nav item
│   ├── top-bar.tsx              # Search bar + user avatar
│   ├── footer.tsx               # Dashboard footer
│   ├── components/
│   │   └── project-card.tsx     # Project card with status badge
│   ├── new/
│   │   ├── left-section.tsx     # Org selector + repo browser
│   │   ├── right-section.tsx    # Configuration form
│   │   ├── organization-select.tsx
│   │   ├── repo-item.tsx
│   │   ├── build-input.tsx
│   │   └── deployment-bar.tsx
│   ├── deployments/
│   │   ├── terminal-console.tsx # Build log terminal viewer
│   │   └── log-line.tsx         # Individual log line component
│   └── project/
│       ├── build-row.tsx        # Build history row
│       ├── config-input.tsx     # Editable config field
│       ├── notification-item.tsx
│       └── usage-metric.tsx
├── navbar.tsx                   # Landing page navbar
└── footer.tsx                   # Landing page footer
```

## Setup

### Prerequisites
- Node.js 20+
- Backend API running ([Shipyard Backend](https://github.com/Verifieddanny/cicd-engine))

### Install and Run

```bash
npm install
npm run dev
```

The app runs on `http://localhost:3000` by default.

### Environment Variables

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_WS_URL=http://localhost:8080
```

## Backend

This frontend connects to the [Shipyard Backend](https://github.com/Verifieddanny/cicd-engine) for all API operations and real-time build log streaming via WebSocket.

## License

MIT