"use client";

import { useState } from "react";
import EmptyState from "./EmptyState";

const VideoCard = () => {
  const [videoLists, setVideoLists] = useState([]);

  return <>{videoLists.length === 0 && <EmptyState />}</>;
};

export default VideoCard;
