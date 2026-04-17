/// <reference path="../worker-configuration.d.ts" />
import { betterAuth } from "better-auth";
import { magicLink } from "better-auth/plugins/magic-link";
import { Resend } from "resend";

export function createAuth(env: Env) {
  const resend = new Resend(env.RESEND_API_KEY);

  return betterAuth({
    database: env.DB,
    secret: env.BETTER_AUTH_SECRET,
    baseURL: env.BETTER_AUTH_URL,
    plugins: [
      magicLink({
        sendMagicLink: async ({ email, url }) => {
          await resend.emails.send({
            from: "unnatural <me@sahil.pro>",
            to: email,
            subject: "Sign in to unnatural",
            html: `<p>Click <a href="${url}">here</a> to sign in. This link expires in 10 minutes.</p>`,
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
