// ============================================================
// Vercel serverless function — proxies ShelterLuv's /animals
// endpoint so SHELTERLUV_API_KEY never reaches the client. The
// React app calls this endpoint (fetch('/api/dogs')), never
// ShelterLuv directly. Runs in Vercel's Node runtime — reads the
// key via process.env, not import.meta.env (that's Vite's
// client-side mechanism and doesn't apply here). See
// DECISIONS.md for the security/caching/mapping reasoning.
// ============================================================

const SHELTERLUV_URL = 'https://new.shelterluv.com/api/v1/animals?status_type=publishable&limit=100'

// Distinct-keyword-count net score → the app's existing 5-point ENERGY_SCALE.
// A lossy approximation over free-text Description — ShelterLuv has no
// structured temperament field (confirmed unavailable via direct response
// from ShelterLuv support, not inferred from testing). See DECISIONS.md.
const HIGH_ENERGY_WORDS = [
  'playful', 'energetic', 'energy', 'zoomies', 'adventure', 'adventurous',
  'spunky', 'silly', 'goofy', 'mischievous', 'hyper', 'bouncy', 'romp',
  'excitable', 'spirited', 'sassy',
]
const LOW_ENERGY_WORDS = [
  'calm', 'gentle', 'mellow', 'relaxed', 'laid-back', 'chill', 'easygoing',
  'quiet', 'cuddly', 'snuggly', 'sleepy', 'lazy', 'low-key', 'nap',
  'patient', 'steady', 'docile',
]

function scoreEnergy(description) {
  const text = (description || '').toLowerCase()
  const highCount = HIGH_ENERGY_WORDS.filter(w => text.includes(w)).length
  const lowCount = LOW_ENERGY_WORDS.filter(w => text.includes(w)).length
  const net = highCount - lowCount
  if (net >= 2) return 'Spazz'
  if (net === 1) return 'Energetic'
  if (net === 0) return 'Mix'
  if (net === -1) return 'Chill'
  return 'Lazy bones'
}

function cleanBio(description) {
  return (description || '')
    .replace(/\n\s*(?:#\S+\s*)+$/, '') // trailing hashtag-only line(s)
    .replace(/\*{0,2}\[([^\]]+)\]\([^)]+\)\*{0,2}/g, '$1') // [text](url), optionally **bold**-wrapped → text
    .trim()
}

function hasAttribute(attributes, name, publish) {
  return (attributes || []).some(a => a.AttributeName === name && (publish === undefined || a.Publish === publish))
}

function mapAnimal(raw) {
  const attributes = raw.Attributes || []
  const isHousetrainedYes = hasAttribute(attributes, 'Housetrained', 'Yes')
  const ageCategory = raw.Age < 12 ? 'Puppy' : 'Adult'

  return {
    id: raw.ID,
    name: (raw.Name || '').trim(),
    breed: (raw.Breed || '').trim(),
    ageCategory,
    ageLabel: ageCategory,
    size: (raw.Size || '').split(' ')[0],
    photo: raw.CoverPhoto,
    goodWithKids: hasAttribute(attributes, 'Good with Kids', 'Yes'),
    houseTrained: isHousetrainedYes,
    energy: scoreEnergy(raw.Description),
    bio: cleanBio(raw.Description),
  }
}

export default async function handler(req, res) {
  const apiKey = process.env.SHELTERLUV_API_KEY
  if (!apiKey) {
    res.status(200).json({ available: false, dogs: [] })
    return
  }

  try {
    const response = await fetch(SHELTERLUV_URL, {
      headers: { Authorization: `Bearer ${apiKey}` },
    })
    if (!response.ok) {
      res.status(502).json({ available: false, dogs: [] })
      return
    }

    const data = await response.json()
    const dogs = (data.animals || [])
      .filter(a => a.Type === 'Dog')
      .filter(a => a.CoverPhoto && !a.CoverPhoto.includes('default_images/'))
      .map(mapAnimal)

    res.setHeader('Cache-Control', 's-maxage=1800')
    res.status(200).json({ available: true, dogs })
  } catch {
    res.status(502).json({ available: false, dogs: [] })
  }
}
