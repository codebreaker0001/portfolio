export type Project = {
  id: string
  title: string
  shortDescription: string
  category: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  featured: boolean
  highlights: string[]
}

export const projects: Project[] = [
  {
    id: "db-explorer",
    title: "DB Explorer (MCP Server)",
    shortDescription: "Read-only MCP server that lets Claude explore and query SQL databases.",
    category: "MCP Tooling",
    technologies: ["Python", "MCP", "SQLAlchemy", "SQLite", "PostgreSQL", "MySQL"],
    githubUrl: "https://github.com/codebreaker0001/db-explorer",
    liveUrl: "https://pypi.org/project/db-explorer-mcp/0.1.0/",
    featured: false,
    highlights: [
      "10 tools for schema, ERD, query plans, and SELECT-only queries.",
      "Writes are blocked at the query layer; supports SQLite, PostgreSQL, and MySQL.",
    ],
  },
  {
    id: "multi-agent-bank-chatbot",
    title: "Multi-Agent Banking Chatbot",
    shortDescription: "Coordinator routes banking queries to specialist agents, with PII masking.",
    category: "Multi-Agent Systems",
    technologies: ["Python", "FastAPI", "PostgreSQL", "Redis", "Groq (LLaMA 3.1)", "React"],
    githubUrl: "https://github.com/codebreaker0001/multi-agent-bank-chatbot",
    liveUrl: "https://multi-agent-bank-chatbot.vercel.app",
    featured: false,
    highlights: [
      "PII (account numbers, PAN, Aadhaar, contact details) masked before reaching the LLM.",
      "Confirm-before-write for every database change; JWT auth and rate limiting.",
    ],
  },
  {
    id: "docquery",
    title: "DocQuery",
    shortDescription: "Multi-tenant RAG API for document Q&A, with tenant isolation at the database layer.",
    category: "Retrieval-Augmented Generation",
    technologies: ["Python", "FastAPI", "PostgreSQL", "pgvector", "Redis"],
    githubUrl: "https://github.com/codebreaker0001/doc_query",
    liveUrl: "https://doc-query-2.onrender.com/",
    featured: true,
    highlights: [
      "PostgreSQL Row-Level Security isolates each tenant's documents and embeddings.",
      "Async ingestion, pgvector k-NN search, and Redis caching with rate limiting.",
    ],
  },
  {
    id: "multi-agent-research",
    title: "Multi-Agent Research Pipeline",
    shortDescription: "Planner, Researcher, Writer, and Critic agents that produce sourced, verified reports.",
    category: "Multi-Agent Systems",
    technologies: ["Python", "LangGraph", "FastAPI", "Groq", "Tavily"],
    githubUrl: "https://github.com/codebreaker0001/multi_agent_research_pipeline",
    liveUrl: "https://multi-agent-research-pipeline-1.onrender.com/",
    featured: true,
    highlights: [
      "Critic loop is bounded; 80% source-grounding accuracy in the eval harness.",
      "Layered input validation, LLM moderation, and provider fallbacks.",
    ],
  },
]
