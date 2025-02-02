"use client";

import { sidebarLinks } from "@/app/constant";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LeftSidebar = () => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[10rem] lg:max-w-[12rem] xl:max-w-[18rem] left_sidebar">
      <aside className="xl:pl-3">
        {sidebarLinks.map((item) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
          return (
            <Link
              key={item.label}
              href={item.route}
              className={cn("flex items-center gap-3 py-5 max-lg:px-4 justify-start hover:text-orange-1 transition-all duration-300", {
                "bg-nav-focus border-r-4 border-orange-1": isActive,
              })}
            >
              <span>{item.icon}</span>
              <span className="text-base font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </aside>
    </section>
  );
};

export default LeftSidebar;
