"use client";

import { useEffect, useState } from "react";
import EmptyState from "./EmptyState";
import { useUser } from "@clerk/nextjs";
import { getVideoLists } from "@/lib/actions";
import { VideoData } from "@/lib/types";
import { Thumbnail } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import PlayerDialog from "./PlayerDialog";

const VideoCard = () => {
  const [videoLists, setVideoLists] = useState<VideoData[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [videoId, setVideoId] = useState<number>();
  const [compositionWidth, setCompositionWidth] = useState(250);

  const { user } = useUser();

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

  useEffect(() => {
    const fetchVideoLists = async () => {
      if (user && user.fullName) {
        const res = await getVideoLists(user.fullName);

        setVideoLists(res?.videoLists as VideoData[]);
      }
    };

    fetchVideoLists();
  }, [user]);

  console.log({ videoLists, user, compositionWidth }, "<---VideoCard");

  return (
    <>
      {/* Empty Video */}
      {videoLists.length === 0 && <EmptyState />}

      {/* Video Lists */}
      <div className="b-rose-700 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 gap-y-6 place-items-center">
        {videoLists.map((video) => (
          <figure key={video.id} className="b-violet-600 w-fit overflow-hidden" onClick={() => handleClickVideoDialog(video.id)}>
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

        {videoId && openDialog && <PlayerDialog videoId={videoId} playVideo={openDialog} />}
      </div>
    </>
  );
};

export default VideoCard;
