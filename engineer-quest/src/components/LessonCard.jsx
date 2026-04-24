import { Link } from 'react-router-dom'
import { usePlayer } from '../context/PlayerContext'
import { getTrackById } from '../data/lessons'

const DIFFICULTY_COLORS = {
  Beginner: { label: 'badge-cyan', dot: '#00f5ff' },
  Intermediate: { label: 'badge-amber', dot: '#ffb700' },
  Advanced: { label: 'badge-purple', dot: '#bf5fff' },
}

export default function LessonCard({ lesson }) {
  const { player } = usePlayer()
  const track = getTrackById(lesson.trackId)
  const isCompleted = player.completedLessons.includes(lesson.id)
  const isLocked = lesson.locked && !isCompleted
  const diff = DIFFICULTY_COLORS[lesson.difficulty] || DIFFICULTY_COLORS.Beginner

  return (
    <div
      className={`panel-card rounded-sm p-5 flex flex-col gap-3 transition-all duration-200 pixel-corner
        ${isLocked ? 'opacity-40 cursor-not-allowed' : 'hover:-translate-y-0.5 hover:shadow-neon-cyan cursor-pointer'}
        ${isCompleted ? 'border-neon-green/30' : ''}
      `}
      style={isCompleted ? { borderColor: '#39ff1430', boxShadow: '0 0 16px #39ff1408' } : {}}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* Track icon */}
          <span
            className="text-lg"
            style={{ color: track?.colorHex, filter: `drop-shadow(0 0 4px ${track?.colorHex})` }}
          >
            {track?.icon}
          </span>
          <span className="text-xs text-blue-400 opacity-60">{track?.name}</span>
        </div>

        {/* Status */}
        {isCompleted && (
          <span className="badge badge-green text-xs">✓ Done</span>
        )}
        {isLocked && (
          <span className="text-blue-500 text-lg">🔒</span>
        )}
      </div>

      {/* Title */}
      <div>
        <h3 className="font-display text-xs leading-relaxed text-blue-100 mb-1">
          {lesson.title}
        </h3>
        <p className="text-xs text-blue-400 opacity-70">{lesson.subtitle}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1">
        {lesson.tags.map(tag => (
          <span key={tag} className="badge badge-cyan text-xs">{tag}</span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-auto pt-2 border-t border-border">
        <div className="flex items-center gap-3">
          <span className={`badge ${diff.label}`}>{lesson.difficulty}</span>
          <span className="text-xs text-blue-500">⏱ {lesson.estimatedMinutes}m</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="neon-text-green text-xs font-display">+{lesson.xpReward}</span>
          <span className="text-xs text-blue-500">XP</span>
        </div>
      </div>

      {/* Action */}
      {!isLocked && (
        <Link
          to={`/lesson/${lesson.id}`}
          className={`btn-primary ${isCompleted ? 'btn-green' : ''} text-center w-full mt-1`}
          style={isCompleted ? { borderColor: '#39ff14', color: '#39ff14' } : {}}
        >
          {isCompleted ? '↩ Review' : '▶ Start'}
        </Link>
      )}
    </div>
  )
}
