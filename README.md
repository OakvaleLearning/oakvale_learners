# Oakvale Learning — Learners Portal

A sleek, animated marketing site + learner portal for Oakvale Learning's
certified caregiving programs (Adult & Elderly Care and Childcare & Early
Years). Includes authentication, an enrolment + Paystack payment flow, a
learner dashboard, and an admin dashboard to manage enrolments and payments.

## Tech stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS v4** (custom design tokens)
- **Motion** (`motion/react`) for animations
- **Prisma 6** + **PostgreSQL**
- **jose** (JWT sessions in httpOnly cookies) + **bcryptjs**
- **Paystack** for payments (test mode)

### Design

- Primary `#3229a2`, Accent `#d929dd`, Font `Roboto`.
- Tokens live in [`src/app/globals.css`](src/app/globals.css) (`@theme`).

## Getting started

### 1. Database

A local Postgres is expected at the URL in `.env`. During development this
project uses a Docker container:

```bash
docker run -d --name oakvale-postgres \
  -e POSTGRES_USER=oakvale -e POSTGRES_PASSWORD=oakvale_dev_pw -e POSTGRES_DB=oakvale \
  -p 5433:5432 postgres:18-alpine
```

(Start it again later with `docker start oakvale-postgres`.)

### 2. Environment

Copy `.env.example` to `.env` and fill in values. Key variables:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Postgres connection string |
| `AUTH_SECRET` | Secret for signing session JWTs (min 16 chars) |
| `PAYSTACK_SECRET_KEY` | Paystack **secret** key (`sk_test_…`) |
| `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` | Paystack **public** key (`pk_test_…`) |
| `NEXT_PUBLIC_APP_URL` | Base URL, e.g. `http://localhost:3000` |

### 3. Install, migrate, seed, run

```bash
npm install
npx prisma migrate dev      # apply schema
npm run seed                # create the admin user
npm run dev                 # http://localhost:3000
```

**Default admin:** `admin@oakvalelearning.com` / `admin12345`
(override with `ADMIN_EMAIL` / `ADMIN_PASSWORD` env vars when seeding).

## Payments (Paystack)

The app works **out of the box without keys** using a local *simulation*: when
`PAYSTACK_SECRET_KEY` is still the placeholder, the enrol flow skips Paystack
and marks the payment successful so you can test end-to-end.

To use real Paystack **test mode**:

1. Get test keys from the Paystack dashboard → Settings → API Keys.
2. Put them in `.env` (`sk_test_…` and `pk_test_…`).
3. (Optional) Set your webhook URL in Paystack to
   `https://YOUR_DOMAIN/api/payments/webhook`. The webhook verifies the
   `x-paystack-signature` and reconciles payments server-to-server.

Prices (per the copy):

| Track | Full | Split (50% deposit) |
| --- | --- | --- |
| Adult & Elderly Care (10 wks) | ₦80,000 | ₦40,000 |
| Childcare & Early Years (15 wks) | ₦100,000 | ₦50,000 |

Amounts are stored in **kobo** (NGN × 100) to match Paystack.

## Hero video

The homepage hero uses a background **video** with a dark overlay, falling back
to an image placeholder (`public/media/hero-poster.svg`). Drop `hero.mp4`
(and optionally `hero.webm`) into [`public/media/`](public/media/) to enable it.
See [`public/media/README.md`](public/media/README.md).

## Project structure

```
src/
  app/
    (site)/           Marketing pages (Navbar + Footer): home, about,
                      programs, employers, resources, contact
    (auth)/           login, signup
    (checkout)/       enroll/[track], payment/callback
    dashboard/        Learner dashboard (overview, payments, account)
    admin/            Admin dashboard (overview, enrolments, payments,
                      learners, leads) + server actions
    api/              auth, waitlist, contact, enroll, payments/*
  components/
    layout/           Navbar, Footer, Logo
    sections/         Hero, TrackBlocks, ProgramLanding, forms, etc.
    ui/               Button, Container, motion helpers, etc.
    dashboard/        DashboardShell, stat cards, admin controls
  content/site.ts     All copy + program/pricing data (single source of truth)
  lib/                prisma, auth, paystack, payments, validation, utils
prisma/
  schema.prisma       Data model
  seed.mjs            Admin seed
```

## Scripts

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run seed` — seed admin user
- `npx prisma studio` — inspect the database
