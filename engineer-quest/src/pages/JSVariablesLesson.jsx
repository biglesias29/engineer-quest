import { useState } from 'react'
import { Link } from 'react-router-dom'
import { usePlayer } from '../context/PlayerContext'
import { getLessonById, CHALLENGES } from '../data/lessons'
import LessonChallenge from '../components/LessonChallenge'

// ── Syntax-highlighted inline code ──
function C({ children }) {
  return (
    <code className="bg-void px-1.5 py-0.5 border border-border text-xs font-body"
          style={{ color: '#00f5ff' }}>
      {children}
    </code>
  )
}

// ── A full code block with colored tokens ──
function CodeBlock({ children }) {
  return (
    <div className="code-block my-4 overflow-x-auto">
      <pre className="whitespace-pre">{children}</pre>
    </div>
  )
}

// ── A single concept section ──
function Section({ number, title, children }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-7 h-7 border border-neon-cyan/50 flex items-center justify-center shrink-0">
          <span className="font-display text-xs neon-text-cyan">{number}</span>
        </div>
        <h2 className="font-display text-xs neon-text-cyan">{title}</h2>
      </div>
      {children}
    </div>
  )
}

// ── Callout box ──
function Callout({ type = 'info', children }) {
  const styles = {
    info: 'border-neon-cyan/40 bg-neon-cyan/5 text-blue-200',
    tip: 'border-neon-green/40 bg-neon-green/5 text-green-200',
    warn: 'border-neon-amber/40 bg-neon-amber/5 text-amber-200',
  }
  const icons = { info: 'ℹ', tip: '💡', warn: '⚠' }
  return (
    <div className={`p-4 border text-sm leading-relaxed my-4 flex gap-3 ${styles[type]}`}>
      <span className="shrink-0">{icons[type]}</span>
      <div>{children}</div>
    </div>
  )
}

export default function JSVariablesLesson() {
  const { player, completeLesson } = usePlayer()
  const lesson = getLessonById('js-variables')
  const challenge = CHALLENGES['js-variables-challenge']
  const isCompleted = player.completedLessons.includes('js-variables')

  const [lessonDone, setLessonDone] = useState(isCompleted)

  function handleMarkComplete() {
    completeLesson('js-variables', lesson.xpReward)
    setLessonDone(true)
  }

  return (
    <div className="min-h-[calc(100vh-57px)] grid-bg">
      <div className="max-w-3xl mx-auto px-4 py-10">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-blue-500 mb-8">
          <Link to="/dashboard" className="hover:text-blue-300">HQ</Link>
          <span>›</span>
          <span className="neon-text-cyan">⟨/⟩ Code Ops</span>
          <span>›</span>
          <span className="text-blue-300">Variables & Data Types</span>
        </div>

        {/* Lesson header */}
        <div className="panel-card rounded-sm p-6 mb-8 pixel-corner">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="badge badge-cyan">JavaScript</span>
                <span className="badge badge-green">Beginner</span>
                <span className="text-xs text-blue-500">⏱ 10 min</span>
              </div>
              <h1 className="font-display text-sm neon-text-cyan leading-relaxed mb-1">
                Variables & Data Types
              </h1>
              <p className="text-sm text-blue-400 opacity-70">
                The building blocks of every program
              </p>
            </div>
            <div className="text-center shrink-0">
              <div className="font-display text-lg neon-text-green">+{lesson.xpReward}</div>
              <div className="text-xs text-blue-500">XP Reward</div>
            </div>
          </div>
        </div>

        {/* ─── LESSON CONTENT ─────────────────────────────────── */}

        <Section number="01" title="What Is a Variable?">
          <p className="text-sm text-blue-200 leading-relaxed mb-3">
            A <strong className="text-blue-100">variable</strong> is a named container that holds a value.
            Think of it like a labeled box: you give it a name, put something inside, and can
            read or change the contents later.
          </p>
          <p className="text-sm text-blue-200 leading-relaxed mb-3">
            In JavaScript, you declare a variable using one of three keywords:
            <C>var</C>, <C>let</C>, or <C>const</C>.
          </p>
          <CodeBlock>
{`// Three ways to declare a variable

`}<span style={{color:'#bf5fff'}}>var</span>{`   name = `}<span style={{color:'#39ff14'}}>"Alice"</span>{`;   `}<span style={{color:'#4a6080'}}>// Old-style, avoid in modern code</span>{`
`}<span style={{color:'#bf5fff'}}>let</span>{`   score = `}<span style={{color:'#ffb700'}}>42</span>{`;       `}<span style={{color:'#4a6080'}}>// Block-scoped, reassignable</span>{`
`}<span style={{color:'#bf5fff'}}>const</span>{` MAX_HP = `}<span style={{color:'#ffb700'}}>100</span>{`;     `}<span style={{color:'#4a6080'}}>// Block-scoped, cannot be reassigned</span>
          </CodeBlock>
          <Callout type="tip">
            <strong>Rule of thumb:</strong> Use <C>const</C> by default. Switch to <C>let</C> only
            when you know the value needs to change. Avoid <C>var</C> entirely in modern JavaScript.
          </Callout>
        </Section>

        <Section number="02" title="The Three Modern Keywords">
          <p className="text-sm text-blue-200 leading-relaxed mb-4">
            Here's what makes each keyword different:
          </p>

          <div className="space-y-3 mb-4">
            {[
              {
                kw: 'const',
                color: '#39ff14',
                title: 'Constant — use most of the time',
                desc: 'Declares a variable whose binding cannot be reassigned. The value itself can still mutate (e.g., you can push to a const array).',
                example: `const playerName = "Zero";`
              },
              {
                kw: 'let',
                color: '#00f5ff',
                title: 'Block-scoped mutable variable',
                desc: 'Declares a variable limited to the block, statement, or expression it is declared in. Can be reassigned.',
                example: `let health = 100;\nhealth = health - 25; // OK!`
              },
              {
                kw: 'var',
                color: '#ffb700',
                title: 'Function-scoped — legacy, avoid',
                desc: 'The old way. Variables declared with var are function-scoped (or globally scoped) and are hoisted — a source of many bugs.',
                example: `var oldStyle = "avoid me";`
              },
            ].map(item => (
              <div key={item.kw} className="panel-card rounded-sm p-4"
                   style={{ borderColor: `${item.color}30` }}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-display text-xs" style={{ color: item.color }}>{item.kw}</span>
                  <span className="text-xs text-blue-400">— {item.title}</span>
                </div>
                <p className="text-xs text-blue-300 opacity-70 mb-2">{item.desc}</p>
                <div className="code-block text-xs py-2">{item.example}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section number="03" title="JavaScript Data Types">
          <p className="text-sm text-blue-200 leading-relaxed mb-4">
            Every variable holds a value, and every value has a <strong className="text-blue-100">type</strong>.
            JavaScript has 7 primitive types:
          </p>

          <CodeBlock>
{`// String — text, wrapped in quotes
`}<span style={{color:'#bf5fff'}}>const</span>{` greeting = `}<span style={{color:'#39ff14'}}>"Hello, Engineer!"</span>{`;

// Number — integers AND decimals
`}<span style={{color:'#bf5fff'}}>const</span>{` voltage = `}<span style={{color:'#ffb700'}}>3.3</span>{`;
`}<span style={{color:'#bf5fff'}}>const</span>{` pinCount = `}<span style={{color:'#ffb700'}}>40</span>{`;

// Boolean — true or false only
`}<span style={{color:'#bf5fff'}}>const</span>{` isConnected = `}<span style={{color:'#bf5fff'}}>true</span>{`;

// Undefined — declared but not yet assigned
`}<span style={{color:'#bf5fff'}}>let</span>{` result;        `}<span style={{color:'#4a6080'}}>// result is undefined</span>{`

// Null — intentional absence of a value
`}<span style={{color:'#bf5fff'}}>const</span>{` data = `}<span style={{color:'#bf5fff'}}>null</span>{`;

// BigInt — very large integers
`}<span style={{color:'#bf5fff'}}>const</span>{` bigNum = `}<span style={{color:'#ffb700'}}>9007199254740991n</span>{`;

// Symbol — unique identifiers (advanced)
`}<span style={{color:'#bf5fff'}}>const</span>{` id = Symbol(`}<span style={{color:'#39ff14'}}>"unique"</span>{`);`}
          </CodeBlock>

          <Callout type="info">
            Use <C>typeof</C> to check a value's type at runtime:
            <C>typeof "hello"</C> returns <C>"string"</C>,
            <C>typeof 42</C> returns <C>"number"</C>.
          </Callout>
        </Section>

        <Section number="04" title="Naming Variables">
          <p className="text-sm text-blue-200 leading-relaxed mb-4">
            Good variable names make code readable. JavaScript uses <strong className="text-blue-100">camelCase</strong> by
            convention (capitalize each word after the first).
          </p>
          <CodeBlock>
{`// ✓ Good names — clear and descriptive
`}<span style={{color:'#bf5fff'}}>const</span>{` `}<span style={{color:'#00f5ff'}}>maxBatteryVoltage</span>{` = `}<span style={{color:'#ffb700'}}>4.2</span>{`;
`}<span style={{color:'#bf5fff'}}>let</span>{`   `}<span style={{color:'#00f5ff'}}>currentPlayerHealth</span>{` = `}<span style={{color:'#ffb700'}}>100</span>{`;
`}<span style={{color:'#bf5fff'}}>const</span>{` `}<span style={{color:'#00f5ff'}}>isGameOver</span>{` = `}<span style={{color:'#bf5fff'}}>false</span>{`;

// ✗ Bad names — vague or confusing
`}<span style={{color:'#bf5fff'}}>const</span>{` x = `}<span style={{color:'#ffb700'}}>4.2</span>{`;
`}<span style={{color:'#bf5fff'}}>let</span>{`   thing2 = `}<span style={{color:'#ffb700'}}>100</span>{`;
`}<span style={{color:'#bf5fff'}}>const</span>{` flag = `}<span style={{color:'#bf5fff'}}>false</span>{`;

// Constants (non-reassignable config) use UPPER_SNAKE_CASE
`}<span style={{color:'#bf5fff'}}>const</span>{` `}<span style={{color:'#00f5ff'}}>MAX_LEVEL</span>{` = `}<span style={{color:'#ffb700'}}>50</span>{`;
`}<span style={{color:'#bf5fff'}}>const</span>{` `}<span style={{color:'#00f5ff'}}>API_BASE_URL</span>{` = `}<span style={{color:'#39ff14'}}>"https://api.example.com"</span>{`;`}
          </CodeBlock>
          <Callout type="warn">
            Variable names are <strong>case-sensitive</strong>. <C>myVar</C>, <C>MyVar</C>,
            and <C>MYVAR</C> are three completely different variables.
          </Callout>
        </Section>

        {/* Mark complete */}
        <div className="panel-card rounded-sm p-6 mb-10 text-center">
          {lessonDone ? (
            <div>
              <div className="neon-text-green font-display text-xs mb-2">✓ LESSON COMPLETE</div>
              <div className="text-xs text-blue-400 opacity-60">
                +{lesson.xpReward} XP awarded — now take the challenge below!
              </div>
            </div>
          ) : (
            <div>
              <div className="text-sm text-blue-300 mb-4 opacity-70">
                Read through the lesson? Mark it complete to earn your XP.
              </div>
              <button onClick={handleMarkComplete} className="btn-primary btn-green px-8">
                ✓ Mark Lesson Complete (+{lesson.xpReward} XP)
              </button>
            </div>
          )}
        </div>

        {/* ─── CHALLENGE ──────────────────────────────────────── */}
        <div className="mb-8">
          <div className="font-display text-xs neon-text-amber mb-4 flex items-center gap-3">
            <span>⚔ KNOWLEDGE CHALLENGE</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <LessonChallenge challenge={challenge} />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-border">
          <Link to="/dashboard" className="btn-primary text-xs">
            ← Back to HQ
          </Link>
          <div className="text-xs text-blue-600">
            Next: Functions & Scope →
          </div>
        </div>
      </div>
    </div>
  )
}
