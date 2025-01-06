import { create } from "zustand";
// import { VideoDataStore } from "./types";

interface VideoStore {
  videoData: {
    videoScripts: { imagePrompt: string; contentText: string }[]; // Array of objects for video scripts
    audioFileUrl: string; // String for audio file URL
    caption: string; // String for caption
    imageLists: string[]; // Array of strings for image URLs
  }[];
  setVideoData: (scenes: { imagePrompt: string; contentText: string }[], audioFileUrl: string, caption: string, images: string[]) => void;
}

export const useVideoDataStore = create<VideoStore>((set) => ({
  videoData: [],

  setVideoData: (scenes, audioFileUrl, caption, images) => {
    console.log(scenes, audioFileUrl, caption, images, "<---useVideoStore");

    const newVideoData = {
      videoScripts: scenes.map((scene) => ({
        imagePrompt: scene.imagePrompt,
        contentText: scene.contentText,
      })),
      audioFileUrl,
      caption,
      imageLists: images,
    };

    console.log({ newVideoData }, "<---useVideoStore2");

    set((prev) => ({
      videoData: [newVideoData, ...prev.videoData],
    }));
  },
}));
