# Summer Internship Project Report — FleetFlow

**ICT Academy of Kerala | Full Stack Application Development with ReactJS**  
**Project title:** FleetFlow — Smart Vehicle Fleet Management System  
**Team members:** [Enter team member names]  
**Institution:** [Enter institution name]  
**Date:** [Enter submission date]

## Executive Summary
FleetFlow is a full-stack web application designed to help a fleet manager maintain vehicle records, track operational status, and monitor service schedules from a single dashboard. The application uses React for the user interface, Node.js and Express for the REST API, and MongoDB with Mongoose for persistent storage. It supports account registration and login, vehicle CRUD operations, searching and filtering, dashboard statistics, and service-date warnings. The project demonstrates how a browser-based frontend communicates with a backend API rather than connecting directly to the database. It is an educational prototype; it does not include GPS telemetry or automatic notification delivery.

## Introduction
Vehicle information is often maintained across spreadsheets or separate records, making it harder to see the current state of a fleet or identify vehicles whose scheduled service date has passed. FleetFlow provides a central interface for storing vehicle numbers, vehicle types, assigned drivers, operational status, and service dates. The project applies the MERN stack to a practical record-management use case and follows a separated client/API/database architecture.

## Objectives
1. Build a responsive React interface with overview and vehicle form screens.
2. Implement a REST API using Express and Node.js for vehicle CRUD operations.
3. Persist users and vehicle records in MongoDB using Mongoose schemas.
4. Add authentication, hashed passwords, and server-side record ownership checks.
5. Provide search, filters, status badges, service-date tracking, and dashboard counts.
6. Practise Git-ready project organisation, input validation, error handling, and deployment preparation.

## Scope and Deliverables
**Included:** user registration/login, protected vehicle API, create/read/update/delete, search by vehicle number/driver/type, status/type filters, summary statistics, overdue service count, responsive layouts, environment-variable configuration, README and API contract.

**Not included in this prototype:** live GPS tracking, driver mobile application, automated email/SMS alerts, billing, fuel analytics, or multi-level administrator roles.

**Deliverables:** React client, Express API, Mongoose models, setup instructions, API endpoint list, test checklist, and this report.

## Methodology
The project was planned around a minimum viable product. The data model and API paths were defined first, followed by backend configuration, Mongoose schemas, route/controller separation, authentication middleware, and validation. The React client was then organised into reusable layout components, authentication pages, a dashboard, a vehicle form, and a central API service. Integration uses HTTP requests with JSON responses. Local and end-to-end checks should be performed against a MongoDB development database before deployment.

## Project Activities
1. **Requirement analysis:** selected Vehicle / Fleet Management from the supplied project-ideas handout and defined target users and MVP features.
2. **Architecture and setup:** separated the `client` and `server` folders; configured Vite, Express, environment variables, and MongoDB connection.
3. **Database design:** created User and Vehicle schemas with required fields, timestamps, allowed values, and a unique per-user vehicle-number index.
4. **Backend development:** implemented registration/login, JWT verification, vehicle CRUD endpoints, query filters, summary counts, validation, and central error handling.
5. **Frontend development:** built the navigation shell, authentication screens, statistics cards, searchable/filterable table, status badges, and create/edit form.
6. **Integration and verification:** connected the UI to the API through a shared API client and documented the manual test checklist in README.
7. **Deployment preparation:** documented environment variables, CORS configuration, HTTPS, client/API hosting, and post-deployment checks.

## Results & Findings
The implementation provides the core structure for a fleet-management dashboard. When configured with a reachable MongoDB instance, the dashboard can display stored vehicles, aggregate vehicle counts, filter records, and flag next-service dates that are in the past. Authentication middleware associates records with the signed-in account, while backend validation prevents reliance on browser-side validation alone.

**Evidence to add before submission:** screenshots of registration/login, dashboard with sample records, add/edit form, filtered results, and API health check. Record actual test results rather than claiming unperformed tests. Suggested result table:

| Test | Expected result | Actual result |
|---|---|---|
| Register with valid fields | Account created and token returned | [Record result] |
| Login with incorrect password | 401 with safe message | [Record result] |
| Create a valid vehicle | 201 and saved record appears | [Record result] |
| Submit missing required field | 400 validation message | [Record result] |
| Search/filter vehicles | Matching records only | [Record result] |
| Request vehicle API without token | 401 response | [Record result] |
| Access another user's vehicle | Record not disclosed | [Record result] |
| Delete a vehicle | Record removed | [Record result] |

## Conclusion
FleetFlow demonstrates the main layers of a MERN application: React user experience, an Express REST API, and MongoDB persistence. The prototype brings vehicle records and service scheduling into one interface and applies authentication, ownership checks, validation, and error handling. The next improvements would be automated tests, maintenance notifications, audit history, stronger session handling, and optional GPS integration. Final report claims and screenshots should reflect tests actually completed by the team.

## Appendix
- Source code: `client/` and `server/`.
- Setup and environment configuration: `README.md`.
- API contract and test checklist: `README.md`.
- Recommended documentation: React (`https://react.dev/`), Express (`https://expressjs.com/`), MongoDB (`https://www.mongodb.com/docs/`), Mongoose (`https://mongoosejs.com/docs/`), GitHub Docs (`https://docs.github.com/`).
