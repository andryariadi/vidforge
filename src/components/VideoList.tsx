"use client";

import RemotionVideo from "@/components/RemotionVideo";
import { useEffect, useState } from "react";
import { Thumbnail } from "@remotion/player";
import { VideoData } from "../lib/types";

const VideoList = ({ videoLists, setVideoId, setOpenDialog }: { videoLists: VideoData[]; setVideoId: (userId: number) => void; setOpenDialog: (openDialog: boolean) => void }) => {
  const [compositionWidth, setCompositionWidth] = useState(250);

  const handleClickVideoDialog = (userId: number) => {
    setVideoId(userId);
    setOpenDialog(true);
  };

  // Adjust compositionWidth based on table size
  useEffect(() => {
    const handleResize = () => {
      // Assuming table width is determined by the window width for simplicity
      const tableWidth = window.innerWidth;

      // Set compositionWidth based on size
      if (tableWidth <= 834) {
        setCompositionWidth(200); // Smaller width for smaller screens
      } else {
        setCompositionWidth(250); // Larger width for larger screens
      }
    };

    // Add event listener for resize
    window.addEventListener("resize", handleResize);

    // Call once to set initial state
    handleResize();

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {videoLists.map((video) => (
        <figure key={video.id} className="b-violet-600 w-fit overflow-hidden rounded-xl" onClick={() => handleClickVideoDialog(video.id)}>
          <Thumbnail
            component={RemotionVideo}
            compositionWidth={compositionWidth} // Dynamic width
            compositionHeight={compositionWidth * 1.4} // Adjust height based on width
            frameToDisplay={30}
            durationInFrames={120}
            fps={30}
            inputProps={{
              videoData: video,
              setDurationInFrame: () => {},
            }}
            className="rounded-xl hover:scale-110 transition-all duration-300"
          />
        </figure>
      ))}
    </>
  );
};

export default VideoList;
