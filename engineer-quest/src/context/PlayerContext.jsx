import { createContext, useContext, useState, useEffect } from 'react'

// XP required to reach each level
// Formula: each level needs level * 100 XP
const XP_PER_LEVEL = 100

export function xpForLevel(level) {
  return level * XP_PER_LEVEL
}

export function levelFromTotalXP(totalXP) {
  let level = 1
  let remaining = totalXP
  while (remaining >= xpForLevel(level)) {
    remaining -= xpForLevel(level)
    level++
  }
  return { level, xpIntoLevel: remaining, xpNeeded: xpForLevel(level) }
}

const TITLES = [
  'Novice Tinkerer',
  'Circuit Apprentice',
  'Code Initiate',
  'Signal Seeker',
  'Logic Builder',
  'Voltage Voyager',
  'PCB Pathfinder',
  'Stack Sage',
  'Firmware Forger',
  'Master Engineer',
]

export function titleForLevel(level) {
  return TITLES[Math.min(level - 1, TITLES.length - 1)]
}

const PlayerContext = createContext(null)

const STORAGE_KEY = 'engineer_quest_player'

const DEFAULT_STATE = {
  name: 'Engineer',
  totalXP: 0,
  completedLessons: [],   // array of lesson IDs
  completedChallenges: [], // array of challenge IDs
  unlockedBadges: [],
}

export function PlayerProvider({ children }) {
  const [player, setPlayer] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      return saved ? { ...DEFAULT_STATE, ...JSON.parse(saved) } : DEFAULT_STATE
    } catch {
      return DEFAULT_STATE
    }
  })

  const [xpFlash, setXpFlash] = useState(null) // { amount, id }

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(player))
  }, [player])

  function awardXP(amount, sourceId) {
    setPlayer(p => ({ ...p, totalXP: p.totalXP + amount }))
    setXpFlash({ amount, id: Date.now() })
    setTimeout(() => setXpFlash(null), 2000)
  }

  function completeLesson(lessonId, xp) {
    setPlayer(p => {
      if (p.completedLessons.includes(lessonId)) return p
      return { ...p, completedLessons: [...p.completedLessons, lessonId], totalXP: p.totalXP + xp }
    })
    setXpFlash({ amount: xp, id: Date.now() })
    setTimeout(() => setXpFlash(null), 2000)
  }

  function completeChallenge(challengeId, xp) {
    setPlayer(p => {
      if (p.completedChallenges.includes(challengeId)) return p
      return { ...p, completedChallenges: [...p.completedChallenges, challengeId], totalXP: p.totalXP + xp }
    })
    setXpFlash({ amount: xp, id: Date.now() })
    setTimeout(() => setXpFlash(null), 2000)
  }

  function resetPlayer() {
    setPlayer(DEFAULT_STATE)
  }

  const progression = levelFromTotalXP(player.totalXP)

  return (
    <PlayerContext.Provider value={{
      player,
      ...progression,
      title: titleForLevel(progression.level),
      xpFlash,
      awardXP,
      completeLesson,
      completeChallenge,
      resetPlayer,
    }}>
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider')
  return ctx
}
