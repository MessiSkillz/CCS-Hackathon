import Redis from "ioredis";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REDIS_URL: string;
    }
  }
}

const client = new Redis(process.env.REDIS_URL);

export const runtime = "node";

export async function GET() {
  return new Response(JSON.stringify({ data: await client.get("ngrok_link") }));
}
