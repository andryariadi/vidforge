"use client";
import { TbVideoPlus } from "react-icons/tb";
import { TbLayout2 } from "react-icons/tb";

import { motion } from "framer-motion";
import Link from "next/link";

const ButtonMotion = ({ title, link, icon }: { title: string; link: string; icon?: boolean }) => {
  return (
    <motion.button type="button" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.95 }} className="">
      <Link href={link} className="bg-btn w-full text-14 md:button_bold-16 px-2 md:px-5 py-[10px] rounded-md flex items-center gap-2">
        {icon && <span>{title === "Create Video" ? <TbVideoPlus size={26} /> : <TbLayout2 size={26} />}</span>}
        <span className={`${title === "Create Video" || (title === "Dashboard" && "hidden md:block")}`}>{title}</span>
      </Link>
    </motion.button>
  );
};

export default ButtonMotion;
