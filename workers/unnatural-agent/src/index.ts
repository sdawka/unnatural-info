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
