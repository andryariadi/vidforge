// "use client";

import LeftSidebar from "@/components/LeftSidebar";
import { VideoDataProviders } from "@/components/VidoeDataContext";
// import { useVideoDataStore } from "@/lib/useVideoDataStore";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  // const { videoData } = useVideoDataStore();

  // console.log(videoData, "<---diDashboardLayout");

  return (
    <main className="b-amber-500 flex px-10 min-h-[calc(100vh-4.5rem)]">
      <LeftSidebar />
      <VideoDataProviders>{children}</VideoDataProviders>
    </main>
  );
};

export default DashboardLayout;
