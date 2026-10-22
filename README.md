# ANSH CLOUD — Starter Dashboard

A responsive Next.js dashboard starter for a GitHub-connected hosting platform.

## What works in this starter
- Responsive dashboard UI
- Sample project list and sample activity
- Search/filter projects
- Import a GitHub repository URL into the local demo list
- Project status cards and quick-start links
- Ready to import into GitHub and deploy as a dashboard on Vercel

## Important limitations
This ZIP is a **dashboard starter**, not a complete Vercel replacement yet. The repository import modal only adds a demo card in the browser. It does not authenticate with GitHub or build/deploy user code.

To enable real deployments, you still need to implement:
1. GitHub OAuth or a GitHub App, including secure callback handling and repository permissions.
2. A server-side deployment API integration or your own isolated build workers.
3. A database and user authentication.
4. Per-user authorization, rate limits, audit logs, and secure secret storage.
5. Isolation for builds and running applications. Never execute uploaded/user repository code directly inside the dashboard server.
6. Resource limits and abuse prevention.

Do not put GitHub client secrets, Supabase service-role keys, or deployment API tokens in client-side code or commit them to GitHub.

## Run locally
Install Node.js 18.17+ or 20+.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Deploy the dashboard on Vercel
1. Create a new GitHub repository and upload the contents of this ZIP (the files inside `ansh-cloud`, not the outer folder).
2. Open Vercel and choose **Add New → Project**.
3. Import the GitHub repository.
4. Keep the detected Next.js settings and click **Deploy**.

## Next steps for real GitHub integration
- Create a GitHub OAuth App or GitHub App in GitHub Developer settings.
- Add server-side API routes for OAuth start/callback.
- Store sessions securely in HTTP-only cookies.
- Store projects and deployments in a database.
- Keep all provider tokens in server-side environment variables.
- Add a backend worker/service to build projects and publish artifacts to isolated hosting.

## Environment variables
See `.env.example`. Only set variables when the matching integration has actually been implemented.
