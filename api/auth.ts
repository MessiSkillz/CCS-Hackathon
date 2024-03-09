declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REDIS_URL: string;
    }
  }
}

import { RequestCookies } from "@edge-runtime/cookies";
import Redis from "ioredis";

const client = new Redis(process.env.REDIS_URL);

export const runtime = "node";

export function GET(request: Request) {
  const cookies = new RequestCookies(request.headers);

  try {
    console.log(cookies.get("Auth")?.value)
    return client.get(`user:${cookies.get("Auth")?.value}`).then((res) => {
      if (res == null) {
        return new Response("Not authenticated", { status: 401 });
      }

      return new Response(res);
    });
  } catch (error) {
    return new Response("Not authenticated", { status: 401 });
  }
}
