import { Container } from "@/components/ui/Container"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { projects } from "@/data/projects"
import { ProjectCase } from "./ProjectCase"

export function Projects() {
  return (
    <section id="projects" className="relative border-b border-line py-24 md:py-32">
      <Container>
        <SectionHeading
          index="03"
          title="Selected work."
          description="Two production-style systems — a multi-tenant RAG platform and a self-critiquing multi-agent research pipeline."
        />
        <div>
          {projects.map((project, i) => (
            <ProjectCase key={project.id} project={project} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}
