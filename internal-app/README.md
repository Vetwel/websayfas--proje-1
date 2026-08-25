# VetWel Ekip Asistanı

Private employee portal planned for `internal.vetwel.us`.

## Architecture

- Framework: Next.js 16 App Router
- Hosting target: Vercel as a separate project
- Project root in Vercel: `internal-app`
- Authentication: Clerk
- Access model: Invite-only
- AI: OpenAI Responses API + private Vector Store / File Search
- Public VetWel website remains separate and unchanged

## Security requirements

1. In Clerk Dashboard set **Access mode = Invite-only**.
2. Only VetWel admins should send employee invitations.
3. Never commit Clerk keys, OpenAI API keys, vector store IDs, or private knowledge-base files to GitHub.
4. Every private page must check `auth()` before reading or showing internal data.
5. The internal knowledge base and strong raw claims must never be exposed through public-site endpoints or committed into this public repository.
6. Search indexing is blocked with `app/robots.ts` and metadata robots rules.
7. The AI endpoint must use the private VetWel Vector Store as its product-information source and must not guess missing product/form/dose data.

## Required environment variables

Copy `.env.example` values into Vercel Project Settings → Environment Variables and replace placeholders with real values.

### Clerk

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
- `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard`

### OpenAI

- `OPENAI_API_KEY`
- `OPENAI_VECTOR_STORE_ID`
- `OPENAI_MODEL=gpt-5.6`

The OpenAI variables are server-side only. Do not prefix them with `NEXT_PUBLIC_`.

## Private knowledge-base setup

The source of truth is the current approved VetWel AI knowledge-base workbook. Do **not** commit that workbook into this repository.

Recommended ingestion flow:

1. Export/convert the approved workbook into a text-friendly private file such as Markdown or UTF-8 text.
2. Upload that file to the VetWel OpenAI project.
3. Attach it to a private Vector Store.
4. Set the Vector Store ID in Vercel as `OPENAI_VECTOR_STORE_ID`.
5. When the approved knowledge base changes, replace/re-ingest the private source file rather than hard-coding claims into the website repository.

The `/api/ask` route authenticates the employee with Clerk, searches the private Vector Store, and uses the Responses API to create a controlled answer. Product-specific information that is absent or marked as requiring verification must not be guessed.

## Vercel setup

Use a Vercel project separate from the public website deployment:

- Branch: `vetwel-rebuild`
- Root Directory: `internal-app`
- Framework Preset: Next.js

After the first successful deployment, attach the custom domain:

`internal.vetwel.us`

Do not point the public `www.vetwel.us` project to this directory.

## Current modules

- `/dashboard` — employee home
- `/training` — product training catalog
- `/ask` — authenticated AI Q&A connected to private Vector Store
- `/coach` — sales coaching
- `/quiz` — onboarding and assessment
- `/sign-in` — employee login

## Next development phase

1. Create the private OpenAI Vector Store and ingest the approved VetWel knowledge base.
2. Add the Vercel OpenAI environment variables and test `/ask`.
3. Build the first complete product course (KidneyWel).
4. Add per-user training progress and quiz scores.
5. Add admin roles and employee management.
