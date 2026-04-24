import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="min-h-[calc(100vh-57px)] grid-bg flex items-center justify-center">
      <div className="text-center">
        <div className="font-display text-6xl neon-text-cyan mb-4 animate-pulse-slow">404</div>
        <div className="font-display text-xs neon-text-amber mb-4">LOCATION NOT FOUND</div>
        <p className="text-sm text-blue-400 opacity-60 mb-6">
          This sector of the map hasn't been charted yet.
        </p>
        <Link to="/" className="btn-primary">← Return to Base</Link>
      </div>
    </div>
  )
}
