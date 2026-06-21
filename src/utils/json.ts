// JSON helpers shared by the content service. `cleanJson` mirrors
// LingoRepository.cleanJson from the original High5 app — it strips Markdown
// code fences that LLMs sometimes wrap structured output in.

export function cleanJson(raw: string): string {
  let cleaned = raw.trim();
  if (cleaned.startsWith("```json")) cleaned = cleaned.slice("```json".length);
  else if (cleaned.startsWith("```")) cleaned = cleaned.slice("```".length);
  if (cleaned.endsWith("```")) cleaned = cleaned.slice(0, -3);
  return cleaned.trim();
}

export function parseJson<T>(raw: string): T {
  return JSON.parse(cleanJson(raw)) as T;
}
