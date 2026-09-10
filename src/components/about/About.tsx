import { motion } from "motion/react"
import { Container } from "@/components/ui/Container"
import { SectionHeading } from "@/components/ui/SectionHeading"
import { AnimatedStat } from "@/components/ui/AnimatedStat"
import { Tag } from "@/components/ui/Tag"
import { profile, education } from "@/data/profile"

export function About() {
  return (
    <section id="about" className="relative border-b border-line py-24 md:py-32">
      <Container>
        <SectionHeading
          index="01"
          title="Systems, not scripts."
          description="A quick orientation on how I think about building AI products."
        />

        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-7 space-y-6">
            {profile.bioParagraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
                className="text-base leading-relaxed text-paper-dim md:text-lg"
              >
                {para}
              </motion.p>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
              className="!mt-10 flex flex-wrap gap-2 pt-2"
            >
              {profile.interests.map((interest) => (
                <Tag key={interest}>{interest}</Tag>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
              className="!mt-10 rounded-xl border border-line p-5"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-paper-faint">
                Education
              </p>
              <p className="mt-2 font-display text-lg text-paper">{education.institution}</p>
              <p className="mt-1 text-sm text-paper-dim">
                {education.degree} · {education.period} · {education.detail}
              </p>
            </motion.div>
          </div>

          <div className="md:col-span-5">
            <div className="grid grid-cols-2 gap-8">
              {profile.stats.map((stat) => (
                <AnimatedStat key={stat.label} {...stat} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
