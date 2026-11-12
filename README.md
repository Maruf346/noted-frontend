# Noted frontend

React, Vite, and Tailwind frontend for the secure note-taking interview task.

## Run locally

```bash
npm install
copy .env.example .env
npm run dev
```

The app uses an in-browser mock API by default. Sign in with the prefilled demo credentials. Data mutations persist in `localStorage`.

## Connect the backend

Set these environment variables locally and in Vercel:

```env
VITE_API_URL=http://localhost:8000/api
VITE_USE_MOCK_API=false
```

The API integration is isolated in `src/api/client.js`.

## Commands

- `npm run dev` - local development
- `npm run build` - production build
- `npm run lint` - static checks
- `npm run preview` - preview the production bundle

## Deploy

Import this folder/repository in Vercel, add the two environment variables above, and deploy. `vercel.json` handles client-side route rewrites.
