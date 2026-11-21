import { llmsFullTxt } from "@/lib/llms";

// Served at /llms-full.txt, built once at build time
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsFullTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
