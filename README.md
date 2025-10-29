# 🧩 Strapi & NextJS test assignment

This project consists of two connected services:

- **Next.js Frontend** — user-facing forms for authentication.
- **Strapi Backend** — content management for form configuration.

The system dynamically renders login and signup forms based on configuration stored in Strapi.

## ⚙️ Prerequisites

Make sure you have installed:

- **Node.js** ≥ 18
- **npm** or **pnpm**
- **Strapi CLI** (optional, for local debugging)

## ⚠️ First-Time Setup

> [!WARNING]
> Before the first run, please follow all steps under **Setup Database** below.

## 🗄️ Setup Database

1. **Start the Strapi app**

```bash
npm run dev:strapi
```

2. **Access Strapi Admin Panel**

Available at http://localhost:1337/admin

3. **Create initial data**

- At least one Country
- At least one FormField
- At least one FormConfigAuth - Register, linked to the created Country and FormFields
- At least one FormConfigAuth - Login

> Notes:
> FormConfigAuth - Register defines the layout (fields) for the Signup form.
> FormConfigAuth - Login defines the layout (fields) for the Login form.

## 🚀 Run the Application

### Option 1 — Start both services together

```bash
npm run dev
```

### Option 2 — Start separately (for debugging)

**Terminal 1 — Next.js Frontend**

```bash
npm run dev:next
```

**Terminal 2 — Strapi Backend**

```bash
npm run dev:strapi
```

## 🧠 Overview

| Service            | Port   | Description                                         |
| ------------------ | ------ | --------------------------------------------------- |
| Next.js (frontend) | `3000` | Renders the auth forms and handles user interaction |
| Strapi (backend)   | `1337` | Manages content and form configurations             |

## 🧩 Folder Structure (Simplified)

```
/frontend      → Next.js app
/backend       → Strapi CMS
/shared        → Shared logic (if applicable)
```

## 🔒 Environment Variables

Both apps require .env configuration files.

```
# .env (next-app)
NEXT_PUBLIC_API_BASE_URL=http://localhost:1337/api
```

```
# .env (strapi-app)
HOST=0.0.0.0
PORT=1337
APP_KEYS=...
API_TOKEN_SALT=...
ADMIN_JWT_SECRET=...
```

🧱 Development Notes

- Form layouts and available fields are fully configurable in Strapi.
- The frontend automatically adapts to configuration changes.
- You can define different form layouts per country.
