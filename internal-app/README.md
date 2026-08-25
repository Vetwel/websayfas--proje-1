# VetWel Ekip Asistanı

Private employee portal planned for `internal.vetwel.us`.

## Architecture

- Framework: Next.js 16 App Router
- Hosting target: Vercel as a separate project
- Project root in Vercel: `internal-app`
- Authentication: Clerk
- Access model: Invite-only
- Public VetWel website remains separate and unchanged

## Security requirements

1. In Clerk Dashboard set **Access mode = Invite-only**.
2. Only VetWel admins should send employee invitations.
3. Never commit Clerk keys or future AI/API keys to GitHub.
4. Every private page must check `auth()` before reading or showing internal data.
5. The internal knowledge base and strong raw claims must never be exposed through public-site endpoints.
6. Search indexing is blocked with `app/robots.ts` and metadata robots rules.

## Required environment variables

Copy `.env.example` values into Vercel Project Settings → Environment Variables and replace placeholders with real Clerk values.

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
- `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard`

## Vercel setup

Create a separate Vercel project from the existing VetWel GitHub repository:

- Branch: `vetwel-rebuild`
- Root Directory: `internal-app`
- Framework Preset: Next.js

After the first successful deployment, attach custom domain:

`internal.vetwel.us`

Do not point the public `www.vetwel.us` project to this directory.

## Current modules

- `/dashboard` — employee home
- `/training` — product training catalog
- `/ask` — internal AI entry screen
- `/coach` — sales coaching
- `/quiz` — onboarding and assessment
- `/sign-in` — employee login

## Next development phase

1. Connect the verified VetWel product knowledge base.
2. Add the AI answer endpoint with internal-language rules.
3. Build the first complete product course (KidneyWel).
4. Add per-user training progress and quiz scores.
5. Add admin roles and employee management.
