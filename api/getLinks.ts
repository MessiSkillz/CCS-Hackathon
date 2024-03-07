import Redis from "ioredis";

const client = new Redis(process.env.REDIS_URL);

export const runtime = "node";

export async function GET() {
  return new Response(JSON.stringify({ data: await client.get("ngrok_link") }));
}
