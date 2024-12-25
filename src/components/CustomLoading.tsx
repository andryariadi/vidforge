import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import Image from "next/image";

const CustomLoading = ({ loading }: { loading: boolean }) => {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <div className="bg-white-1 p-5 rounded-lg flex flex-col items-center gap-5">
          <Image src={"/progress.gif"} alt="loading" width={100} height={100} />
          <p className="text-16 text-black-2">Genereting your video... Do not Refresh!</p>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomLoading;
