# Lux Lens CRM

A premium photography portfolio and lead-generation platform built with Next.js 15, TypeScript, Tailwind CSS, MongoDB, NextAuth, Mongoose, Nodemailer, Framer Motion, GSAP, React Hook Form, Zod, React Query, shadcn-style UI primitives, and Lucide icons.

## Features

- Luxury dark public site with hero video, portfolio, services, blog, testimonials, booking, contact, FAQ, newsletter, cookie consent, exit-intent lead capture, floating CTA, and SEO metadata.
- Integrated admin CRM for leads, customers, bookings, pipeline, tasks, notes, email activity, content management, media, analytics, GDPR, and settings.
- MongoDB/Mongoose data models for users, leads, customers, bookings, services, portfolio, blogs, media, testimonials, emails, settings, consent logs, tasks, and notes.
- API routes for lead capture, bookings, services, portfolio, media uploads, consent logging, GDPR export/delete, email sending, and newsletter intake.
- Email notifications through Nodemailer using Gmail app credentials from environment variables.
- Input validation, basic rate limiting, secure headers, JWT sessions, role-ready users, consent logging, and no hardcoded credentials.

## Local Setup

1. Install Node.js 20 or newer.
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env.local` and fill in the required values:

   ```bash
   MONGODB_URI=mongodb+srv://...
   GMAIL_USER=you@example.com
   GMAIL_APP_PASSWORD=your-gmail-app-password
   NEXTAUTH_SECRET=generate-a-long-random-secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. Seed sample content and the first admin user:

   ```bash
   ADMIN_EMAIL=admin@example.com ADMIN_PASSWORD="change-me" npm run seed
   ```

5. Start the app:

   ```bash
   npm run dev
   ```

The public website runs at `http://localhost:3000`. The CRM runs at `http://localhost:3000/admin`.

## Production Notes

- Use MongoDB Atlas for `MONGODB_URI`.
- Use a Gmail app password or replace `src/lib/email.ts` with your transactional email provider.
- Set a strong `NEXTAUTH_SECRET`.
- Replace remote sample images/videos with owned portfolio media before launch.
- For production media storage, connect `src/lib/storage.ts` to S3, Cloudinary, UploadThing, or another durable provider.

## Scripts

- `npm run dev` starts the development server.
- `npm run build` creates a production build.
- `npm run start` runs the production server.
- `npm run lint` runs ESLint.
- `npm run typecheck` runs TypeScript checks.
- `npm run seed` seeds sample CRM and CMS data.

## Structure

```text
src/
  app/            Next.js App Router pages and API routes
  components/     Public site, admin CRM, and UI components
  data/           Sample content and fallback data
  hooks/          Client hooks
  lib/            Auth, database, email, SEO, storage, validation, security
  models/         Mongoose models
  services/       Server-side domain services
  types/          Shared TypeScript types and NextAuth augmentation
scripts/          Database seed script
docs/             Deployment guide
```
