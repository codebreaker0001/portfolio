import { useEffect, useState } from "react"
import { motion, useMotionValueEvent, useScroll } from "motion/react"
import { Command, Menu, X } from "lucide-react"
import { sections } from "@/data/sections"
import { useActiveSection } from "@/hooks/useActiveSection"
import { CommandPalette } from "./CommandPalette"
import { cn } from "@/lib/cn"

const sectionIds = sections.map((s) => s.id)

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { scrollYProgress, scrollY } = useScroll()
  const active = useActiveSection(sectionIds)

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40)
  })

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setPaletteOpen((v) => !v)
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [])

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMobileOpen(false)
  }

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-50 h-[2px] w-full origin-left bg-signal"
        style={{ scaleX: scrollYProgress }}
      />
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-40 flex justify-center transition-all duration-500",
          scrolled ? "pt-3" : "pt-6"
        )}
      >
        <nav
          className={cn(
            "flex items-center justify-between gap-2 rounded-full border transition-all duration-500 px-4",
            scrolled
              ? "w-[92%] max-w-3xl border-line bg-ink-soft/80 py-2 backdrop-blur-md shadow-lg shadow-black/20"
              : "w-[94%] max-w-4xl border-transparent bg-transparent py-3"
          )}
        >
          <button
            onClick={() => scrollTo("home")}
            data-cursor="HOME"
            className="font-display text-sm font-semibold tracking-tight text-paper"
            aria-label="Go to top"
          >
            AY<span className="text-signal">.</span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {sections.slice(1).map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 font-mono text-xs uppercase tracking-wide transition-colors",
                  active === s.id ? "text-ink" : "text-paper-dim hover:text-paper"
                )}
              >
                {active === s.id && (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-full bg-signal"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{s.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPaletteOpen(true)}
              data-cursor="⌘K"
              className="hidden sm:flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 font-mono text-xs text-paper-faint transition-colors hover:border-signal hover:text-signal"
              aria-label="Open command palette"
            >
              <Command size={12} strokeWidth={1.75} />
              <span>K</span>
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="flex md:hidden items-center justify-center rounded-full border border-line p-2 text-paper"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </nav>
      </header>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-x-4 top-20 z-40 rounded-2xl border border-line bg-ink-soft p-2 shadow-2xl md:hidden"
        >
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-body text-sm transition-colors",
                active === s.id ? "bg-ink-raised text-signal" : "text-paper hover:bg-ink-raised"
              )}
            >
              <span className="font-mono text-xs text-paper-faint">{s.index}</span>
              {s.label}
            </button>
          ))}
        </motion.div>
      )}

      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </>
  )
}
