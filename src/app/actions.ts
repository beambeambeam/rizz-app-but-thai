"use server";

import { z } from "zod";
import { createServerAction } from "zsa";
import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";

export const rizzThisMessageUp = createServerAction()
  .input(
    z.object({
      messages: z.string().array(),
    })
  )
  .handler(async ({ input }) => {
    const prompt = `Rizz this up\n${input.messages
      .map((message) => `Her: ${message}`)
      .join("\n")}`;

    const respond = await generateText({
      model: openai("gpt-3.5-turbo"),
      system:
        "you are male, you are the best rizzler in the history of mankind, You job is find the best respond to get her to be your girl from these messages I going to get you IN THAI",
      prompt,
    });

    return {
      text: respond.text,
    };
  });
