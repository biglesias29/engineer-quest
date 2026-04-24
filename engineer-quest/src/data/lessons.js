// ─── TRACKS ────────────────────────────────────────────────────────────────
// Each track is a discipline (Coding, EE, PCB)
// Each track has modules, each module has lessons

export const TRACKS = [
  {
    id: 'coding',
    name: 'Code Ops',
    icon: '⟨/⟩',
    color: 'cyan',
    colorHex: '#00f5ff',
    description: 'From variables to full-stack apps. Master the art of telling machines what to do.',
    totalLessons: 12,
    unlockedAt: 0, // always unlocked
  },
  {
    id: 'electrical',
    name: 'Volt Lab',
    icon: '⚡',
    color: 'amber',
    colorHex: '#ffb700',
    description: 'Ohm\'s law to op-amps. Understand the electrons powering every device.',
    totalLessons: 10,
    unlockedAt: 5, // unlock at level 5
  },
  {
    id: 'pcb',
    name: 'Board Forge',
    icon: '◈',
    color: 'purple',
    colorHex: '#bf5fff',
    description: 'Schematic to silkscreen. Design real PCBs that ship to fabrication.',
    totalLessons: 10,
    unlockedAt: 8, // unlock at level 8
  },
]

// ─── LESSONS ───────────────────────────────────────────────────────────────

export const LESSONS = [
  {
    id: 'js-variables',
    trackId: 'coding',
    title: 'Variables & Data Types',
    subtitle: 'The building blocks of every program',
    xpReward: 50,
    difficulty: 'Beginner',
    estimatedMinutes: 10,
    order: 1,
    tags: ['JavaScript', 'Fundamentals'],
    challengeId: 'js-variables-challenge',
  },
  {
    id: 'js-functions',
    trackId: 'coding',
    title: 'Functions & Scope',
    subtitle: 'Reusable blocks of logic',
    xpReward: 75,
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    order: 2,
    tags: ['JavaScript', 'Fundamentals'],
    challengeId: null,
    locked: true,
  },
  {
    id: 'js-arrays',
    trackId: 'coding',
    title: 'Arrays & Objects',
    subtitle: 'Storing collections of data',
    xpReward: 75,
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    order: 3,
    tags: ['JavaScript', 'Data Structures'],
    challengeId: null,
    locked: true,
  },
  {
    id: 'js-loops',
    trackId: 'coding',
    title: 'Loops & Iteration',
    subtitle: 'Repeat actions efficiently',
    xpReward: 100,
    difficulty: 'Beginner',
    estimatedMinutes: 20,
    order: 4,
    tags: ['JavaScript', 'Control Flow'],
    challengeId: null,
    locked: true,
  },
  // EE Lessons (locked)
  {
    id: 'ee-ohms-law',
    trackId: 'electrical',
    title: "Ohm's Law",
    subtitle: 'Voltage, current, and resistance',
    xpReward: 60,
    difficulty: 'Beginner',
    estimatedMinutes: 12,
    order: 1,
    tags: ['DC Circuits', 'Fundamentals'],
    challengeId: null,
    locked: true,
  },
  {
    id: 'ee-resistors',
    trackId: 'electrical',
    title: 'Resistor Networks',
    subtitle: 'Series and parallel circuits',
    xpReward: 80,
    difficulty: 'Beginner',
    estimatedMinutes: 15,
    order: 2,
    tags: ['DC Circuits', 'Components'],
    challengeId: null,
    locked: true,
  },
  // PCB Lessons (locked)
  {
    id: 'pcb-intro',
    trackId: 'pcb',
    title: 'PCB Fundamentals',
    subtitle: 'Layers, traces, and pads explained',
    xpReward: 70,
    difficulty: 'Beginner',
    estimatedMinutes: 12,
    order: 1,
    tags: ['PCB Design', 'Fundamentals'],
    challengeId: null,
    locked: true,
  },
]

// ─── CHALLENGES ────────────────────────────────────────────────────────────

export const CHALLENGES = {
  'js-variables-challenge': {
    id: 'js-variables-challenge',
    lessonId: 'js-variables',
    title: 'Variable Declaration Quiz',
    description: 'Test your knowledge of JavaScript variables',
    xpReward: 30,
    questions: [
      {
        id: 'q1',
        prompt: 'Which keyword declares a variable that CANNOT be reassigned?',
        options: ['var', 'let', 'const', 'static'],
        correct: 2,
        explanation: '`const` creates a constant binding — the variable cannot be reassigned after declaration. `let` and `var` allow reassignment.',
      },
      {
        id: 'q2',
        prompt: 'What is the data type of: `typeof "Hello World"`',
        options: ['text', 'string', 'char', 'word'],
        correct: 1,
        explanation: 'JavaScript has a primitive type called `string` for text values. `typeof "Hello"` returns the string `"string"`.',
      },
      {
        id: 'q3',
        prompt: 'Which of these is a valid variable name in JavaScript?',
        options: ['2fast', 'my-var', '_engineerQuest', 'class'],
        correct: 2,
        explanation: 'Variable names can start with letters, `$`, or `_`. They cannot start with numbers, contain hyphens, or be reserved words like `class`.',
      },
    ],
  },
}

export function getLessonById(id) {
  return LESSONS.find(l => l.id === id)
}

export function getTrackById(id) {
  return TRACKS.find(t => t.id === id)
}

export function getLessonsForTrack(trackId) {
  return LESSONS.filter(l => l.trackId === trackId).sort((a, b) => a.order - b.order)
}
