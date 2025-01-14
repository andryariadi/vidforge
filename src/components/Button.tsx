"use client";
import { TbVideoPlus } from "react-icons/tb";
import { TbLayout2 } from "react-icons/tb";
import { IoPlayForwardOutline } from "react-icons/io5";
import { HiVideoCamera } from "react-icons/hi";

import { motion } from "framer-motion";
import Link from "next/link";

const ButtonMotion = ({ title, link, icon }: { title: string; link: string; icon?: boolean }) => {
  let icons;

  if (title === "Create Video") {
    icons = <TbVideoPlus size={26} />;
  } else if (title === "Dashboard") {
    icons = <TbLayout2 size={26} />;
  } else if (title === "Get Started") {
    icons = <IoPlayForwardOutline size={26} />;
  } else if (title === "Watch Video") {
    icons = <HiVideoCamera size={26} className="text-orange-1" />;
  }

  return (
    <motion.button type="button" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.95 }} className="">
      <Link href={link} className={`${title === "Watch Video" ? "bg-transparent border-2 border-orange-1" : "bg-btn"} w-full text-14 md:button_bold-16 px-2 md:px-5 py-[10px] rounded-md flex items-center gap-2`}>
        {icon && <span>{icons}</span>}

        <span className={`${title === "Create Video" || (title === "Dashboard" && "hidden md:block")} ${title === "Watch Video" ? "text-orange-1" : "text-white-1"}`}>{title}</span>
      </Link>
    </motion.button>
  );
};

export default ButtonMotion;
