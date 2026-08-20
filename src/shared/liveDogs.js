// ============================================================
// Thin client wrapper around /api/dogs (see api/dogs.js). Any
// failure mode — 404 (no /api routes under plain `vite`), a
// network error, a non-2xx status, or an explicit
// available:false from the function itself — resolves to null,
// which the caller treats as "fall back to MOCK_DOGS." One
// fallback path covers all of those cases identically; no need
// to distinguish "key missing" from "function doesn't exist."
// ============================================================

export async function fetchLiveDogs() {
  try {
    const res = await fetch('/api/dogs')
    if (!res.ok) return null
    const data = await res.json()
    if (!data.available || !Array.isArray(data.dogs) || data.dogs.length === 0) return null
    return data.dogs
  } catch {
    return null
  }
}
