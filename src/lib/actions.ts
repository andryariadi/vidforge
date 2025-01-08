"use server";

import { db } from "@/db/config-db";
import { VideoData } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getVideoData = async (videoId: number) => {
  try {
    const videoData = await db.select().from(VideoData).where(eq(VideoData.id, videoId));

    console.log({ videoData }, "<---getVideoData");

    return { success: true, videoData };
  } catch (error) {
    console.log(error, "<---errorGetVideoData");
  }
};
