// ============================================================
// PostHog wrapper — thin on purpose. initAnalytics() is called
// once from main.jsx; every flow file imports track() instead of
// posthog-js directly, so a missing VITE_POSTHOG_KEY (fresh
// clone, no .env yet) no-ops safely instead of throwing. Every
// event carries a persistent app: 'fosters-paws-match' property
// (set via posthog.register() at init, not per-event) — this
// PostHog project will eventually hold other portfolio apps, so
// any new app sharing this account must register its own `app`
// value the same way, or dashboards blend unrelated projects
// together. See DECISIONS.md.
// ============================================================

import posthog from 'posthog-js'

const POSTHOG_KEY = import.meta.env.VITE_POSTHOG_KEY
const POSTHOG_HOST = 'https://us.i.posthog.com'

let ready = false

export function initAnalytics() {
  if (!POSTHOG_KEY) return
  posthog.init(POSTHOG_KEY, { api_host: POSTHOG_HOST })
  posthog.register({ app: 'fosters-paws-match' })
  ready = true
}

export function track(event, properties) {
  if (!ready) return
  posthog.capture(event, properties)
}
