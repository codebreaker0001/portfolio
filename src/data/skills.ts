export type SkillNode = {
  name: string
  blurb: string
  relatedProjectId?: string
}

export type SkillCategory = {
  id: string
  title: string
  description: string
  nodes: SkillNode[]
}

export const skillCategories: SkillCategory[] = [
  {
    id: "intelligent-systems",
    title: "Intelligent Systems",
    description: "LLMs → Agents → RAG → Evaluation → Guardrails",
    nodes: [
      { name: "LLMs", blurb: "Core to every project — content generation, synthesis, and structured output.", relatedProjectId: "docquery" },
      { name: "RAG", blurb: "Retrieval pipelines grounding answers in source documents rather than model memory.", relatedProjectId: "docquery" },
      { name: "Multi-Agent Systems", blurb: "Planner/Researcher/Writer/Critic graphs coordinating through shared state.", relatedProjectId: "multi-agent-research" },
      { name: "LangGraph", blurb: "Orchestrates agent graphs with bounded revision loops.", relatedProjectId: "multi-agent-research" },
      { name: "Prompt Engineering", blurb: "Structured output generation for grade- and subject-specific content pipelines." },
      { name: "LLM Evaluation & Benchmarks", blurb: "Built a harness measuring source-grounding accuracy and per-agent latency.", relatedProjectId: "multi-agent-research" },
      { name: "LLM Guardrails", blurb: "Layered input validation and moderation with graceful fallback behavior.", relatedProjectId: "multi-agent-research" },
      { name: "Embeddings & Vector Search", blurb: "Sentence Transformers embeddings with k-NN similarity search.", relatedProjectId: "docquery" },
    ],
  },
  {
    id: "backend-systems",
    title: "Backend & Systems",
    description: "APIs → Auth → Databases → Serverless → Scale",
    nodes: [
      { name: "FastAPI", blurb: "Async APIs for multi-tenant RAG retrieval and agent orchestration.", relatedProjectId: "docquery" },
      { name: "REST APIs", blurb: "Designed and secured for SaaS-style multi-tenant access." },
      { name: "Serverless (Azure Functions)", blurb: "Event-driven lesson-generation APIs at 99.9% production uptime." },
      { name: "Async Programming", blurb: "Async SQLAlchemy and background job processing for non-blocking ingestion.", relatedProjectId: "docquery" },
      { name: "Authentication", blurb: "API-key auth with SHA-256 hashing and PostgreSQL Row-Level Security.", relatedProjectId: "docquery" },
      { name: "System Design", blurb: "Tenant isolation, rate limiting, and caching designed for real production load." },
      { name: "Node.js / Express.js", blurb: "Backend services and API tooling." },
    ],
  },
  {
    id: "data-cloud",
    title: "Data, Cloud & DevOps",
    description: "PostgreSQL → Redis → Azure → Observability",
    nodes: [
      { name: "PostgreSQL", blurb: "Row-Level Security for tenant isolation, plus relational storage for job state.", relatedProjectId: "docquery" },
      { name: "pgvector", blurb: "k-NN vector similarity search inside Postgres for semantic retrieval.", relatedProjectId: "docquery" },
      { name: "Redis", blurb: "Cache-aside architecture with TTL expiration and fixed-window rate limiting.", relatedProjectId: "docquery" },
      { name: "Microsoft Azure", blurb: "Azure Functions + Azure Storage powering serverless lesson generation." },
      { name: "Docker", blurb: "Containerized services for consistent local and deployed environments." },
      { name: "Observability (Structlog)", blurb: "Structured, request-ID correlated logging across async pipelines.", relatedProjectId: "docquery" },
      { name: "CI/CD & Git", blurb: "Version control and deployment workflows across independent services." },
    ],
  },
]
