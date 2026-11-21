import { llmsTxt } from "@/lib/llms";

// Served at /llms.txt, built once at build time
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
