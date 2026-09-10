import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "motion/react"

function parseValue(raw: string): { prefix: string; number: number; suffix: string } {
  const match = raw.match(/^([^\d]*)([\d,.]+)(.*)$/)
  if (!match) return { prefix: "", number: 0, suffix: raw }
  const [, prefix, numStr, suffix] = match
  return { prefix, number: parseFloat(numStr.replace(/,/g, "")), suffix }
}

export function AnimatedStat({
  label,
  value,
  note,
}: {
  label: string
  value: string
  note: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const [display, setDisplay] = useState("0")
  const { prefix, number, suffix } = parseValue(value)

  useEffect(() => {
    if (!inView) return
    const duration = 1200
    const start = performance.now()

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = number * eased
      const formatted = Number.isInteger(number)
        ? Math.round(current).toString()
        : current.toFixed(1)
      setDisplay(formatted)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, number])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="border-l border-line pl-5"
    >
      <div className="font-display text-3xl font-medium text-paper sm:text-4xl">
        {prefix}
        {display}
        {suffix}
      </div>
      <div className="mt-1.5 text-sm text-paper-dim">{label}</div>
      <div className="mt-0.5 font-mono text-xs text-paper-faint">{note}</div>
    </motion.div>
  )
}
