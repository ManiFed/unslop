# Drop The Slop Talk

A satirical React + Vite site advocating for kinder language around AI-generated art.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run start
```

## Deploying on Railway

This project is configured for Railway as a static Vite app served with `vite preview`.

1. Create a new Railway project and connect this repository.
2. Railway will run:
   - **Build command:** `npm run build`
   - **Start command:** `npm run start`
3. Railway injects `PORT`; the start script binds to `0.0.0.0` and uses that port automatically.

You can also keep these settings in `railway.json` (already included in this repo).
