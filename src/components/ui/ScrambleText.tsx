import { useState, useRef } from "react"

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ01"

export function ScrambleText({ text, className }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text)
  const frame = useRef(0)
  const raf = useRef<number | null>(null)

  function scramble() {
    let iteration = 0
    const totalIterations = text.length

    if (raf.current) cancelAnimationFrame(raf.current)

    function tick() {
      setDisplay((_prev) =>
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " "
            if (index < iteration) return text[index]
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join("")
      )

      iteration += 1 / 3
      frame.current += 1

      if (iteration < totalIterations) {
        raf.current = requestAnimationFrame(tick)
      } else {
        setDisplay(text)
      }
    }

    tick()
  }

  return (
    <span
      className={className}
      onMouseEnter={scramble}
      data-text={text}
    >
      {display}
    </span>
  )
}
