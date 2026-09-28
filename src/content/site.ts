/** Bump when the rules or setup instructions change, so generated files show how current they are. */
export const PLAYBOOK_VERSION = "2026-09-28";

// Server-only: Vercel exposes the production domain at build time. Pass it to client components as a prop.
export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "https://agent-playbook-alpha.vercel.app";
