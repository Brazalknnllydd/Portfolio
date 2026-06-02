import { useEffect, useMemo, useState } from 'react'

type TypewriterTextProps = {
  className?: string
  speed?: number
  text: string
}

export function TypewriterText({
  className = '',
  speed = 55,
  text,
}: TypewriterTextProps) {
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    setVisibleCount(0)

    const timer = window.setInterval(() => {
      setVisibleCount((current) => {
        if (current >= text.length) {
          window.clearInterval(timer)
          return current
        }

        return current + 1
      })
    }, speed)

    return () => window.clearInterval(timer)
  }, [speed, text])

  const displayedText = useMemo(() => text.slice(0, visibleCount), [text, visibleCount])
  const isComplete = visibleCount >= text.length

  return (
    <span
      className={['typewriter-text', isComplete ? 'is-complete' : '', className]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="typewriter-text__content">{displayedText}</span>
      <span className="typewriter-text__caret" aria-hidden="true" />
    </span>
  )
}
