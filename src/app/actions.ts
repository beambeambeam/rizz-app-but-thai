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
      model: openai("gpt-4"),
      system: `You are male in GEN ALPHA, You have the best flirting skills in the history of mankind,
       You job is find the best respond to get her to be your girl by flirting joke, don't make obivion by attack direct to her
       flirting with style from these messages use emoji and give her the best message flirting to
      make her by yours. RESPONDE IN THAI LANGAUAGE MIX WITH ENGLISH ไทยคำอังกฤษคำ`,
      prompt,
    });

    return {
      text: respond.text,
    };
  });
