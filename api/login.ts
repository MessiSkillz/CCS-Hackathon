import { RequestCookies, ResponseCookies } from "@edge-runtime/cookies";
import Redis from "ioredis";
import * as bcrypt from "bcryptjs";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REDIS_URL: string;
    }
  }
}

const client = new Redis(process.env.REDIS_URL);

export const runtime = "node";

export async function POST(req: Request) {
  const { username, password }: { username: string; password: string } =
    await req.json();

  if (!username || !password) {
    return new Response('{"error": "Invalid username or password"}', {
      status: 400,
    });
  }

  const pass = await client.get(`pass:${username}`);
  const token = Math.random().toString(36).substring(2);

  if (pass === bcrypt.hashSync(password, 10)) {
    await client.set(`tok:${username}`, token);

    const respHeaders = new Headers();
    const respCookies = new ResponseCookies(respHeaders);
    respCookies.set("Auth", token, { maxAge: 60 * 24 });

    return new Response('{"success":true}', {
      headers: respHeaders,
    });
  } else if (pass == null) {
    await Promise.allSettled([
      client.set(`tok:${username}`, token),
      client.set(`pass:${username}`, bcrypt.hashSync(password, 10)),
    ]);

    const respHeaders = new Headers();
    const respCookies = new ResponseCookies(respHeaders);
    respCookies.set("Auth", token, { maxAge: 60 * 24 });

    return new Response('{"success":true}', {
      headers: respHeaders,
    });
  } else {
    return new Response('{"error": "Invalid username or password"}', {
      status: 400,
    });
  }
}
