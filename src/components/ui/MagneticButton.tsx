import { useRef, useState, type ReactNode, type AnchorHTMLAttributes } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/cn"

type MagneticButtonProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration"
> & {
  children: ReactNode
  variant?: "solid" | "outline" | "ghost"
  className?: string
}

export function MagneticButton({
  children,
  variant = "outline",
  className,
  ...anchorProps
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - rect.left - rect.width / 2
    const relY = e.clientY - rect.top - rect.height / 2
    setOffset({ x: relX * 0.25, y: relY * 0.4 })
  }

  function handleMouseLeave() {
    setOffset({ x: 0, y: 0 })
  }

  return (
    <motion.a
      ref={ref}
      data-cursor="OPEN"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.4 }}
      className={cn(
        "group relative inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-sm tracking-tight transition-colors",
        variant === "solid" && "bg-signal text-ink hover:bg-signal-glow",
        variant === "outline" &&
          "border border-line text-paper hover:border-signal hover:text-signal",
        variant === "ghost" && "text-paper-dim hover:text-paper",
        className
      )}
      {...anchorProps}
    >
      {children}
    </motion.a>
  )
}
