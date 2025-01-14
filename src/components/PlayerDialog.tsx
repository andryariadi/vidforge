"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RiVideoUploadLine } from "react-icons/ri";
import { getVideoData } from "@/lib/actions";
import { VideoData } from "@/lib/types";
import { useRouter } from "next/navigation";

const PlayerDialog = ({ playVideo, videoId }: { playVideo: boolean; videoId: number }) => {
  const router = useRouter();

  const [openDialog, setOpenDialog] = useState(false);
  const [videoData, setvideoData] = useState<VideoData[]>([]);
  const [durationInFrame, setDurationInFrame] = useState<number>(100);

  useEffect(() => {
    const asyncLoadVideoData = async () => {
      setOpenDialog(playVideo);

      if (videoId) {
        const res = await getVideoData(videoId);
        console.log(res, "<---playerDialog");

        setvideoData(res?.videoData as VideoData[]);
      }
    };
    asyncLoadVideoData();
  }, [playVideo, videoId]);

  return (
    <Dialog open={openDialog}>
      <DialogContent className="border-orange-1 flex flex-col items-center">
        <DialogHeader className="space-y-5">
          <DialogTitle className="text-2xl font-bold text-center">Your vidoe is ready to publish</DialogTitle>

          <DialogDescription className="b-violet-600 flex flex-col items-center gap-5 rounded-lg overflow-hidden">
            <Player
              component={RemotionVideo}
              durationInFrames={Number(durationInFrame.toFixed(0))}
              compositionWidth={300}
              compositionHeight={450}
              fps={30}
              controls
              inputProps={{
                videoData: videoData[0],
                setDurationInFrame: (durationInFrame: number) => setDurationInFrame(durationInFrame),
              }}
            />

            <div className="w-full flex items-center justify-between">
              <motion.button
                onClick={() => {
                  router.replace("/dashboard");
                  setOpenDialog(false);
                }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-orange-1 button_bold-16 px-5 py-[10px] rounded-md"
              >
                <span className="text-orange-1">Cancel</span>
              </motion.button>

              <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.95 }} className="bg-btn button_bold-16 px-5 py-[10px] rounded-md flex items-center gap-2">
                <span className="text-md">Export</span>
                <RiVideoUploadLine size={22} />
              </motion.button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PlayerDialog;
