import { useState } from 'react'
import { usePlayer } from '../context/PlayerContext'
import { TRACKS, LESSONS, getLessonsForTrack } from '../data/lessons'
import LessonCard from '../components/LessonCard'
import ProgressionPanel from '../components/ProgressionPanel'

export default function DashboardPage() {
  const { player, level } = usePlayer()
  const [activeTrack, setActiveTrack] = useState('coding')

  const trackLessons = getLessonsForTrack(activeTrack)
  const activeTrackData = TRACKS.find(t => t.id === activeTrack)
  const completedCount = player.completedLessons.filter(
    id => LESSONS.find(l => l.id === id && l.trackId === activeTrack)
  ).length

  return (
    <div className="min-h-[calc(100vh-57px)] grid-bg">
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Page header */}
        <div className="mb-8">
          <div className="font-display text-xs neon-text-amber mb-2">MISSION CONTROL</div>
          <h1 className="font-display text-lg neon-text-cyan leading-relaxed">Engineer HQ</h1>
          <p className="text-sm text-blue-400 opacity-60 mt-1">
            Select a track and begin your next lesson
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Left sidebar: progression + track switcher */}
          <div className="lg:col-span-1 space-y-4">
            <ProgressionPanel />

            {/* Track selector */}
            <div className="panel-card rounded-sm p-4">
              <div className="font-display text-xs neon-text-cyan mb-3 opacity-70">TRACKS</div>
              <div className="space-y-2">
                {TRACKS.map(track => {
                  const isLocked = track.unlockedAt > 0 && level < track.unlockedAt
                  const isActive = activeTrack === track.id
                  return (
                    <button
                      key={track.id}
                      onClick={() => !isLocked && setActiveTrack(track.id)}
                      disabled={isLocked}
                      className={`w-full text-left p-3 border transition-all flex items-center gap-3 ${
                        isActive
                          ? 'bg-neon-cyan/5 border-neon-cyan/40'
                          : isLocked
                          ? 'border-border opacity-30 cursor-not-allowed'
                          : 'border-border hover:border-blue-600 cursor-pointer'
                      }`}
                      style={isActive ? { borderColor: `${track.colorHex}60` } : {}}
                    >
                      <span
                        className="text-lg shrink-0"
                        style={{ color: track.colorHex, filter: isActive ? `drop-shadow(0 0 4px ${track.colorHex})` : 'none' }}
                      >
                        {track.icon}
                      </span>
                      <div className="min-w-0">
                        <div
                          className="font-display text-xs truncate"
                          style={{ color: isActive ? track.colorHex : '#7a9abf' }}
                        >
                          {track.name}
                        </div>
                        {isLocked && (
                          <div className="text-xs text-blue-600">Lv.{track.unlockedAt} req.</div>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Main content: lesson cards */}
          <div className="lg:col-span-3">
            {/* Track header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <span
                  className="text-2xl"
                  style={{ color: activeTrackData?.colorHex, filter: `drop-shadow(0 0 6px ${activeTrackData?.colorHex})` }}
                >
                  {activeTrackData?.icon}
                </span>
                <div>
                  <h2
                    className="font-display text-xs"
                    style={{ color: activeTrackData?.colorHex, textShadow: `0 0 8px ${activeTrackData?.colorHex}66` }}
                  >
                    {activeTrackData?.name}
                  </h2>
                  <p className="text-xs text-blue-500 mt-0.5">
                    {completedCount} / {trackLessons.length} lessons complete
                  </p>
                </div>
              </div>

              {/* Track progress */}
              <div className="hidden sm:block w-32">
                <div className="xp-bar-track">
                  <div
                    className="xp-bar-fill"
                    style={{
                      width: `${trackLessons.length > 0 ? Math.round((completedCount / trackLessons.length) * 100) : 0}%`,
                      background: `linear-gradient(90deg, ${activeTrackData?.colorHex}88, ${activeTrackData?.colorHex})`
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Lesson grid */}
            {trackLessons.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {trackLessons.map(lesson => (
                  <LessonCard key={lesson.id} lesson={lesson} />
                ))}
              </div>
            ) : (
              <div className="panel-card rounded-sm p-12 text-center">
                <div className="text-4xl mb-4 opacity-40">🔒</div>
                <div className="font-display text-xs text-blue-400 opacity-60">
                  No lessons available yet
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
