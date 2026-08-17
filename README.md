# JobPortal — Upgraded Hackathon Project

## Structure

- `job_portal/` — React frontend
- `job_portal_backend/` — JSON Server demo backend

## Quick start

Open two terminals.

Terminal 1:
```bash
cd job_portal_backend
npm install
npm start
```

Terminal 2:
```bash
cd job_portal
npm install
npm run dev
```

Then open the Vite URL, normally http://localhost:5173.

## Upgrades made

- Modern responsive UI and consistent design system
- Navbar works on every route instead of only the home page
- Better search/filter/sort experience
- Fixed inconsistent job type/category values
- Favorite jobs persist across refreshes
- Protected routes and improved registration/login validation
- Better loading/error/empty states
- Cleaner job cards and detailed job page
- Confirmation before deleting a job
- Removed starter Vite UI and unnecessary files
- Added proper README and clean demo data
- Backend/frontend are separated clearly

## Production upgrade path

For a real production deployment, replace JSON Server with an API backed by MySQL/PostgreSQL, use hashed passwords, JWT/session authentication, server-side validation and role-based authorization.
