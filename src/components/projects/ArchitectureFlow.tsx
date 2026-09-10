import { motion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { ScrambleText } from "@/components/ui/ScrambleText"

export function ArchitectureFlow({ stages }: { stages: string[] }) {
  return (
    <div
      className="flex flex-wrap items-center gap-x-1 gap-y-3"
      role="list"
      aria-label="System architecture flow"
    >
      {stages.map((stage, i) => (
        <motion.div
          key={stage}
          role="listitem"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.06 }}
          className="flex items-center gap-1"
        >
          <span className="rounded-lg border border-line bg-ink-soft px-3 py-2 font-mono text-xs text-paper transition-colors hover:border-signal hover:text-signal">
            <ScrambleText text={stage} />
          </span>
          {i < stages.length - 1 && (
            <ArrowRight size={13} strokeWidth={1.5} className="mx-1 shrink-0 text-paper-faint" />
          )}
        </motion.div>
      ))}
    </div>
  )
}
