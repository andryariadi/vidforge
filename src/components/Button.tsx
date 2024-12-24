"use client";
import { TbVideoPlus } from "react-icons/tb";

import { motion } from "framer-motion";
import Link from "next/link";

const ButtonMotion = ({ title, link, icon }: { title: string; link: string; icon?: boolean }) => {
  return (
    <motion.button type="button" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.95 }} className="">
      <Link href={link} className="bg-btn button_bold-16 px-5 py-[10px] rounded-md flex items-center gap-2">
        {icon && (
          <span>
            <TbVideoPlus size={24} />
          </span>
        )}
        <span>{title}</span>
      </Link>
    </motion.button>
  );
};

export default ButtonMotion;
