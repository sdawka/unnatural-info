/// <reference path="../worker-configuration.d.ts" />
import { betterAuth } from "better-auth";
import { magicLink } from "better-auth/plugins/magic-link";

export function createAuth(env: Env) {
  return betterAuth({
    database: env.DB,
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    trustedOrigins: [
      "https://unnatural.info",
      env.BETTER_AUTH_URL,
    ],
    plugins: [
      magicLink({
        sendMagicLink: async ({ email, url }) => {
          await env.EMAIL.send({
            to: email,
            from: "noreply@unnatural.info",
            subject: "Sign in to unnatural",
            text: `Click here to sign in: ${url}\n\nThis link expires in 10 minutes.`,
          });
        },
      }),
    ],
  });
}

export function getAuth(env: Env) {
  return createAuth(env);
}

export type Auth = ReturnType<typeof createAuth>;
export type Session = Auth["$Infer"]["Session"];
