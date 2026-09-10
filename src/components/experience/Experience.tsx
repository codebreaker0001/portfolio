import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Plus, Minus } from "lucide-react"
import { Container } from "@/components/ui/Container"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { Tag } from "@/components/ui/Tag"
import { experience } from "@/data/experience"

export function Experience() {
  const [openId, setOpenId] = useState<string | null>(experience[0]?.id ?? null)

  return (
    <section id="experience" className="relative border-b border-line py-24 md:py-32">
      <Container>
        <SectionHeading
          index="02"
          title="Where I've been building."
          description="Currently shipping GenAI infrastructure for a live education platform."
        />

        <div className="relative border-l border-line pl-8 md:pl-12">
          {experience.map((item) => {
            const isOpen = openId === item.id
            return (
              <div key={item.id} className="relative pb-4">
                <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-signal ring-4 ring-ink md:-left-[calc(3rem+5px)]" />

                <button
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="group w-full text-left"
                  aria-expanded={isOpen}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
                        {item.period}
                      </p>
                      <h3 className="mt-2 font-display text-2xl font-medium text-paper md:text-3xl">
                        {item.role}
                      </h3>
                      <p className="mt-1 text-paper-dim">{item.company}</p>
                    </div>
                    <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-paper-dim transition-colors group-hover:text-signal">
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </span>
                  </div>
                  <p className="mt-4 max-w-2xl text-paper-dim">{item.summary}</p>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <ul className="mt-6 space-y-3 border-t border-line pt-6">
                        {item.highlights.map((h, i) => (
                          <li key={i} className="flex gap-3 text-sm leading-relaxed text-paper-dim">
                            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-signal" />
                            {h}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {item.technologies.map((tech) => (
                          <Tag key={tech}>{tech}</Tag>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
