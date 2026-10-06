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
          description="Production-style AI systems, built end to end."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCase key={project.id} project={project} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}
