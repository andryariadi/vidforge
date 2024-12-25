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
    time: "15-second",
  },
  {
    id: 2,
    time: "30-second",
  },
  {
    id: 2,
    time: "60-second",
  },
];

export const themeVideo = [
  {
    name: "Realistic",
    imgUrl: "/realistic.jpg",
  },
  {
    name: "Cartoon",
    imgUrl: "/cartoon.jpg",
  },
  {
    name: "Comic",
    imgUrl: "/comic.jpg",
  },
  {
    name: "WaterColor",
    imgUrl: "/water-color.jpg",
  },
  {
    name: "GTA",
    imgUrl: "/gta.jpg",
  },
];

// Write a script to generate 30 seconds video on topic : Interesting historical story along with AI image prompt in Realistic format for each scene and give me result in JSON format with imagePrompt and ContentText as field

// {
//   "video_script": [
//     {
//       "scene_number": 1,
//       "duration": 5,
//       "imagePrompt": "A bustling, slightly chaotic 18th-century Parisian street scene. Cobblestone streets, horse-drawn carriages, vendors with stalls, and people in period clothing. Sunlight filters through the buildings, creating long shadows. Focus on a small bakery with freshly baked bread displayed in the window. Realistic painting style",
//       "contentText": "In 1766, a Parisian baker named Antoine Parmentier wasn't interested in making bread. He was obsessed with potatoes, a food considered fit only for pigs back then."
//     },
//     {
//       "scene_number": 2,
//       "duration": 7,
//        "imagePrompt": "A close-up shot of Antoine Parmentier, a man in his early 30s, wearing simple 18th-century clothing. He holds a potato in his hand and stares at it with a determined expression. He’s in a small, dimly lit room, possibly a study or a kitchen. realistic lighting and texture.",
//       "contentText": "Despite the common belief, he knew potatoes could be more. He had survived on them while imprisoned as a war captive and recognized their nutritional value."
//     },
//     {
//       "scene_number": 3,
//       "duration": 8,
//        "imagePrompt": "A wide shot of the gardens of Les Invalides in Paris. Guards in their uniforms surround a large patch of land fenced off with a sign that reads 'Potatoes. Do Not Disturb.' People in the background are curious, looking from a distance. The scene is brightly lit, on a sunny day. Realistic painting style",
//       "contentText": "Parmentier undertook a clever strategy. He planted potatoes in the gardens of Les Invalides, heavily guarded by soldiers during the day, implying they held great importance."
//     },
//     {
//       "scene_number": 4,
//       "duration": 6,
//       "imagePrompt": "A night scene of the same potato field, but with no guards around. Common people are sneaking in, with baskets and cloth bags, to steal potatoes. Moonlight illuminates the scene, creating a sense of intrigue. Realistic and slightly cinematic.",
//        "contentText":"But at night, the guards conveniently disappeared, making the 'rare' potatoes highly desirable. Soon, Parisians started sneaking in to steal what was considered a prized item."
//     },
//      {
//        "scene_number": 5,
//       "duration": 4,
//       "imagePrompt": "A final scene, a close-up of a plate with potato dishes - a mash, fried potatoes, and a boiled potato. The scene is brightly lit and inviting. Text overlay 'Potatoes, Thanks to Parmentier' . Photorealistic style",
//       "contentText":"Parmentier’s trickery worked. Potatoes became a staple in French cuisine, all thanks to a determined baker who saw their hidden potential."
//      }

//   ]
// }
