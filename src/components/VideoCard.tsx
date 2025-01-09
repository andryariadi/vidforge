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

  const { user } = useUser();

  const handleClickVideoDialog = (userId: number) => {
    setVideoId(userId);
    setOpenDialog(true);
  };

  useEffect(() => {
    const fetchVideoLists = async () => {
      if (user && user.fullName) {
        const res = await getVideoLists(user.fullName);

        setVideoLists(res?.videoLists as VideoData[]);
      }
    };

    fetchVideoLists();
  }, [user]);

  console.log({ videoLists, user }, "<---VideoCard");

  return (
    <>
      {/* Empty Video */}
      {videoLists.length === 0 && <EmptyState />}

      {/* Video Lists */}
      <div className="bg-rose-700 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-1">
        {videoLists.map((video) => (
          <figure key={video.id} className="bg-violet-600 w-fit overflow-hidden" onClick={() => handleClickVideoDialog(video.id)}>
            <Thumbnail
              component={RemotionVideo}
              compositionWidth={250}
              compositionHeight={350}
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
