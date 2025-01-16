"use client";

import React, { Suspense, useEffect, useState } from "react";
import EmptyState from "./EmptyState";
import { useUser } from "@clerk/nextjs";
import { getVideoLists } from "@/lib/actions";
import { VideoData } from "@/lib/types";
import PlayerDialog from "./PlayerDialog";
import Loading from "@/lib/Loader";

const VideoList = React.lazy(() => import("./VideoList"));

const VideoCard = () => {
  const [videoLists, setVideoLists] = useState<VideoData[]>([]);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [videoId, setVideoId] = useState<number>();

  const { user } = useUser();

  useEffect(() => {
    const fetchVideoLists = async () => {
      if (user && user.fullName) {
        const res = await getVideoLists(user.fullName);

        setVideoLists(res?.videoLists as VideoData[]);
      }
    };

    fetchVideoLists();
  }, [user]);

  return (
    <>
      {user && videoLists.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 gap-y-6 place-items-center">
          <Suspense fallback={<Loading />}>
            <VideoList videoLists={videoLists} setVideoId={setVideoId} setOpenDialog={setOpenDialog} />
          </Suspense>

          {videoId && openDialog && <PlayerDialog videoId={videoId} playVideo={openDialog} />}
        </div>
      ) : (
        <EmptyState />
      )}
    </>
  );
};

export default VideoCard;
