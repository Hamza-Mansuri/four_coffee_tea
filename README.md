This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Production source protection

`npm run build` uses Next.js production minification and explicitly disables browser source maps. It checks `public/` for environment files, private keys, source files, database dumps and symlinks, then checks the generated browser bundles for source maps and map references. A failed check stops deployment. Vercel is explicitly configured to use this guarded build command. Run `npm run test:security` to verify these guards.

Keep secrets in the separate backend's environment settings. The frontend only needs `NEXT_PUBLIC_API_URL`; every `NEXT_PUBLIC_` value is public. Copy `.env.example` to `.env.local` for development. Real `.env*` files and local Vercel metadata are ignored by Git. Never copy backend files or private credentials into `public/` or return them in API responses.

Access to deployment source and build logs is controlled by Vercel. Check those access controls in the project dashboard separately from browser source maps. Do not add the legacy `public` property to `vercel.json`: Vercel's current deployment schema no longer accepts it. Source protection on a new deployment cannot recall source files that were previously downloaded.

To restrict access to the complete original project, change GitHub **Settings → General → Danger Zone → Change repository visibility → Make private**, and confirm that Vercel still has access to the repository. Existing clones and downloads cannot be recalled.

These protections do not hide public HTML, CSS, JavaScript, fonts or images from visitors. Browser inspection, right-click and keyboard shortcuts remain available. This change is source-exposure hardening, not a complete authentication or payment-security audit.
