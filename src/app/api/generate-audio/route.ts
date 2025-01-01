import { NextResponse } from "next/server";

import textToSpeech from "@google-cloud/text-to-speech";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebaseConfig";
import { uploadToFirebaseStorage } from "@/lib/uploadToFirebase";

const client = new textToSpeech.TextToSpeechClient({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { text, id } = await req.json();

    const storageRef = ref(storage, `vidforage-audio/${id}.mp3`);

    const request = {
      input: { text: text },
      // Select the language and SSML voice gender (optional)
      voice: { languageCode: "en-US", ssmlGender: "FEMALE" },
      // select the type of audio encoding
      audioConfig: { audioEncoding: "MP3" },
    };

    // Performs the text-to-speech request
    const [response] = await client.synthesizeSpeech(request);

    const audioBuffer = Buffer.from(response.audioContent, "binary");

    const filePath = `vidforage-audio/${id}.mp3`;
    const downloadURL = await uploadToFirebaseStorage(audioBuffer, filePath, "audio/mp3");

    // const downloadURL = await getDownloadURL(storageRef);

    // console.log({ text, id, request, response, audioBuffer, downloadURL }, "<---digenerateAudio");

    return NextResponse.json({ result: "success", downloadURL });
  } catch (error) {
    const errorAsError = error as Error;
    console.log(errorAsError, "<---dierrorGenerateAudio");
    return NextResponse.json({ Error: errorAsError.message });
  }
}
