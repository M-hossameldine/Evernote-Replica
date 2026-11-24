# Evernote Replica with React

#### Demo: deployed on Vercel (link coming with the first deploy)

## Table of Contents

- [About](#about)
- [Build Setup](#build_setup)
- [Deployment](#deployment)
- [Built Using](#built_using)
- [TODO](#todo)

## About <a name= "about"></a>

This project is a demo replica for the **Evernote**.  
Evernote is an app designed for note taking, organizing, task management, and archiving. It is developed by the Evernote Corporation,

## Build Setup <a name="build_setup"></a>

The app talks to the [evernote-replica-backend](https://github.com/M-hossameldine/evernote-replica-backend) REST API. Start it first (`npm run dev` there, port 4000).

```
  # install dependencies
  $ npm install

  # point the app at the API (defaults to http://localhost:4000/api/v1)
  $ cp .env.example .env

  # serve with hot reload at http://localhost:4600
  $ npm start

  # lint, type-check and build for production into build/
  $ npm run build

  # run the tests
  $ npm test
```

The backend must allow the app's origin: `CORS_ORIGINS=http://localhost:4600` in the backend's `.env`.

## Deployment <a name="deployment"></a>

The app is a static SPA hosted on [Vercel](https://vercel.com/). [`vercel.json`](vercel.json) sets the build (`npm run build` into `build/`) and rewrites every route to `index.html` so client-side routes work on reload.

1. Import the repository in Vercel. Pushes to `main` deploy to production; pull requests get preview deployments.
2. In Project Settings → Environment Variables, set `VITE_API_URL` to the API URL including `/api/v1`, e.g. `https://<your-api>.up.railway.app/api/v1`. It is read at build time, so redeploy after changing it.
3. On the backend, add the Vercel URL (and any custom domain) to `CORS_ORIGINS` and set `APP_URL` to it, so the API accepts the app's requests and password reset links point to it.

Sign-in relies on an httpOnly refresh cookie set by the API. When the app and the API are on different sites (`*.vercel.app` and `*.railway.app`), browsers treat it as a third-party cookie, and some (e.g. Safari) block it, which logs users out on every reload. Serving the API from a subdomain of the app's domain (e.g. `api.yourdomain.com`) avoids this; see the [backend README](https://github.com/M-hossameldine/evernote-replica-backend#deploying-to-railway).

## Built Using <a name="built_using"></a>

#### Client-Side

- [ReactJs](https://reactjs.org/) - Web FrameWork
- [React Router Dom v.6](https://www.npmjs.com/package/react-router-dom/v/6.0.0) DOM binding for [React Router](https://reactrouter.com/)
- [TypeScript](https://www.typescriptlang.org/) - Strongly typed programming language that build on JavaScript
- [Redux](https://redux.js.org/) - State Management Library
- [Redux-Toolkit](https://redux-toolkit.js.org/) - Efficient Redux development toolset, including RTK Query for the API
- [Tailwind](https://tailwindcss.com/) - Utility-First CSS Framework
- [Tailwind Elements](https://tailwind-elements.com/) - Bootstrap components recreated with Tailwind CSS.

#### Server-Side

- [evernote-replica-backend](https://github.com/M-hossameldine/evernote-replica-backend): Node.js, Express, MongoDB, JWT access tokens with rotating refresh-token cookies.

### Todo <a name="todo"></a>

- [ ] Google sign-in, password reset, tags and search.
- [ ] Add Arabic localization.
- [ ] Add RTL support.
