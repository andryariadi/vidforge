import { chatSession } from "@/lib/geminiModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const result = await chatSession.sendMessage(prompt);

    console.log({ prompt, res: JSON.parse(result.response.text()) }, "<---dicreatevideoscript");

    return NextResponse.json({ result: JSON.parse(result.response.text()) });
  } catch (error) {
    const errorAsError = error as Error;
    console.log(errorAsError, "<---dicreatevideoscript");
    return NextResponse.json({ Error: errorAsError.message });
  }
}
