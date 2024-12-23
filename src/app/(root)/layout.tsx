import Image from "next/image";
import Link from "next/link";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="b-rose-500">
      <nav className="bg-transparent bg-opacity-90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-black-6 px-5 min-h-[4.5rem] flex items-center justify-between">
        <Link href="/" className="b-sky-500 flex items-center gap-4">
          <Image src="/logo.svg" alt="logo" width={30} height={30} className="object-cover hover:scale-110 transition-all duration-300" />
          <span className="font-bold text-2xl">VidForge</span>
        </Link>

        <div className="b-green-700">
          <Link href="/dashboard" className="bg-btn button_bold-16 px-5 py-[10px] rounded-md">
            Dashboard
          </Link>
        </div>
      </nav>

      {children}
    </main>
  );
};

export default RootLayout;
