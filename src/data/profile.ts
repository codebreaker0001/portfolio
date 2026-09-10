export const profile = {
  name: "Adarsh Yadav",
  role: "AI Engineer",
  tagline: "GenAI · LLM Systems · RAG · Agents",
  location: "India",
  email: "yashyadav0171@gmail.com",
  phone: "+91 63921 05203",
  github: "https://github.com/codebreaker0001",
  // TODO: confirm and fill in — not present in source resume text.
  linkedin: "",
  resumeUrl: "/resume.pdf",

  heroHeadline: "I build AI systems that ship — not demos.",
  heroSub:
    "AI Engineer focused on retrieval-augmented generation, multi-agent workflows, and production-grade GenAI backends. Currently building LLM-powered pipelines at scale.",

  bioParagraphs: [
    "I'm an AI Engineer with a B.Tech from IIT Roorkee, currently building GenAI-powered systems that go past the notebook and into production — event-driven serverless APIs, multi-tenant RAG platforms, and multi-agent research pipelines with real evaluation harnesses behind them.",
    "My work sits at the intersection of LLM engineering and backend systems design: prompt orchestration and retrieval on one side, tenant isolation, caching, rate limiting, and observability on the other. I care less about wiring a model into an app and more about what happens when that app has real users, real load, and real failure modes.",
    "Outside of AI infra, I've spent years on core CS fundamentals — 500+ algorithmic problems across Codeforces, CodeChef, and LeetCode — which is less a resume line and more the habit that shapes how I approach system design.",
  ],

  interests: [
    "Retrieval-Augmented Generation",
    "Multi-Agent Orchestration",
    "LLM Evaluation & Guardrails",
    "Distributed Backend Systems",
  ],

  stats: [
    { label: "Production uptime", value: "99.9%", note: "Azure serverless lesson-generation APIs" },
    { label: "Source-grounding accuracy", value: "80%", note: "Multi-agent research pipeline eval harness" },
    { label: "DSA problems solved", value: "500+", note: "Codeforces · CodeChef · LeetCode" },
    { label: "JEE Advanced 2022", value: "AIR 9162", note: "Among 1.6 lakh+ qualified candidates" },
  ],
} as const

export const education = {
  institution: "Indian Institute of Technology Roorkee",
  degree: "B.Tech",
  period: "2022 – 2026",
  detail: "CGPA 7.99 / 10",
}
