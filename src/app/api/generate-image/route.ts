import Replicate from "replicate";
import { NextResponse } from "next/server";
import { uploadToFirebaseStorage } from "@/lib/uploadToFirebase";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request): Promise<Response> {
  try {
    const { prompt }: { prompt: string } = await req.json();

    const output = (await replicate.run("bytedance/sdxl-lightning-4step:5599ed30703defd1d160a25a63321b4dec97101d98b4674bcc56e41f62f35637", {
      input: {
        prompt,
        height: 1280,
        width: 1024,
        num_outputs: 1,
      },
    })) as string[];

    const generatedImageUrl = output[0];

    const response = await fetch(generatedImageUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch the generated image.");
    }

    const blob = await response.blob();
    const filePath = `generated-images/${Date.now()}.png`;
    const imageUrlFirebase = await uploadToFirebaseStorage(blob, filePath, "image/png");

    // console.log({ generatedImageUrl, response, blob, filePath, imageUrlFirebase }, "<---diGenerateImage");

    return NextResponse.json({ result: "success", output: imageUrlFirebase });
  } catch (error) {
    console.error("Error during image generation:", error);

    return NextResponse.json(
      {
        result: "error",
        message: error instanceof Error ? error.message : "Unknown error occurred.",
      },
      { status: 500 }
    );
  }
}
