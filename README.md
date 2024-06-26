# Expense Tracker
Modern full-stack single page application built using react, and hono server. This project was built following [this tutorial](https://www.youtube.com/watch?v=jXyTIQOfTTk) by Sam Meech-Ward (great guy btw 👓).

## Features
- Complete expense tracker app built from scratch using React, Nodejs and Hono
- 100% backend and frontend TypeScript with validation using Zod
- Hono Typescript RPC for type-safe HTTP requests
- User auth managed by Kinde Auth
- Tanstack Router, Query, and Form for the best UX and DX in a SPA.
- Drizzle ORM for all interactions with a SQL Database
- Hosted on render.com
- Clean, modern UI using tailwind & Shadcn/UI.

## Technologies
### Frontend
- React with Vite
- Tanstack Router - For client-side navigation and implementing authorized route
- Tanstack Query - For data fetching, mutations, and optimistic updates.
- Tanstack Form - Handling form submission and validation.
- Typescript, TailwindCSS, and shadcn/ui

### Backend
- Hono on NodeJs - For its simplicity and efficiency.
- Drizzle ORM - Better choice than Prisma
- PostgreSQL hosted on Neon
- Zod
- TypeScript (Of course🔥)

## Getting started
Add the environment variables. There will be a `.env.example` file for guidance.

```bash
pnpm i:dep
```
This is a custom script. Run at the **root** of the project. This will install all of the dependencies at the root, then `cd` into the client directory and install all of its dependencies.

## App structure
```bash
- client # React application using Vite
- server # Hono server using NodeJs
... # Other files
```