# JobPortal

A polished React job portal built with React 19, React Router, Redux Toolkit, Axios and JSON Server.

## Features

- Responsive modern UI
- Job search across title/company/location/category
- Category and job-type filters
- Salary sorting
- Job details page
- Register/login flow for the demo backend
- Protected job posting/editing/saved jobs
- Save/remove favorites with Redux persistence
- Create, edit and delete job listings
- Loading and backend error states
- Mobile responsive layout

## Run the project

### Terminal 1 — backend

```bash
cd job_portal_backend
npm install
npm start
```

### Terminal 2 — frontend

```bash
cd job_portal
npm install
npm run dev
```

Open the Vite URL shown in the terminal, usually http://localhost:5173.

## Demo login

Email: `yashwanth@gmail.com`
Password: `123456`

## Important

This project is intentionally a frontend + JSON Server hackathon/demo architecture.
The login is not production authentication because passwords are stored in `db.json`.
For deployment, use a real backend (Node/Express, Java/Spring Boot, Django, etc.) with MySQL/PostgreSQL and hashed passwords.
