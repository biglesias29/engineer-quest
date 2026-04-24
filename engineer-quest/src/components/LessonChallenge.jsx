import { useState } from 'react'
import { usePlayer } from '../context/PlayerContext'

export default function LessonChallenge({ challenge }) {
  const { player, completeChallenge } = usePlayer()
  const isAlreadyComplete = player.completedChallenges.includes(challenge.id)

  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState(null)       // index of selected answer
  const [confirmed, setConfirmed] = useState(false)    // whether they hit "confirm"
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(isAlreadyComplete)
  const [showExplanation, setShowExplanation] = useState(false)

  const question = challenge.questions[currentQ]
  const isCorrect = selected === question?.correct
  const isLastQuestion = currentQ === challenge.questions.length - 1

  function handleConfirm() {
    if (selected === null) return
    setConfirmed(true)
    setShowExplanation(true)
    if (isCorrect) setScore(s => s + 1)
  }

  function handleNext() {
    if (isLastQuestion) {
      setFinished(true)
      if (!isAlreadyComplete) {
        completeChallenge(challenge.id, challenge.xpReward)
      }
    } else {
      setCurrentQ(q => q + 1)
      setSelected(null)
      setConfirmed(false)
      setShowExplanation(false)
    }
  }

  if (finished) {
    const perfect = score === challenge.questions.length
    return (
      <div className="panel-card rounded-sm p-8 text-center"
           style={{ borderColor: perfect ? '#39ff1440' : '#00f5ff40' }}>
        <div className="text-4xl mb-4 animate-float">{perfect ? '🏆' : '⭐'}</div>
        <div className={`font-display text-sm mb-2 ${perfect ? 'neon-text-green' : 'neon-text-cyan'}`}>
          {perfect ? 'PERFECT SCORE!' : 'CHALLENGE COMPLETE'}
        </div>
        <div className="text-blue-300 text-sm mb-4">
          {score} / {challenge.questions.length} correct
        </div>
        {!isAlreadyComplete ? (
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-neon-green/40 bg-neon-green/10">
            <span className="text-xl">⚡</span>
            <span className="neon-text-green font-display text-sm">+{challenge.xpReward} XP EARNED</span>
          </div>
        ) : (
          <div className="text-xs text-blue-500 opacity-60">XP already awarded for this challenge</div>
        )}
      </div>
    )
  }

  return (
    <div className="panel-card rounded-sm p-6">
      {/* Challenge header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="font-display text-xs neon-text-amber mb-1">⚔ CHALLENGE</div>
          <div className="text-sm text-blue-300">{challenge.title}</div>
        </div>
        <div className="text-right">
          <div className="font-display text-xs neon-text-cyan">
            {currentQ + 1} / {challenge.questions.length}
          </div>
          <div className="text-xs neon-text-green">+{challenge.xpReward} XP</div>
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <div className="text-sm text-blue-100 leading-relaxed mb-4 font-display text-xs">
          {question.prompt}
        </div>

        {/* Options */}
        <div className="space-y-2">
          {question.options.map((opt, i) => {
            let style = 'border-border hover:border-blue-500 hover:bg-blue-900/10 cursor-pointer'
            if (confirmed) {
              if (i === question.correct) {
                style = 'border-neon-green/60 bg-neon-green/10 cursor-default'
              } else if (i === selected && !isCorrect) {
                style = 'border-neon-red/60 bg-red-900/20 cursor-default opacity-70'
              } else {
                style = 'border-border opacity-40 cursor-default'
              }
            } else if (selected === i) {
              style = 'border-neon-cyan/60 bg-neon-cyan/10 cursor-pointer'
            }

            return (
              <button
                key={i}
                onClick={() => !confirmed && setSelected(i)}
                className={`w-full text-left p-3 border transition-all flex items-center gap-3 ${style}`}
              >
                {/* Option letter */}
                <span className={`font-display text-xs w-5 shrink-0 ${
                  confirmed && i === question.correct ? 'neon-text-green' :
                  confirmed && i === selected && !isCorrect ? 'text-red-400' :
                  selected === i ? 'neon-text-cyan' : 'text-blue-600'
                }`}>
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="text-sm text-blue-200">{opt}</span>
                {confirmed && i === question.correct && (
                  <span className="ml-auto neon-text-green">✓</span>
                )}
                {confirmed && i === selected && !isCorrect && (
                  <span className="ml-auto text-red-400">✗</span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Explanation */}
      {showExplanation && (
        <div className={`p-4 border mb-4 text-sm leading-relaxed ${
          isCorrect
            ? 'border-neon-green/40 bg-neon-green/5 text-green-200'
            : 'border-red-500/40 bg-red-900/10 text-red-200'
        }`}>
          <div className="font-display text-xs mb-1 opacity-70">
            {isCorrect ? '✓ CORRECT' : '✗ NOT QUITE'}
          </div>
          {question.explanation}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3">
        {!confirmed ? (
          <button
            onClick={handleConfirm}
            disabled={selected === null}
            className={`btn-primary flex-1 ${selected === null ? 'opacity-30 cursor-not-allowed' : ''}`}
          >
            Confirm Answer
          </button>
        ) : (
          <button onClick={handleNext} className="btn-primary btn-green flex-1">
            {isLastQuestion ? '🏆 Finish Challenge' : 'Next Question →'}
          </button>
        )}
      </div>
    </div>
  )
}
