import { usePlayer } from '../context/PlayerContext'
import { Link, useLocation } from 'react-router-dom'

export default function PlayerHUD() {
  const { player, level, xpIntoLevel, xpNeeded, title } = usePlayer()
  const location = useLocation()
  const xpPercent = Math.round((xpIntoLevel / xpNeeded) * 100)

  const isHome = location.pathname === '/'

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-void/90 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <span className="text-xl">◈</span>
          <span className="font-display text-xs neon-text-cyan hidden sm:block">EQ</span>
        </Link>

        {/* Divider */}
        <div className="h-6 w-px bg-border hidden sm:block" />

        {/* Level badge */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 border border-neon-cyan/60 flex items-center justify-center relative"
               style={{ boxShadow: '0 0 8px #00f5ff22' }}>
            <span className="font-display text-xs neon-text-cyan">{level}</span>
          </div>
          <div className="hidden md:block">
            <div className="font-display text-xs neon-text-amber leading-none">{title}</div>
          </div>
        </div>

        {/* XP Bar — grows to fill space */}
        <div className="flex-1 max-w-xs">
          <div className="flex justify-between text-xs text-blue-400 mb-1 opacity-60">
            <span>{xpIntoLevel} XP</span>
            <span>{xpNeeded} XP</span>
          </div>
          <div className="xp-bar-track">
            <div
              className="xp-bar-fill"
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-1 ml-auto">
          <Link
            to="/dashboard"
            className={`px-3 py-1.5 text-xs font-display transition-colors ${
              location.pathname === '/dashboard'
                ? 'neon-text-cyan border border-neon-cyan/40 bg-neon-cyan/5'
                : 'text-blue-400 hover:text-blue-200 border border-transparent'
            }`}
          >
            HQ
          </Link>
        </nav>
      </div>
    </header>
  )
}
