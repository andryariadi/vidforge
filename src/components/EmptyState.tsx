import { IoVideocamOff } from "react-icons/io5";
import ButtonMotion from "./Button";

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 border-dashed border-4 border-gray-1 p-10 rounded-lg">
      <IoVideocamOff size={100} className="text-orange-1 hover:scale-110 transition-all duration-300" />
      <h2 className="text-16 font-bold">You don&apos;t have any video yet</h2>
      <ButtonMotion title="Generate New Video" link="/create-video" />
    </div>
  );
};

export default EmptyState;
