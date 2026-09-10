import { motion } from "motion/react"

export function SectionHeading({
  index,
  title,
  description,
}: {
  index: string
  title: string
  description?: string
}) {
  return (
    <div className="mb-14 md:mb-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-baseline gap-4"
      >
        <span className="font-mono text-sm text-signal">{index}</span>
        <span className="h-px flex-1 max-w-16 bg-line" />
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-paper-faint">
          Section
        </span>
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className="mt-4 font-display text-4xl md:text-5xl font-medium tracking-tight text-paper"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mt-4 max-w-xl text-paper-dim leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
