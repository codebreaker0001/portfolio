export type Project = {
  id: string
  title: string
  shortDescription: string
  category: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean

  problem: string
  solution: string
  architecture: string[]
  engineeringHighlights: string[]
  results?: { label: string; value: string }[]
}

export const projects: Project[] = [
  {
    id: "docquery",
    title: "DocQuery",
    shortDescription: "Multi-tenant RAG document Q&A platform with production-grade tenant isolation.",
    category: "Retrieval-Augmented Generation",
    technologies: ["Python", "FastAPI", "PostgreSQL", "pgvector", "Redis", "Sentence Transformers", "Structlog"],
    githubUrl: "https://github.com/codebreaker0001/doc_query",
    featured: true,
    problem:
      "Most RAG demos ignore what it takes to serve multiple tenants safely: isolated data, authenticated access, rate-limited APIs, and answers that are actually grounded in a tenant's own documents rather than hallucinated.",
    solution:
      "A production-style multi-tenant RAG API built on FastAPI and async SQLAlchemy, where every document, embedding, and query is scoped to a tenant at the database level — not just in application logic — with LLM-generated answers grounded in retrieved source chunks.",
    architecture: [
      "Client",
      "API-Key Auth",
      "Rate Limiter",
      "Ingestion Queue",
      "Chunking + Embeddings",
      "pgvector k-NN Retrieval",
      "LLM Answer Synthesis",
      "Source-Grounded Response",
    ],
    engineeringHighlights: [
      "Tenant isolation enforced with PostgreSQL Row-Level Security (RLS) — not just query filters — so cross-tenant data access fails at the database layer.",
      "API-key authentication with SHA-256 key hashing and Redis-based fixed-window rate limiting for SaaS-style access control.",
      "Asynchronous ingestion pipeline with background processing, job-status tracking, and content-hash deduplication to avoid re-embedding duplicate documents.",
      "Sentence Transformers embeddings with k-NN vector similarity search for semantic retrieval over ingested documents.",
      "Redis cache-aside layer with TTL-based expiration and tenant-scoped invalidation to cut redundant retrieval + LLM calls.",
      "Structured logging with request-ID correlation via Structlog for end-to-end observability across the ingestion and query paths.",
    ],
  },
  {
    id: "multi-agent-research",
    title: "Multi-Agent Research Pipeline",
    shortDescription: "A Planner → Researcher → Writer ⇄ Critic agent graph that turns a question into a sourced, verified report.",
    category: "Multi-Agent Systems",
    technologies: ["Python", "LangGraph", "FastAPI", "Groq", "Tavily"],
    githubUrl: "https://github.com/codebreaker0001/multi_agent_research_pipeline",
    featured: true,
    problem:
      "A single LLM call answering a research question tends to skip verification — it states claims without sources and doesn't catch its own gaps. Turning a raw question into a report worth trusting needs planning, research, and self-critique as distinct steps.",
    solution:
      "A multi-agent system orchestrated with LangGraph, where a Planner decomposes the question, a Researcher gathers sourced findings, a Writer drafts the report, and a Critic checks it for unsupported claims or gaps — sending it back for revision inside a bounded loop before it's finalized.",
    architecture: [
      "User Query",
      "Planner",
      "Researcher (Tavily search)",
      "Writer",
      "Critic",
      "Revision Loop (bounded)",
      "Verified Report",
    ],
    engineeringHighlights: [
      "Planner → Researcher → Writer ⇄ Critic workflow with a bounded revision loop, so the critique cycle can improve a draft without ever running unbounded.",
      "Evaluation harness measuring agent performance end-to-end, including per-agent token usage and latency profiling.",
      "Layered input validation and LLM-based moderation, with provider and search fallbacks for graceful degradation during invalid inputs or service outages.",
      "Frontend and FastAPI backend deployed as independent services on Render for independent scaling.",
    ],
    results: [{ label: "Source-grounding accuracy", value: "80%" }],
  },
]
