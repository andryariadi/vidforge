"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { UserButton, useUser } from "@clerk/nextjs";

const Navbar = () => {
  const { user } = useUser();

  return (
    <nav className="bg-transparent bg-opacity-90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-black-6 px-5 min-h-[4.5rem] flex items-center justify-between">
      <Link href="/" className="b-sky-500 flex items-center gap-4">
        <Image src="/logo.svg" alt="logo" width={30} height={30} className="object-cover hover:scale-110 transition-all duration-300" />
        <span className="font-bold text-2xl">VidForge</span>
      </Link>

      <div className="b-green-700 flex items-center gap-5">
        {user && <UserButton />}

        <motion.button type="button" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.95 }}>
          <Link href="/dashboard" className="bg-btn button_bold-16 px-5 py-[10px] rounded-md">
            Dashboard
          </Link>
        </motion.button>
      </div>
    </nav>
  );
};

export default Navbar;
