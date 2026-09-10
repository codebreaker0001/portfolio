import { motion } from "motion/react"
import { ExternalLink, CheckCircle2 } from "lucide-react"
import type { Project } from "@/data/projects"
import { Tag } from "@/components/ui/Tag"
import { GithubIcon } from "@/components/ui/icons"
import { ArchitectureFlow } from "./ArchitectureFlow"

export function ProjectCase({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      id={`project-${project.id}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="relative border-t border-line py-16 md:py-20 first:border-t-0"
    >
      <div className="grid gap-10 md:grid-cols-12">
        <div className="md:col-span-4">
          <span className="font-mono text-sm text-signal">{String(index + 1).padStart(2, "0")}</span>
          <h3 className="mt-3 font-display text-3xl font-medium leading-tight text-paper md:text-4xl">
            {project.title}
          </h3>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.15em] text-paper-faint">
            {project.category}
          </p>
          <p className="mt-5 text-paper-dim leading-relaxed">{project.shortDescription}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Tag key={tech}>{tech}</Tag>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="CODE"
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 font-mono text-xs text-paper transition-colors hover:border-signal hover:text-signal"
              >
                <GithubIcon size={13} />
                Source
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="VIEW"
                className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 font-mono text-xs text-paper transition-colors hover:border-signal hover:text-signal"
              >
                <ExternalLink size={13} strokeWidth={1.75} />
                Live
              </a>
            )}
          </div>

          {project.results && project.results.length > 0 && (
            <div className="mt-8 flex flex-col gap-4 border-t border-line pt-6">
              {project.results.map((r) => (
                <div key={r.label}>
                  <div className="font-display text-2xl text-signal">{r.value}</div>
                  <div className="font-mono text-xs text-paper-faint">{r.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="md:col-span-8 space-y-10">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper-faint">Problem</p>
              <p className="mt-3 text-sm leading-relaxed text-paper-dim">{project.problem}</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper-faint">Approach</p>
              <p className="mt-3 text-sm leading-relaxed text-paper-dim">{project.solution}</p>
            </div>
          </div>

          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-paper-faint">
              System flow
            </p>
            <div className="rounded-2xl border border-line bg-ink-soft/50 p-5 md:p-6">
              <ArchitectureFlow stages={project.architecture} />
            </div>
          </div>

          <div>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-paper-faint">
              Engineering highlights
            </p>
            <ul className="space-y-3">
              {project.engineeringHighlights.map((h, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-paper-dim">
                  <CheckCircle2 size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-signal-dim" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
