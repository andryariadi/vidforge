import { AssemblyAI } from "assemblyai";
import { NextResponse } from "next/server";

const client = new AssemblyAI({
  apiKey: process.env.ASSEMBLY_API_KEY as string,
});

export async function POST(req: Request) {
  try {
    const { audioFileUrl } = await req.json();

    const transcript = await client.transcripts.transcribe({
      audio: audioFileUrl,
      speaker_labels: true,
    });

    if (transcript.status === "error") {
      console.error(`Transcription failed: ${transcript.error}`);
      process.exit(1);
    }

    console.log(transcript.text, "<---transcriptText");
    // console.log(transcript.words, "<---transcriptWords");

    for (const utterance of transcript.utterances!) {
      console.log(`Speaker ${utterance.speaker}: ${utterance.text}`);
    }

    return NextResponse.json({ result: "success", transcript });
  } catch (error) {
    const errorAsError = error as Error;
    console.log(errorAsError, "<---dierrorGenerateCaption");
    return NextResponse.json({ Error: errorAsError.message });
  }
}
