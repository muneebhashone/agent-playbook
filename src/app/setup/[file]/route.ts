import { buildSetupDoc, buildSkillsDoc, setupFiles, skillsFile, type PromptTarget } from "@/content/agent-prompt";
import { SITE_URL } from "@/content/site";

// Rebuilt on every deploy, so agents always fetch the current playbook.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return [...Object.values(setupFiles), skillsFile].map((file) => ({ file }));
}

export async function GET(_request: Request, ctx: RouteContext<"/setup/[file]">) {
  const { file } = await ctx.params;
  const headers = { "Content-Type": "text/markdown; charset=utf-8" };
  if (file === skillsFile) return new Response(buildSkillsDoc(), { headers });

  const target = (Object.keys(setupFiles) as PromptTarget[]).find((t) => setupFiles[t] === file);
  if (!target) return new Response("Not found", { status: 404 });

  return new Response(buildSetupDoc(SITE_URL, target), { headers });
}
