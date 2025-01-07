"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { RiVideoUploadLine } from "react-icons/ri";

const PlayerDialog = ({ playVidoe, videoId }: { playVidoe: boolean; videoId: number }) => {
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    setOpenDialog(playVidoe);
  }, [playVidoe]);

  return (
    <Dialog open={openDialog}>
      <DialogContent className="border-orange-1 flex flex-col items-center">
        <DialogHeader className="space-y-5">
          <DialogTitle className="text-2xl font-bold text-center">Your vidoe is ready to publish</DialogTitle>

          <DialogDescription className="bg-violet-600 flex flex-col items-center">
            <Player component={RemotionVideo} durationInFrames={120} compositionWidth={300} compositionHeight={450} fps={30} />

            <div className="w-full flex items-center justify-between">
              <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.95 }} className="border-2 border-orange-1 button_bold-16 px-5 py-[10px] rounded-md">
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
