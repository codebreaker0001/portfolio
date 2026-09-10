import { useEffect, useState, type ReactNode } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight, FileText, Mail } from "lucide-react"
import { sections } from "@/data/sections"
import { profile } from "@/data/profile"
import { GithubIcon } from "@/components/ui/icons"

type Command = {
  id: string
  label: string
  hint: string
  icon: ReactNode
  action: () => void
}

export function CommandPalette({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  const [query, setQuery] = useState("")

  useEffect(() => {
    if (open) setQuery("")
  }, [open])

  useEffect(() => {
    if (!open) return
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [open, onClose])

  const navCommands: Command[] = sections.map((s) => ({
    id: s.id,
    label: s.label,
    hint: "Go to section",
    icon: <ArrowUpRight size={15} strokeWidth={1.75} />,
    action: () => {
      document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })
      onClose()
    },
  }))

  const actionCommands: Command[] = [
    {
      id: "github",
      label: "Open GitHub",
      hint: profile.github.replace("https://", ""),
      icon: <GithubIcon size={15} />,
      action: () => window.open(profile.github, "_blank"),
    },
    {
      id: "resume",
      label: "View résumé",
      hint: "PDF",
      icon: <FileText size={15} strokeWidth={1.75} />,
      action: () => window.open(profile.resumeUrl, "_blank"),
    },
    {
      id: "email",
      label: "Email me",
      hint: profile.email,
      icon: <Mail size={15} strokeWidth={1.75} />,
      action: () => (window.location.href = `mailto:${profile.email}`),
    },
  ]

  const all = [...navCommands, ...actionCommands]
  const filtered = all.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  )

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-start justify-center px-4 pt-[14vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <motion.div
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-xl border border-line bg-ink-soft shadow-2xl"
          >
            <div className="flex items-center gap-3 border-b border-line px-4 py-3.5">
              <span className="font-mono text-signal text-sm">/</span>
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to a section, or take an action…"
                className="w-full bg-transparent font-body text-sm text-paper placeholder:text-paper-faint outline-none"
                aria-label="Command palette search"
              />
              <kbd className="font-mono text-[10px] text-paper-faint">ESC</kbd>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {filtered.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-paper-faint">
                  No matches.
                </p>
              )}
              {filtered.map((cmd) => (
                <button
                  key={cmd.id}
                  onClick={cmd.action}
                  className="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-ink-raised focus-visible:bg-ink-raised"
                >
                  <span className="flex items-center gap-3">
                    <span className="text-paper-faint">{cmd.icon}</span>
                    <span className="text-sm text-paper">{cmd.label}</span>
                  </span>
                  <span className="font-mono text-xs text-paper-faint">{cmd.hint}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
