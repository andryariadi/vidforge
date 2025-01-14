import { IoVideocamOff } from "react-icons/io5";
import ButtonMotion from "./Button";

const EmptyState = () => {
  return (
    <div className="b-emerald-800 flex flex-col items-center justify-center gap-3 border-dashed border-4 border-gray-1 p-10 rounded-lg">
      <IoVideocamOff className="text-orange-1 hover:scale-110 transition-all duration-300 size-10 md:size-16 lg:size-24" />

      <h2 className="text-14 md:text-16 font-bold">You don&apos;t have any video yet</h2>

      <ButtonMotion title="Generate New Video" link="/create-video" />
    </div>
  );
};

export default EmptyState;
