"use server";

import { db } from "@/db/config-db";
import { VideoData, Users } from "@/db/schema";
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

export const getVideoLists = async (username: string) => {
  try {
    const videoLists = await db.select().from(VideoData).where(eq(VideoData.createdBy, username));

    console.log({ videoLists }, "<---getVideoLists");

    return { success: true, videoLists };
  } catch (error) {
    console.log(error, "<---errorGetVideoLists");
  }
};

export const getUserDetail = async (email: string) => {
  try {
    const user = await db.select().from(Users).where(eq(Users.email, email));

    console.log({ user }, "<---getUserDetail");

    return { success: true, user };
  } catch (error) {
    console.log(error, "<---errorGetUserDetail");
  }
};
