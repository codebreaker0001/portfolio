import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useSpring } from "motion/react"
import { useMediaQuery } from "@/hooks/useMediaQuery"

export function CustomCursor() {
  const isFinePointer = useMediaQuery("(pointer: fine)")
  const [label, setLabel] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const springX = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 })
  const springY = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 })

  const enabled = useRef(false)

  useEffect(() => {
    enabled.current = isFinePointer
    document.documentElement.classList.toggle("custom-cursor", isFinePointer)
    if (!isFinePointer) return

    function handleMove(e: MouseEvent) {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)

      const target = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor], a, button"
      )
      if (target) {
        setLabel(target.getAttribute("data-cursor") || (target.tagName === "A" || target.tagName === "BUTTON" ? "→" : null))
      } else {
        setLabel(null)
      }
    }

    function handleLeave() {
      setVisible(false)
    }

    window.addEventListener("mousemove", handleMove)
    document.documentElement.addEventListener("mouseleave", handleLeave)
    return () => {
      window.removeEventListener("mousemove", handleMove)
      document.documentElement.removeEventListener("mouseleave", handleLeave)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinePointer])

  if (!isFinePointer) return null

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] flex items-center justify-center"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      animate={{ opacity: visible ? 1 : 0 }}
    >
      <motion.div
        animate={{
          width: label ? 56 : 8,
          height: label ? 56 : 8,
          backgroundColor: label ? "rgba(232,163,76,1)" : "rgba(245,244,240,1)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="flex items-center justify-center rounded-full"
      >
        {label && (
          <span className="font-mono text-[9px] font-medium uppercase tracking-wide text-ink">
            {label}
          </span>
        )}
      </motion.div>
    </motion.div>
  )
}
