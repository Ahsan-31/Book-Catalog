# 📚 Book Catalog App

A full-stack book catalog application built with **Next.js (App
Router)**, **TypeScript**, **PostgreSQL**, **Prisma ORM**, and
**NextAuth.js** for authentication.\
Users can **sign up, log in (email/password or Google)**, and manage
their personal book collection by adding, viewing, and deleting books.

---

## 🚀 Tech Stack

- **Frontend**: Next.js (App Router) + TypeScript + TailwindCSS
- **Backend**: Next.js API Routes
- **Authentication**: NextAuth.js (Email/Password, Google OAuth)
- **Database**: PostgreSQL (Neon / Supabase / ElephantSQL)
- **ORM**: Prisma
- **Deployment**: Vercel

---

## ✨ Features

- 🔐 User authentication with **NextAuth.js** (Email/Password &
  Google)
- 📖 Add, view, and delete books
- 🎨 Responsive, modern UI with TailwindCSS
- ⚡ Deployed on Vercel with environment variables

---

## ⚙️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/ahsan-31/book-catalog.git
cd book-catalog
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

Inside the project root, create a file called `.env.local` with the
following:

```env
# Database
DATABASE_URL=your_database_connection_url
DIRECT_URL=your_direct_database_connection_url

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

> ⚠️ Make sure you have a PostgreSQL database (via Neon, Supabase, or
> ElephantSQL).

### 4. Setup Prisma

```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Run the app locally

```bash
npm run dev
```

App will run on 👉 `http://localhost:3000`

---

## 🔑 Authentication Flow

- Users can **sign up** using email/password or Google account.\
- Passwords are securely hashed before being stored in the database.\
- Logged-in users can **view their books, add new books, and delete
  them**.\
- Users see their profile info (name/email/avatar) in the header.

---

## 📌 Deliverables

- [GitHub Repository](https://github.com/ahsan-31/book-catalog)\
- [Live Deployed Link (Vercel)](https://book-catalog-ahsan31.vercel.app/)

---
