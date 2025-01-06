"use client";

import { VideoDataStore } from "@/lib/types";
import { createContext, useState } from "react";

interface VideoDataContextType {
  videoData: VideoDataStore[];
  setVideoData: (videoData: VideoDataStore[]) => void;
}

export const VideoDataContext = createContext<VideoDataContextType>({ videoData: [], setVideoData: () => [] });

export const VideoDataProviders = ({ children }: { children: React.ReactNode }) => {
  const [videoData, setVideoData] = useState<VideoDataStore[]>([]);

  return <VideoDataContext.Provider value={{ videoData, setVideoData }}>{children}</VideoDataContext.Provider>;
};
