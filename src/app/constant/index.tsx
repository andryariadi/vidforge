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

export const topicVideo = [
  {
    id: 1,
    name: "Custom Prompt",
  },
  {
    id: 2,
    name: "Random AI Story",
  },
  {
    id: 3,
    name: "Scary Story",
  },
  {
    id: 4,
    name: "Historical Facts",
  },
  {
    id: 5,
    name: "Badtime Story",
  },
  {
    id: 6,
    name: "Motivational",
  },
  {
    id: 7,
    name: "Fun Facts",
  },
];

export const durationVideo = [
  {
    id: 1,
    time: "15 seconds",
  },
  {
    id: 2,
    time: "30 seconds",
  },
  {
    id: 2,
    time: "60 seconds",
  },
];
