// const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey!);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,
  history: [
    {
      role: "user",
      parts: [{ text: 'Create a script for a 30-second video on an interesting historical story, including a realistic AI image prompt for each scene. Present the results in JSON format with the fields "imagePrompt" and "ContentText."' }],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "imagePrompt": "A dimly lit, 18th-century London coffee house, men in wigs and coats seated at wooden tables, some reading newspapers, others engaged in animated conversation. A quill pen and inkwell sit on a table in the foreground. Smoke from pipes fills the air, creating a hazy atmosphere. Emphasis on low lighting and warm tones.",\n    "ContentText": "In 18th-century London, coffee houses weren\'t just places for caffeine. They were hubs of intellectual debate, where ideas sparked."\n  },\n   {\n    "imagePrompt": "A close-up, slightly blurry view of a handwritten ledger, the page filled with elegant script and complex calculations, with a large \'Lloyds\' logo visible, faded in the background. The focus is on the pen strokes and old paper texture. Subtle hints of maps and ships can be seen in the background.",\n    "ContentText": "One, Edward Lloyd\'s coffee shop, became a meeting point for merchants and ship owners. They’d track their vessels and cargos in meticulous ledgers."\n  },\n  {\n    "imagePrompt": "A wide, almost bird\'s-eye view of a bustling London port in the 1700s. Numerous sailing ships with tall masts are docked, surrounded by crates, carts, and busy dock workers. A large, detailed ship can be seen in the foreground, with a vibrant color scheme. The sun is shining, casting long shadows.",\n   "ContentText": "Their collective knowledge about ship voyages and risks eventually led to the creation of... Lloyds of London – an insurance market."\n  },\n   {\n    "imagePrompt": "A contemporary, well-lit office with people working at computers, but in the background, subtle architectural details and old maps on the walls hint at its historical roots. A single, framed piece of paper depicting a handwritten ledger sits on the desk of a woman on the right. Focus on modern technology juxtaposed with historical artifacts.",\n    "ContentText": "Today, Lloyds of London is a global insurance powerhouse, but it all started with lively conversations in a humble coffee house."\n  }\n]\n```\n',
        },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
