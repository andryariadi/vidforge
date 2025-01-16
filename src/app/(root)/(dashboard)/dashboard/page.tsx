import ButtonMotion from "@/components/Button";
import VideoCard from "@/components/VideoCard";

const DashboardPage = () => {
  return (
    <div className="w-full max-w-7xl px-5 md:px-10 py-5 h-[100rem] space-y-7">
      {/* Header */}
      <header className="flex items-center justify-between">
        <h1 className="text-16 md:text-20 font-bold text-orange-1">Dashboard</h1>
        <ButtonMotion title="Create Video" link="/create-video" icon />
      </header>

      {/* Video */}
      <section>
        <VideoCard />
      </section>
    </div>
  );
};

export default DashboardPage;
