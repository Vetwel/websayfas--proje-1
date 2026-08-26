# VetWel Ekip Asistanı

Private employee portal planned for `internal.vetwel.us`.

## Architecture

- Framework: Next.js 16 App Router
- Cloudflare compatibility: vinext + Cloudflare Workers
- Hosting target: Cloudflare Workers Free plan
- Authentication: Clerk, invite-only
- AI: Cloudflare Workers AI binding
- AI billing goal: Free allocation only; no OpenAI API key
- Public VetWel website remains separate and unchanged

## Cost guardrails

1. No OpenAI API key is required or configured.
2. Workers AI uses the Cloudflare free allocation. If the daily free allocation is exhausted, AI requests should fail rather than create an OpenAI bill.
3. Do not upgrade the Cloudflare Workers account or enable paid AI models without explicit owner approval.
4. The employee portal should stay within the Workers Free plan limits while the team is small; monitor request/CPU usage after launch.
5. `internal.vetwel.us` is a subdomain of the existing domain and does not require buying a new domain.

## Security requirements

1. In Clerk Dashboard set **Access mode = Invite-only**.
2. Only VetWel admins should send employee invitations.
3. Never commit Clerk keys or private knowledge-base files to GitHub.
4. Every private page must check `auth()` before reading or showing internal data.
5. The internal knowledge base and strong raw claims must never be exposed through public-site endpoints or committed into this public repository.
6. Search indexing is blocked with `app/robots.ts` and metadata robots rules.
7. Public VetWel product pages may be used as read-only source context for the first AI version. Private training knowledge should later live in a private Cloudflare data store, not this public repository.

## Required secrets

The only required application secrets for the first version are Clerk credentials:

- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
- `NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard`

Cloudflare Workers AI is accessed through the `AI` binding in `wrangler.jsonc`; no OpenAI secret is used.

## Cloudflare configuration

Files:

- `vite.config.ts` — vinext + Cloudflare Vite plugin
- `wrangler.jsonc` — Worker configuration and Workers AI binding

The production worker name is `vetwel-internal-ai`.

Recommended setup:

1. Create/sign in to a Cloudflare account and stay on Workers Free.
2. Connect the GitHub repository or deploy with Wrangler.
3. Use branch `vetwel-rebuild` and project directory `internal-app`.
4. Add Clerk secrets in Cloudflare as encrypted secrets/build variables; never commit them.
5. Deploy first to the generated `*.workers.dev` preview URL.
6. After login and AI Q&A are verified, add custom domain `internal.vetwel.us`.

Do not move or replace the public `www.vetwel.us` website deployment.

## AI data behavior

The first zero-cost AI implementation:

- authenticates the employee with Clerk;
- detects the VetWel product/form mentioned in the question;
- fetches the corresponding public VetWel product-information page as read-only context;
- sends that context to Cloudflare Workers AI;
- instructs the model not to guess missing product/form/dose information;
- keeps strong drug/treatment claim language out of employee-facing answers.

Private/internal-only claims are intentionally **not** placed in this public GitHub repository. When we need richer private training data, store it behind authenticated Cloudflare storage rather than hard-coding it into source control.

## Current modules

- `/dashboard` — employee home
- `/training` — product training catalog
- `/ask` — authenticated Cloudflare Workers AI Q&A
- `/coach` — sales coaching
- `/quiz` — onboarding and assessment
- `/sign-in` — employee login

## Next development phase

1. Deploy to Cloudflare Workers Free and verify authentication.
2. Verify `/ask` against several product/form questions and watch daily Workers AI usage.
3. Build the first complete KidneyWel training course.
4. Add per-user training progress and quiz scores.
5. Add private Cloudflare-backed knowledge storage for internal-only training material.
6. Add admin roles and employee management.

<!-- Cloudflare rebuild trigger: 2026-08-26-2 -->
