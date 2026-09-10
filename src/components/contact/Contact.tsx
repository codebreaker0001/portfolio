import { motion } from "motion/react"
import { Mail, ArrowUpRight } from "lucide-react"
import { Container } from "@/components/ui/Container"
import { MagneticButton } from "@/components/ui/MagneticButton"
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons"
import { profile } from "@/data/profile"

export function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <Container>
        <div className="flex items-baseline gap-4">
          <span className="font-mono text-sm text-signal">05</span>
          <span className="h-px flex-1 max-w-16 bg-line" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-paper-faint">
            Contact
          </span>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 max-w-2xl font-display text-4xl font-medium leading-tight tracking-tight text-paper sm:text-5xl md:text-6xl"
        >
          Let's build something worth shipping.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="mt-5 max-w-lg text-paper-dim"
        >
          Open to conversations about AI infrastructure, RAG systems, and agentic
          workflows. The fastest way to reach me is email.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="mt-10"
        >
          <MagneticButton variant="solid" href={`mailto:${profile.email}`} className="text-base">
            {profile.email}
            <ArrowUpRight size={16} strokeWidth={1.75} />
          </MagneticButton>
        </motion.div>

        <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-line pt-8">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            data-cursor="OPEN"
            className="inline-flex items-center gap-2 font-mono text-sm text-paper-dim transition-colors hover:text-signal"
          >
            <GithubIcon size={16} />
            GitHub
          </a>
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              data-cursor="OPEN"
              className="inline-flex items-center gap-2 font-mono text-sm text-paper-dim transition-colors hover:text-signal"
            >
              <LinkedinIcon size={16} />
              LinkedIn
            </a>
          )}
          <a
            href={`mailto:${profile.email}`}
            data-cursor="OPEN"
            className="inline-flex items-center gap-2 font-mono text-sm text-paper-dim transition-colors hover:text-signal"
          >
            <Mail size={16} strokeWidth={1.75} />
            Email
          </a>
        </div>

        <p className="mt-16 font-mono text-xs text-paper-faint">
          Designed & built by {profile.name} · {new Date().getFullYear()}
        </p>
      </Container>
    </section>
  )
}
