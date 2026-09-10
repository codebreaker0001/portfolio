export type ExperienceItem = {
  id: string
  company: string
  role: string
  period: string
  summary: string
  highlights: string[]
  technologies: string[]
}

export const experience: ExperienceItem[] = [
  {
    id: "fnmathlogic",
    company: "FnMathLogic Consulting Services",
    role: "AI Engineer — GenAI-powered Education Platform",
    period: "June 2026 — Present",
    summary:
      "Building the LLM content-generation core of an education platform: automated, grade- and subject-specific lesson planning at scale, deployed on serverless Azure infrastructure.",
    highlights: [
      "Engineered LLM-powered content generation pipelines for automated, grade- and subject-specific daily lesson planning — incorporating contextual data, prompt engineering, and structured output generation.",
      "Scaled high-volume LLM workloads through Python multiprocessing, multithreading, and concurrent API execution, improving generation throughput and minimizing sequential inference bottlenecks.",
      "Architected and deployed event-driven serverless APIs with Azure Functions and Azure Storage, achieving 99.9% production uptime while supporting scalable lesson-generation workloads.",
    ],
    technologies: ["Python", "Azure Functions", "Azure Storage", "Prompt Engineering", "Multiprocessing", "Serverless"],
  },
]
