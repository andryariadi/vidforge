import { NextResponse } from "next/server";

import textToSpeech from "@google-cloud/text-to-speech";
import * as fs from "fs";
import * as util from "util";

const client = new textToSpeech.TextToSpeechClient({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { text, id } = await req.json();

    const request = {
      input: { text: text },
      // Select the language and SSML voice gender (optional)
      voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
      // select the type of audio encoding
      audioConfig: { audioEncoding: "MP3" },
    };

    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);
    // Write the binary audio content to a local file
    const writeFile = util.promisify(fs.writeFile);
    await writeFile("output.mp3", response.audioContent, "binary");

    console.log({ text, id, request, response }, "<---digenerateAudio");

    return NextResponse.json({ result: "success" });
  } catch (error) {
    const errorAsError = error as Error;
    console.log(errorAsError, "<---dierrorGenerateAudio");
    return NextResponse.json({ Error: errorAsError.message });
  }
}
