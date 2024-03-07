import Redis from "ioredis";

const client = new Redis(process.env.REDIS_URL);

export async function GET() {
  return { data: await client.get("ngrok_link") };
}
