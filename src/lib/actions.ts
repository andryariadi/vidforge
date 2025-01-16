"use server";

import { db } from "@/db/config-db";
import { VideoData, Users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { User as UserDetail } from "./types";
import { revalidatePath } from "next/cache";

export const getVideoData = async (videoId: number) => {
  try {
    const videoData = await db.select().from(VideoData).where(eq(VideoData.id, videoId));

    return { success: true, videoData };
  } catch (error) {
    console.log(error, "<---errorGetVideoData");
  }
};

export const getVideoLists = async (username: string) => {
  try {
    const videoLists = await db.select().from(VideoData).where(eq(VideoData.createdBy, username));

    return { success: true, videoLists };
  } catch (error) {
    console.log(error, "<---errorGetVideoLists");
  }
};

export const getUserDetail = async (email: string) => {
  try {
    const user = await db.select().from(Users).where(eq(Users.email, email));

    return { success: true, user };
  } catch (error) {
    console.log(error, "<---errorGetUserDetail");
  }
};

export const updateUserCredits = async ({ userEmail, userDetail }: { userEmail: string; userDetail: UserDetail }) => {
  try {
    await db
      .update(Users)
      .set({
        credits: userDetail?.credits && userDetail?.credits - 10,
      })
      .where(eq(Users?.email, userEmail));

    revalidatePath("/create-video");
  } catch (error) {
    console.log(error, "<---diupdateUserCredits");
  }
};
