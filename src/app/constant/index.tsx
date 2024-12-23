import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdVideoLibrary } from "react-icons/md";
import { BsFillPatchPlusFill } from "react-icons/bs";
import { HiUser } from "react-icons/hi2";

export const sidebarLinks = [
  {
    icon: <TbLayoutDashboardFilled size={24} />,
    route: "/dashboard",
    label: "Dashboard",
  },
  {
    icon: <MdVideoLibrary size={24} />,
    route: "/create-video",
    label: "Generate Video",
  },
  {
    icon: <BsFillPatchPlusFill size={24} />,
    route: "/upgrade",
    label: "Upgrade",
  },
  {
    icon: <HiUser size={24} />,
    route: "/profile",
    label: "Account",
  },
];
