import CreditsCard from "@/components/CreditsCard";

const UpgradeCredits = () => {
  return (
    <div className="b-amber-500 w-full max-w-7xl px-5 md:px-10 py-5 min-h-[calc(100vh-4.5rem)] space-y-7">
      {/* Header */}
      <header className="flex flex-col justify-center gap-1">
        <h1 className="text-16 md:text-20 font-bold text-orange-1">Buy Credits</h1>
        <p className="text-12 text-gray-400">Unlock endless possibilities - Buy more credits and generate your short video with AI magic ✨</p>
      </header>

      {/* Card */}
      <section>
        <CreditsCard />
      </section>
    </div>
  );
};

export default UpgradeCredits;
