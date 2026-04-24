import { Link } from 'react-router-dom'
import { usePlayer } from '../context/PlayerContext'
import { TRACKS } from '../data/lessons'

export default function HomePage() {
  const { level, title } = usePlayer()

  return (
    <div className="min-h-[calc(100vh-57px)] grid-bg relative overflow-hidden">
      {/* Ambient glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5 pointer-events-none"
           style={{ background: 'radial-gradient(circle, #00f5ff, transparent 70%)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-5 pointer-events-none"
           style={{ background: 'radial-gradient(circle, #bf5fff, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto px-6 py-16 relative z-10">

        {/* Hero section */}
        <div className="text-center mb-16">
          {/* Decorative line */}
          <div className="flex items-center gap-4 justify-center mb-8">
            <div className="h-px flex-1 max-w-xs bg-gradient-to-r from-transparent to-neon-cyan/40" />
            <span className="neon-text-cyan text-2xl animate-float">◈</span>
            <div className="h-px flex-1 max-w-xs bg-gradient-to-l from-transparent to-neon-cyan/40" />
          </div>

          <div className="font-display text-xs neon-text-amber mb-4 tracking-widest">
            — WELCOME TO —
          </div>

          <h1 className="font-display leading-relaxed mb-4">
            <span className="block text-2xl sm:text-3xl neon-text-cyan">ENGINEER</span>
            <span className="block text-2xl sm:text-3xl neon-text-green">QUEST</span>
          </h1>

          <p className="text-blue-300 text-sm max-w-xl mx-auto leading-relaxed opacity-80 mb-8">
            An RPG-style learning platform where you earn XP, level up, and master
            coding, electrical engineering, and PCB design — one lesson at a time.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/dashboard" className="btn-primary btn-green px-8">
              ▶ Enter the Lab
            </Link>
            <Link to="/lesson/js-variables" className="btn-primary px-8">
              ⚡ Quick Start
            </Link>
          </div>
        </div>

        {/* Stats bar */}
        <div className="panel-card rounded-sm p-4 flex flex-wrap gap-6 justify-center mb-12">
          {[
            { label: 'Your Level', value: level, color: 'neon-text-cyan' },
            { label: 'Your Title', value: title, color: 'neon-text-amber' },
            { label: 'Disciplines', value: '3', color: 'neon-text-purple' },
            { label: 'Total Lessons', value: '32', color: 'neon-text-green' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className={`font-display text-sm ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-blue-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Track cards */}
        <div className="mb-8">
          <div className="font-display text-xs neon-text-cyan mb-6 flex items-center gap-3">
            <span>LEARNING TRACKS</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TRACKS.map((track, i) => (
              <div
                key={track.id}
                className="panel-card rounded-sm p-5 hover:-translate-y-1 transition-transform cursor-default"
                style={{ borderColor: `${track.colorHex}30` }}
              >
                {/* Top glow line */}
                <div className="absolute top-0 left-0 right-0 h-px"
                     style={{ background: `linear-gradient(90deg, transparent, ${track.colorHex}60, transparent)` }} />

                <div className="flex items-start justify-between mb-3">
                  <span
                    className="text-3xl"
                    style={{ color: track.colorHex, filter: `drop-shadow(0 0 6px ${track.colorHex})` }}
                  >
                    {track.icon}
                  </span>
                  {track.unlockedAt > 0 && level < track.unlockedAt && (
                    <span className="badge badge-amber">Lv.{track.unlockedAt}</span>
                  )}
                  {(track.unlockedAt === 0 || level >= track.unlockedAt) && (
                    <span className="badge badge-green">Unlocked</span>
                  )}
                </div>

                <h3
                  className="font-display text-xs mb-2"
                  style={{ color: track.colorHex, textShadow: `0 0 8px ${track.colorHex}88` }}
                >
                  {track.name}
                </h3>

                <p className="text-xs text-blue-400 opacity-70 leading-relaxed mb-3">
                  {track.description}
                </p>

                <div className="text-xs text-blue-500">
                  {track.totalLessons} lessons available
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature bullets */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          {[
            { icon: '⚡', label: 'Earn XP', desc: 'Complete lessons and challenges to gain experience points' },
            { icon: '🏆', label: 'Level Up', desc: 'Unlock new tracks and titles as your skills grow' },
            { icon: '◈', label: 'Real Skills', desc: 'Learn concepts you\'ll use on actual engineering projects' },
          ].map(f => (
            <div key={f.label} className="p-4">
              <div className="text-2xl mb-2">{f.icon}</div>
              <div className="font-display text-xs neon-text-cyan mb-1">{f.label}</div>
              <div className="text-xs text-blue-400 opacity-60">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
