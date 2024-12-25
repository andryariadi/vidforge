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
      parts: [
        {
          text: 'Write a script to generate a 30-second video on the topic: "An Interesting Historical Story". The script should include multiple scenes, each with a brief narrative in realistic style. For each scene, provide:\n\nimagePrompt: A detailed AI-generated image description in a realistic format that matches the scene.\ncontentText: The text or narration describing the scene in a concise and engaging manner.\nReturn the result in JSON format with fields imagePrompt and contentText for each scene.',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "scenes": [\n    {\n      "imagePrompt": "A bustling, dimly lit 17th-century London printing shop. Men in simple, ink-stained clothes are working at several wooden printing presses. One man, with spectacles perched on his nose, is carefully inking a metal plate. Paper stacks are piled high and scattered across the wooden floor. A single oil lamp casts a warm glow on the scene, contrasting with the shadows. There\'s a sense of urgent activity and the air is thick with the smell of ink and paper.",\n      "contentText": "London, 1649. The press roars to life, not for kings, but for a radical idea: the execution of Charles I. This was the birth of public opinion as we know it."\n    },\n    {\n      "imagePrompt": "A close-up, slightly blurred view of a freshly printed sheet of paper. The text on the paper is visible, but not entirely legible due to the shallow depth of field. It\'s an early news pamphlet, printed in old English style font. The paper is aged and slightly creased, suggesting it has been handled frequently. The focus is on the ink-stained details and the texture of the paper.",\n      "contentText": "These pamphlets, printed under cover of night, spread like wildfire. For the first time, common people were shaping history, not just witnessing it."\n    },\n    {\n      "imagePrompt": "A wide shot of a crowded London street in the late afternoon. People from all walks of life, men and women in their period clothing, are huddled around a man who is dramatically reading aloud from a pamphlet. Their faces are a mix of curiosity, anger, and excitement. Buildings with timber frames line the narrow street, and the sky is a pale grey.",\n       "contentText": "News of the King\'s execution was not handed down from above. It was debated, argued, and spread by the people themselves, a revolutionary concept for the era."\n    },\n        {\n      "imagePrompt": "A montage, quickly cutting between different images: a close-up of an ink-stained hand pulling a print, a crowd reacting to news, and the Houses of Parliament in the distance. The lighting is dynamic, shifting from the warmth of the printing press to the cool daylight of the street, to the imposing silhouette of Parliament.",\n      "contentText": "The power to shape narratives shifted. The print revolution sparked public discourse, and ignited the flames of change that would forever alter the course of nations."\n    }\n\n  ]\n}\n```\n',
        },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());
