import "server-only";
import { env } from "~/env";

export async function checkApiKey() {
  return env.OPEN_AI_API_KEY != undefined;
}
