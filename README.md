[![API Docs](https://img.shields.io/badge/Swagger-UI-85EA2D)](https://nodejs-stork.onrender.com/api-docs)

## API Documentation
- **Swagger UI (prod):** https://nodejs-stork.onrender.com/api-docs  
- **Base URL (prod):** https://nodejs-stork.onrender.com

---

# Stork API (Node.js + MongoDB)

REST API for a pregnancy app: week tracking, diary, tasks, emotions. Supports authentication, avatar uploads, and convenient API documentation.

## Features
- **Auth:** JWT + Google OAuth (signin/signup, protected routes)
- **Users:** profile, partial updates (JSON or `multipart/form-data` with avatar)
- **Weeks:** public/private week info
- **Diaries:** CRUD for diary entries + emotions linking
- **Tasks:** planner; past dates are forbidden; `completed` status
- **Validation & Errors:** Joi + unified error responses
- **Uploads:** Cloudinary
- **Docs:** OpenAPI/Swagger (`/api-docs`)
- **Code quality:** ESLint, Prettier

## Tech stack
Node.js, Express, MongoDB/Mongoose, JWT, Google OAuth, Cloudinary, Swagger UI.

## Getting started

1. **Install dependencies**
   ```bash
   npm i

2. **Configure environment variables**
   
  cp .env.example .env
#PORT=
#MONGODB_USER=
#MONGODB_PASSWORD=
#MONGODB_URL=
#MONGODB_DB=
#CLOUD_NAME=
#API_KEY=
#API_SECRET=

3. **Run**
    # development mode
   ```bash
   npm run dev
# or
   # production start   
   ```bash
   npm start
  
