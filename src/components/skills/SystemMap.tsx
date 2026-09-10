import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowUpRight } from "lucide-react"
import { Container } from "@/components/ui/Container"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { skillCategories, type SkillNode } from "@/data/skills"
import { projects } from "@/data/projects"
import { cn } from "@/lib/cn"

export function SystemMap() {
  const [active, setActive] = useState<SkillNode | null>(
    skillCategories[0]?.nodes[0] ?? null
  )

  const relatedProject = active?.relatedProjectId
    ? projects.find((p) => p.id === active.relatedProjectId)
    : undefined

  return (
    <section id="engineering" className="relative border-b border-line py-24 md:py-32">
      <Container>
        <SectionHeading
          index="04"
          title="How I think about the stack."
          description="A map of what I actually build with — hover or select a node for context."
        />

        <div className="grid gap-10 lg:grid-cols-3">
          {skillCategories.map((category) => (
            <div key={category.id}>
              <h3 className="font-display text-lg text-paper">{category.title}</h3>
              <p className="mt-1 font-mono text-xs text-paper-faint">{category.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {category.nodes.map((node) => {
                  const isActive = active?.name === node.name
                  return (
                    <button
                      key={node.name}
                      onMouseEnter={() => setActive(node)}
                      onFocus={() => setActive(node)}
                      onClick={() => setActive(node)}
                      className={cn(
                        "rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors",
                        isActive
                          ? "border-signal bg-signal text-ink"
                          : "border-line text-paper-dim hover:border-signal hover:text-signal"
                      )}
                    >
                      {node.name}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 min-h-[104px] rounded-2xl border border-line bg-ink-soft/50 p-6 md:p-8">
          <AnimatePresence mode="wait">
            {active && (
              <motion.div
                key={active.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-signal">
                    {active.name}
                  </p>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-paper-dim">
                    {active.blurb}
                  </p>
                </div>
                {relatedProject && (
                  <a
                    href={`#project-${relatedProject.id}`}
                    data-cursor="VIEW"
                    className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-line px-4 py-2 font-mono text-xs text-paper transition-colors hover:border-signal hover:text-signal"
                  >
                    {relatedProject.title}
                    <ArrowUpRight size={13} strokeWidth={1.75} />
                  </a>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  )
}
