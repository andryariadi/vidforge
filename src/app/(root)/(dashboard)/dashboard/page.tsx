"use client";

import ButtonMotion from "@/components/Button";
import VideoCard from "@/components/VideoCard";
import { VideoDataContext } from "@/components/VidoeDataContext";
import { useContext } from "react";

const DashboardPage = () => {
  const { videoData } = useContext(VideoDataContext);

  console.log({ videoData }, "<---diDashboardPage");

  return (
    <div className="bg-emerald-500 w-full max-w-7xl px-10 py-5 h-[100rem] space-y-7">
      {/* Header */}
      <header className="bg-rose-500 flex items-center justify-between">
        <h1 className="text-20 font-bold text-white-1">Dashboard</h1>
        <ButtonMotion title="Create Video" link="/create-video" icon />
      </header>

      {/* Video */}
      <section className="bg-fuchsia-600">
        <VideoCard />
      </section>
    </div>
  );
};

export default DashboardPage;
