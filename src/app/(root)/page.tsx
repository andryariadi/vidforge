import ButtonMotion from "@/components/Button";

export default function Home() {
  return (
    <div className="b-amber-600 min-h-[calc(100vh-4.5rem)] px-10 pt-10 space-y-20">
      {/* Title */}
      <div className="b-rose-600 text-center space-y-3 text-gray-400">
        <h1 className="text-6xl font-bold">
          Build Your Short Video <span className="text-orange-1">With AI</span>
        </h1>
        <p className="text-xl">Effortlessly Build AI-Generated Short Video in Minutes</p>
      </div>

      {/* Get Started */}
      <div className="b-violet-600 flex items-center justify-center gap-5">
        <ButtonMotion title="Get Started" link="/create-video" icon />
        <ButtonMotion title="Watch Video" link="/dashboard" icon />
      </div>

      {/* Futured */}
      <div className="bg-black-2 w-full max-w-5xl border border-gray-600/50 rounded-lg flex items-center justify-center mx-auto">
        <div className="space-y-2 text-center">
          <h2 className="text-4xl font-bold text-orange-1">How it Works?</h2>
          <p className="text-gray-400">In just 3 easy steps you can build your video</p>
        </div>
      </div>
    </div>
  );
}
