# Deployment Guide

## Vercel

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. Import the project in Vercel.
3. Add environment variables:
   - `MONGODB_URI`
   - `GMAIL_USER`
   - `GMAIL_APP_PASSWORD`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL`
   - optional analytics IDs
4. Set the framework preset to Next.js.
5. Deploy.

## MongoDB Atlas

1. Create a cluster.
2. Create an application database user.
3. Add your production IP range or Vercel network access policy.
4. Copy the SRV connection string into `MONGODB_URI`.

## Gmail App Password

1. Enable two-factor authentication for the sender account.
2. Create an app password.
3. Use that password as `GMAIL_APP_PASSWORD`.

## Docker

For local container development:

```bash
docker compose up --build
```

The app runs at `http://localhost:3000`; MongoDB runs in the `mongo` service.

## Media Storage

The included media route supports local uploads for development and Docker. For production, switch the storage adapter in `src/lib/storage.ts` to a durable provider such as Cloudinary, S3, or UploadThing.
