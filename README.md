# FleetFlow — Smart Vehicle Fleet Management System

A full-stack MERN project for managing fleet vehicles, monitoring operational status, and recording maintenance dates. It follows the ICTAK reference guide's separation of React client, Express API, and MongoDB persistence.

## Features
- Register/login using JWT authentication; passwords are hashed with bcrypt.
- Create, read, update, and delete vehicle records owned by the signed-in user.
- Search by vehicle number, driver, or type; filter by status and vehicle type.
- Dashboard cards for total vehicles, active vehicles, maintenance vehicles, and overdue service.
- Responsive interface, form validation, loading/error/empty states.
- Service date tracking and conditional status badges.

## Technology
React + Vite, React Router, plain CSS, Node.js, Express, Mongoose, MongoDB Atlas, JWT, bcryptjs.

## Prerequisites
Node.js LTS and npm; a MongoDB Atlas database (or local MongoDB); Git is recommended.

## Setup
1. Create a MongoDB Atlas database and copy its connection string.
2. In a terminal at the project root run `npm run install:all` (or run `npm install` separately in `server` and `client`).
3. Copy `server/.env.example` to `server/.env` and set `MONGODB_URI` and a long random `JWT_SECRET`.
4. Start both apps from the root with `npm run dev`.
5. Open the Vite URL printed in the terminal (usually `http://localhost:5173`). API health check: `http://localhost:5000/api/health`.

## Environment variables
Server (`server/.env`):
- `PORT=5000`
- `MONGODB_URI=your-mongodb-connection-string`
- `JWT_SECRET=replace-with-a-long-random-secret`
- `CLIENT_URL=http://localhost:5173`

Client (`client/.env`, optional):
- `VITE_API_URL=http://localhost:5000/api`

Never commit real `.env` files or secrets. `.env.example` contains variable names and safe placeholders only.

## API contract
| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/register` | Create account |
| POST | `/api/auth/login` | Authenticate and return token |
| GET | `/api/vehicles` | List own vehicles; supports `search`, `status`, `type`, `page`, `limit` |
| POST | `/api/vehicles` | Create vehicle |
| GET | `/api/vehicles/:id` | Get one owned vehicle |
| PUT | `/api/vehicles/:id` | Update an owned vehicle |
| DELETE | `/api/vehicles/:id` | Delete an owned vehicle |
| GET | `/api/vehicles/stats/summary` | Dashboard counts |

All vehicle endpoints require `Authorization: Bearer <token>`. Responses use JSON. Invalid input returns 400, unauthenticated requests 401, inaccessible records 404, duplicate vehicle numbers 409, and unexpected errors 500.

## Project structure
```
client/                 React app
  src/components/       reusable navigation and UI
  src/pages/             login, register, dashboard, vehicle form
  src/services/api.js    central API client
server/src/
  config/                 database connection
  controllers/            request/business logic
  middleware/             authentication and error handling
  models/                 Mongoose schemas
  routes/                 API route mapping
```

## Test checklist
- Register and log in with valid details; reject invalid input.
- Create a vehicle, refresh, and confirm it persists.
- Edit status and service date; confirm dashboard cards update.
- Search and filter; confirm no-match state appears.
- Delete a record and confirm it disappears.
- Call vehicle endpoints without a token and expect 401.
- Confirm one user cannot read or edit another user's vehicle.
- Test on desktop and a narrow/mobile viewport.

## Deployment notes
Deploy the client as a static Vite site and the server as a Node web service. Set `VITE_API_URL` to the deployed API URL, and set server `MONGODB_URI`, `JWT_SECRET`, and `CLIENT_URL` in the host dashboard. Configure CORS for the exact frontend origin and use HTTPS. Test deep-link refresh and every core flow after deployment.

## Scope and limitations
This is an educational prototype, not a live vehicle telematics system. It does not ingest GPS data or automatically send maintenance alerts. Add automated tests, rate limiting, email verification, refresh-token strategy, audit logs, and production monitoring before real-world use.
