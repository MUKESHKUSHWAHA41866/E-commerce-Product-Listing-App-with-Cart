 # Ecommerce (Next.js + Prisma + MongoDB)

A minimal ecommerce demo built with **Next.js 15**, **React 19**, **TypeScript**, **Prisma**, **MongoDB**, **Zod**, and **React Query**.

---

## 🚀 Live Demo

- **App:**  https://e-commerce-product-listing-app-with.vercel.app/  

**Admin user email :**  mukesh@gmail.com

**password:** 123456

**user email id :**  mukesh1@gmail.com

**password :** 123456

- **API base URL:** (http://localhost:3000)

> Tip: deploy to **Vercel**. Add the same `.env` variables in your Vercel project → Settings → Environment Variables.

---

## 🧰 Tech Stack

- **Framework:** Next.js 15 (App Router, Server Routes)

- **UI:** React 19, Tailwind CSS 4, Framer Motion

- **Forms & Validation:** React Hook Form + Zod

- **Data:** Prisma ORM + MongoDB

- **State/Network:** TanStack Query (React Query), Zustand

- **Auth:** JWT (via `jose`)

- **Tooling:** TypeScript 5, ESLint 9 (Flat Config), Turbopack


---

## 🛠️ Setup Instructions

### 1) Clone & install

```bash

git clone <your-repo-url>

cd my-project    
            # go to the project root
npm i


2) Create .env in the project root

add .env file  

# Database (MongoDB Atlas connection string)
DATABASE_URL=""

# Node environment
NODE_ENV=development

# JWT secret (use a long, random string in real deployments)
JWT_SECRET="a-very-long-random-secret-string"

3) Generate Prisma client & push schema (first run)

# Prisma generates automatically via `postinstall`, but you can run:
npx prisma generate

# Create collections in MongoDB based on your Prisma schema
npx prisma db push

4) Run the dev server

npm run dev


API Endpoints

Base URL (local): http://localhost:3000

All endpoints are standard Next.js Route Handlers under /app/api/*.

### Auth

#### `POST /api/auth/signup`
Create a new user.

POST /api/auth/login

Categories

GET /api/categories

List categories.

POST /api/categories

Create a category.


Products

GET /api/products

List products (with pagination).

POST /api/products


GET /api/products/:id

Get one product by id.

PUT /api/products/:id

Update a product.


Cart

POST /api/cart/add

Add an item to the cart.
