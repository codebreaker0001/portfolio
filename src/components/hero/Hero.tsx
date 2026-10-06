import { motion } from "motion/react"
import { ArrowDown, FileText } from "lucide-react"
import { profile } from "@/data/profile"
import { MagneticButton } from "@/components/ui/MagneticButton"
import { GithubIcon } from "@/components/ui/icons"
import { Container } from "@/components/ui/Container"
import { HeroScene } from "./HeroScene"

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] items-center overflow-hidden border-b border-line"
    >
      <HeroScene />

      <Container className="relative z-10 pt-24 pb-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-paper-faint"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-signal animate-pulse" />
          {profile.tagline}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="max-w-4xl font-display text-4xl font-medium leading-[1.08] tracking-tight text-paper sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {profile.heroHeadline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-paper-dim sm:text-lg"
        >
          {profile.heroSub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            variant="solid"
            href="#projects"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            View Projects
          </MagneticButton>
          <MagneticButton
            variant="outline"
            href={profile.github}
            target="_blank"
            rel="noreferrer"
          >
            <GithubIcon size={15} />
            GitHub
          </MagneticButton>
          <MagneticButton variant="ghost" href={profile.resumeUrl} target="_blank" rel="noreferrer">
            <FileText size={15} strokeWidth={1.75} />
            Résumé
          </MagneticButton>
        </motion.div>
      </Container>

      <motion.button
        onClick={() => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-paper-faint transition-colors hover:text-signal"
        aria-label="Scroll to Experience section"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} strokeWidth={1.5} />
        </motion.span>
      </motion.button>
    </section>
  )
}
