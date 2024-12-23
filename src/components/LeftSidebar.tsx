"use client";

import { sidebarLinks } from "@/app/constant";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LeftSidebar = () => {
  const pathname = usePathname();

  console.log(pathname, "<---dileftsidebar");

  return (
    <section className="bg-rose-700 w-full max-w-[15rem] left_sidebar">
      <aside className="bg-violet-700 text-gray-400/90">
        {sidebarLinks.map((item) => {
          const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
          return (
            <Link
              key={item.label}
              href={item.route}
              className={cn("flex items-center gap-3 py-5 max-lg:px-4 justify-center lg:justify-start", {
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
