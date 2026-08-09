// ============================================================
// Shared mock dog data (stand-in for ShelterLuv /animals) and
// the energy scale both flows score against. Imported by
// GuidedMatch and SpiritDogQuiz — moved here once a second flow
// needed the same data (previously lived in GuidedMatch.jsx).
// ============================================================

export const ENERGY_SCALE = ['Lazy bones', 'Chill', 'Mix', 'Energetic', 'Spazz']

export function energyIcon(label) {
  return { 'Lazy bones': '🦥', Chill: '😌', Mix: '🎲', Energetic: '🔥', Spazz: '⚡' }[label] || '🐾'
}

export const MOCK_DOGS = [
  { id: 'd1', name: 'Biscuit', breed: 'Labrador Mix', age: 3, ageLabel: 'Adult', ageCategory: 'Adult', size: 'Large', energy: 'Energetic', goodWithKids: true, houseTrained: true, bio: 'A goofy, food-motivated boy who loves a long walk and a longer nap after.', emoji: '🐕' },
  { id: 'd2', name: 'Pepper', breed: 'Terrier Mix', age: 8, ageLabel: 'Senior', ageCategory: 'Adult', size: 'Small', energy: 'Chill', goodWithKids: true, houseTrained: true, bio: 'A calm senior gentleman who\'d rather supervise from the couch than run laps.', emoji: '🐩' },
  { id: 'd3', name: 'Duke', breed: 'Pit Mix', age: 4, ageLabel: 'Adult', ageCategory: 'Adult', size: 'Large', energy: 'Mix', goodWithKids: false, houseTrained: true, bio: 'Sweet and loyal one-on-one, does best in a home without young kids.', emoji: '🐕‍🦺' },
  { id: 'd4', name: 'Luna', breed: 'Hound Mix', age: 1, ageLabel: 'Young', ageCategory: 'Adult', size: 'Medium', energy: 'Spazz', goodWithKids: true, houseTrained: false, bio: 'A bouncy pup still learning her manners — needs patience and a yard to zoom in.', emoji: '🐶' },
  { id: 'd5', name: 'Cooper', breed: 'Shepherd Mix', age: 2, ageLabel: 'Adult', ageCategory: 'Adult', size: 'Large', energy: 'Energetic', goodWithKids: true, houseTrained: true, bio: 'Smart, athletic, and always up for a job — hiking, fetch, agility, you name it.', emoji: '🐕' },
  { id: 'd6', name: 'Daisy', breed: 'Chihuahua Mix', age: 5, ageLabel: 'Adult', ageCategory: 'Adult', size: 'Small', energy: 'Lazy bones', goodWithKids: false, houseTrained: true, bio: 'A tiny lap warmer who prefers quiet adult households.', emoji: '🐕' },
  { id: 'd7', name: 'Rocky', breed: 'Boxer Mix', age: 1, ageLabel: 'Young', ageCategory: 'Adult', size: 'Medium', energy: 'Spazz', goodWithKids: true, houseTrained: false, bio: 'All puppy energy, all the time. Loves kids almost as much as tennis balls.', emoji: '🐶' },
  { id: 'd8', name: 'Willow', breed: 'Retriever Mix', age: 9, ageLabel: 'Senior', ageCategory: 'Adult', size: 'Medium', energy: 'Chill', goodWithKids: true, houseTrained: true, bio: 'A gentle old soul looking for a soft bed and an easy routine.', emoji: '🐕' },
  { id: 'd9', name: 'Waffles', breed: 'Beagle Mix', age: 0.4, ageLabel: 'Puppy', ageCategory: 'Puppy', size: 'Small', energy: 'Energetic', goodWithKids: true, houseTrained: false, bio: 'A tiny troublemaker with big energy — still working on manners, already an expert at zoomies.', emoji: '🐶' },
  { id: 'd10', name: 'Pretzel', breed: 'Beagle Mix', age: 0.15, ageLabel: 'Puppy', ageCategory: 'Puppy', size: 'Small', energy: 'Energetic', goodWithKids: true, houseTrained: false, bio: "Waffles' littermate — just as wiggly, twice as food-motivated, and convinced every shoe in the house is a chew toy.", emoji: '🐶' },
]
