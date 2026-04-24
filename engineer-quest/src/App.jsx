import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PlayerProvider } from './context/PlayerContext'

import PlayerHUD from './components/PlayerHUD'
import XPFlash from './components/XPFlash'

import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import JSVariablesLesson from './pages/JSVariablesLesson'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <PlayerProvider>
      <BrowserRouter>
        {/* CRT scanline overlay class applied to the outermost div */}
        <div className="crt">
          <PlayerHUD />
          <XPFlash />

          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/lesson/js-variables" element={<JSVariablesLesson />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </PlayerProvider>
  )
}
