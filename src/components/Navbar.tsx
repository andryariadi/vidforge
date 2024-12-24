"use client";

import Image from "next/image";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import ButtonMotion from "./Button";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { user } = useUser();
  const pathName = usePathname();

  return (
    <nav className="bg-transparent bg-opacity-90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-black-6 px-5 min-h-[4.5rem] flex items-center justify-between">
      <Link href="/" className="b-sky-500 flex items-center gap-4">
        <Image src="/logo.svg" alt="logo" width={30} height={30} className="object-cover hover:scale-110 transition-all duration-300" />
        <span className="font-bold text-2xl">VidForge</span>
      </Link>

      <div className="b-green-700 flex items-center gap-5">
        {user && <UserButton />}

        {pathName !== "/dashboard" && <ButtonMotion title="Dashboard" link="/dashboard" />}
      </div>
    </nav>
  );
};

export default Navbar;
