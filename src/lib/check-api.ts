import "server-only";
import { env } from "~/env";

export async function checkApiKey() {
  return env.OPENAI_API_KEY != undefined;
}
