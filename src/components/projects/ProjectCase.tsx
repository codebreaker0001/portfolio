import { ExternalLink } from "lucide-react"
import type { Project } from "@/data/projects"
import { Tag } from "@/components/ui/Tag"
import { GithubIcon } from "@/components/ui/icons"

export function ProjectCase({ project, index }: { project: Project; index: number }) {
  return (
    <article id={`project-${project.id}`} className="flex flex-col rounded-2xl border border-line bg-ink-soft/50 p-6">
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-sm text-signal">{String(index + 1).padStart(2, "0")}</span>
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-paper-faint">{project.category}</p>
      </div>
      <h3 className="mt-4 font-display text-2xl font-medium leading-tight text-paper">{project.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-paper-dim">{project.shortDescription}</p>

      <ul className="mt-4 space-y-2">
        {project.highlights.map((h) => (
          <li key={h} className="text-sm leading-relaxed text-paper-dim before:mr-2 before:text-signal before:content-['→']">
            {h}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <Tag key={tech}>{tech}</Tag>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
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
    </article>
  )
}
