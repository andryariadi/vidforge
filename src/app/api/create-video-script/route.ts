import { chatSession } from "@/lib/geminiModel";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = req.json();

    const result = await chatSession.sendMessage(prompt);

    return NextResponse.json("result:", JSON.parse(result.response.text()));
  } catch (error) {
    console.log(error, "<---dicreatevideoscript");
    return NextResponse.error("Error:", error);
  }
}
