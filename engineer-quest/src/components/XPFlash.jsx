import { usePlayer } from '../context/PlayerContext'

export default function XPFlash() {
  const { xpFlash } = usePlayer()

  if (!xpFlash) return null

  return (
    <div
      key={xpFlash.id}
      className="fixed top-6 right-6 z-50 pointer-events-none"
      style={{ animation: 'xpPop 2s ease-out forwards' }}
    >
      <style>{`
        @keyframes xpPop {
          0%   { opacity: 0; transform: translateY(10px) scale(0.8); }
          20%  { opacity: 1; transform: translateY(0) scale(1.1); }
          40%  { transform: scale(1); }
          70%  { opacity: 1; transform: translateY(-20px); }
          100% { opacity: 0; transform: translateY(-40px); }
        }
      `}</style>
      <div className="panel-card px-5 py-3 border-neon-green flex items-center gap-3"
           style={{ borderColor: '#39ff1488', boxShadow: '0 0 20px #39ff1433' }}>
        <span className="text-2xl">⚡</span>
        <div>
          <div className="neon-text-green font-display text-sm">+{xpFlash.amount} XP</div>
          <div className="text-xs text-blue-300 opacity-70">Experience gained!</div>
        </div>
      </div>
    </div>
  )
}
