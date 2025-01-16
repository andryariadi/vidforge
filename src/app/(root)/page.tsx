import ButtonMotion from "@/components/Button";
import { stepGenerateVideo } from "../constant";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4.5rem)] px-10 py-10 space-y-20">
      {/* Title */}
      <div className="text-center space-y-3 text-gray-400">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
          Build Your Short Video <span className="text-orange-1">With AI</span>
        </h1>
        <p className="text-lg md:text-2xl">Effortlessly Build AI-Generated Short Video in Minutes</p>
      </div>

      {/* Get Started */}
      <div className="flex items-center justify-center gap-5">
        <ButtonMotion title="Get Started" link="/create-video" icon />
        <ButtonMotion title="Watch Video" link="/dashboard" icon />
      </div>

      {/* How it works */}
      <div className="bg-black-2 w-full max-w-6xl border border-gray-600/50 rounded-lg flex flex-col items-center justify-center gap-10 mx-auto p-10">
        <div className="space-y-2 text-center">
          <h2 className="text-4xl font-bold text-orange-1 text-nowrap">How it Works?</h2>
          <p className="text-gray-400">In just 4 easy steps you can build your video</p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 p-4 md:p-5">
          {stepGenerateVideo.map((step) => (
            <figure key={step.title} className="bg-black-1 rounded-lg border border-gray-600/50 shadow-lg p-5 text-center space-y-3 hover:border-orange-1 transition-all duration-300">
              <h2 className="text-base md:text-xl font-bold text-nowrap text-white-1/90">{step.title}</h2>
              <figcaption className="text-sm text-gray-400 text-balance">{step.desc}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
