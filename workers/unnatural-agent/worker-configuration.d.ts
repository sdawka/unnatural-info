interface RateLimiter {
  limit(options: { key: string }): Promise<{ success: boolean }>;
}

interface Env {
  UNNATURAL_AGENT: DurableObjectNamespace;
  DB: D1Database;
  EMAIL: SendEmail;
  OPENROUTER_API_KEY: string;
  BETTER_AUTH_SECRET: string;
  BETTER_AUTH_URL: string;
  DAILY_ANALYSIS_CAP?: string;
  MAGIC_LINK_LIMITER?: RateLimiter;
}
