"use client";

import Image from "next/image";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import ButtonMotion from "./Button";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useUserStore } from "@/lib/useUserStore";
import { User } from "@/lib/types";
import { getUserDetail } from "@/lib/actions";
import { PiCoinsFill } from "react-icons/pi";

const Navbar = () => {
  const { user } = useUser();
  const pathName = usePathname();

  const { user: userDetail, setUser } = useUserStore();

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!user?.primaryEmailAddress?.emailAddress) return;

      try {
        const res = await getUserDetail(user.primaryEmailAddress.emailAddress);

        if (res?.user) {
          setUser(res.user[0] as User);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserDetails();
  }, [user, setUser]);

  return (
    <nav className="bg-transparent bg-opacity-90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-black-6 px-10 min-h-[4.5rem] flex items-center justify-between">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/logo.svg" alt="logo" width={30} height={30} className="object-cover hover:scale-110 transition-all duration-300" />
        <span className="font-bold text-lg md:text-2xl">VidForge</span>
      </Link>

      <div className="flex items-center gap-2 md:gap-5">
        {/* Credits */}
        {user && userDetail?.credits !== undefined && userDetail.credits >= 0 && (
          <div className="flex items-center gap-2">
            <PiCoinsFill size={24} className="text-yellow-500" />
            <span>{userDetail.credits}</span>
          </div>
        )}

        {user && <UserButton />}

        {pathName !== "/dashboard" && <ButtonMotion title="Dashboard" link="/dashboard" icon />}
      </div>
    </nav>
  );
};

export default Navbar;
