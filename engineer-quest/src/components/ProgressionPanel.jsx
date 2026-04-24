import { usePlayer, xpForLevel } from '../context/PlayerContext'

const MILESTONES = [
  { level: 1, label: 'Begin the Quest', done: true },
  { level: 3, label: 'Complete 3 Lessons', xpGate: 300 },
  { level: 5, label: 'Unlock Volt Lab', levelGate: 5 },
  { level: 8, label: 'Unlock Board Forge', levelGate: 8 },
  { level: 10, label: 'Master Engineer', levelGate: 10 },
]

export default function ProgressionPanel() {
  const { player, level, xpIntoLevel, xpNeeded, title } = usePlayer()
  const xpPercent = Math.round((xpIntoLevel / xpNeeded) * 100)

  return (
    <div className="panel-card rounded-sm p-6 pixel-corner">
      {/* Level header */}
      <div className="flex items-center gap-4 mb-5">
        <div
          className="w-14 h-14 flex items-center justify-center border-2 relative shrink-0"
          style={{ borderColor: '#00f5ff88', boxShadow: '0 0 20px #00f5ff22, inset 0 0 20px #00f5ff11' }}
        >
          <span className="font-display text-lg neon-text-cyan">{level}</span>
          {/* Corner pixels */}
          <span className="absolute -top-0.5 -left-0.5 w-2 h-2 bg-void" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-void" />
          <span className="absolute -bottom-0.5 -left-0.5 w-2 h-2 bg-void" />
          <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-void" />
        </div>
        <div>
          <div className="font-display text-xs neon-text-amber mb-1">{title}</div>
          <div className="text-xs text-blue-400 opacity-60">
            {player.completedLessons.length} lesson{player.completedLessons.length !== 1 ? 's' : ''} completed
          </div>
          <div className="text-xs text-blue-400 opacity-60">
            {player.totalXP.toLocaleString()} total XP earned
          </div>
        </div>
      </div>

      {/* XP Progress */}
      <div className="mb-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-blue-400 opacity-60">LEVEL PROGRESS</span>
          <span className="text-xs neon-text-cyan font-display">{xpPercent}%</span>
        </div>
        <div className="xp-bar-track">
          <div className="xp-bar-fill" style={{ width: `${xpPercent}%` }} />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-blue-500">{xpIntoLevel} XP</span>
          <span className="text-xs text-blue-500">{xpNeeded} XP to Lv.{level + 1}</span>
        </div>
      </div>

      {/* Milestones */}
      <div>
        <div className="text-xs text-blue-400 opacity-60 mb-3 font-display">MILESTONES</div>
        <div className="space-y-2">
          {MILESTONES.map((m) => {
            const achieved = level >= m.level || m.done
            return (
              <div key={m.level} className="flex items-center gap-3">
                <div className={`w-4 h-4 border flex items-center justify-center shrink-0 ${
                  achieved ? 'border-neon-green/60 bg-neon-green/10' : 'border-blue-800'
                }`}>
                  {achieved && (
                    <span className="neon-text-green text-xs">✓</span>
                  )}
                </div>
                <span className={`text-xs ${achieved ? 'text-blue-200' : 'text-blue-600'}`}>
                  {m.label}
                </span>
                {m.levelGate && (
                  <span className="ml-auto text-xs text-blue-600">Lv.{m.levelGate}</span>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
