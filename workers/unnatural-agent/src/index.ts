/// <reference path="../worker-configuration.d.ts" />

import { routeAgentRequest } from "agents";
import { createAuth } from "./auth";
import { UnnaturalAgent } from "./agent";

export { UnnaturalAgent };

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "https://unnatural.info",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, Cookie",
  "Access-Control-Allow-Credentials": "true",
};

export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // CORS preflight
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    // Better Auth routes — no session required.
    if (url.pathname.startsWith("/api/auth")) {
      // Rate-limit the magic-link send endpoint: unauthenticated and
      // triggers outbound email + DB writes. Fail-open if the binding
      // isn't configured (dev mode). Enforced once binding is set up.
      if (
        url.pathname === "/api/auth/magic-link/send-magic-link" &&
        request.method === "POST" &&
        env.MAGIC_LINK_LIMITER
      ) {
        const ip =
          request.headers.get("cf-connecting-ip") ??
          request.headers.get("x-forwarded-for") ??
          "unknown";
        const { success } = await env.MAGIC_LINK_LIMITER.limit({ key: ip });
        if (!success) {
          return new Response(
            JSON.stringify({ error: "Too many requests. Try again in a minute." }),
            {
              status: 429,
              headers: { ...CORS_HEADERS, "Content-Type": "application/json" },
            },
          );
        }
      }

      const auth = createAuth(env);
      const response = await auth.handler(request);
      return withCors(response);
    }

    // Agent routes — session required.
    if (url.pathname.startsWith("/agents")) {
      const auth = createAuth(env);
      const session = await auth.api.getSession({ headers: request.headers });
      if (!session) {
        return new Response("Unauthorized", {
          status: 401,
          headers: CORS_HEADERS,
        });
      }

      const agentResponse = await routeAgentRequest(request, env);
      if (agentResponse) {
        // WebSocket upgrade responses cannot have headers appended via a new
        // Response, so only add CORS headers for non-upgrade responses.
        if (agentResponse.webSocket) {
          return agentResponse;
        }
        return withCors(agentResponse);
      }

      return new Response("Not found", {
        status: 404,
        headers: CORS_HEADERS,
      });
    }

    return new Response("Not found", {
      status: 404,
      headers: CORS_HEADERS,
    });
  },
} satisfies ExportedHandler<Env>;

/**
 * Return a new Response with CORS headers merged onto the original.
 * The original response's body and status are preserved.
 */
function withCors(response: Response): Response {
  const headers = new Headers(response.headers);
  for (const [key, value] of Object.entries(CORS_HEADERS)) {
    headers.set(key, value);
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}
