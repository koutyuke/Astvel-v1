import * as Toast from "@radix-ui/react-toast";
import { FC, ReactNode } from "react";
import { IoCheckmarkCircleOutline, IoClose, IoInformationCircleOutline, IoWarningOutline } from "react-icons/io5";
import { MdOutlineDoNotDisturbAlt } from "react-icons/md";
import { useRecoilState } from "recoil";
import { toast } from "utils/recoil/elements";
import style from "./index.module.scss";

const BaseToast: FC = () => {
  const [toastData, setToast] = useRecoilState(toast);
  const { status, open, message, title } = toastData;

  const setToastData = (value: boolean) => {
    setToast({
      ...toastData,
      open: value,
    });
  };

  let iconNode: ReactNode;
  let bgColor: string;

  switch (status) {
    case "success":
      iconNode = <IoCheckmarkCircleOutline size={32} className="col-[1] row-[1_/_3] m-auto" />;
      bgColor = "bg-emerald-400";
      break;
    case "warning":
      iconNode = <IoWarningOutline size={32} className="col-[1] row-[1_/_3] m-auto" />;
      bgColor = "bg-amber-400";
      break;
    case "error":
      iconNode = <MdOutlineDoNotDisturbAlt size={32} className="col-[1] row-[1_/_3] m-auto" />;
      bgColor = "bg-red-400";
      break;
    case "information":
      iconNode = <IoInformationCircleOutline size={32} className="col-[1] row-[1_/_3] m-auto" />;
      bgColor = "bg-cyan-400";
      break;

    default:
      iconNode = <div>error</div>;
      bgColor = "";
  }

  return (
    <Toast.Provider swipeDirection="right" duration={5000}>
      <Toast.Root
        open={open}
        onOpenChange={setToastData}
        className={`${style.animation} ${bgColor} z-[999] grid h-16 min-w-[12rem] grid-cols-[2rem_1fr_20px] grid-rows-2 items-center justify-center gap-x-4 rounded-lg px-4 py-2 text-white data-[swipe=cancel]:translate-x-0`}
      >
        {iconNode}
        <Toast.Title className="text-lg font-semibold">{title}</Toast.Title>
        <Toast.Description className="pl-2 text-sm">{message}</Toast.Description>
        <Toast.Action asChild altText="close toast" className="col-[3] row-[1_/_3] m-auto">
          <button type="button">
            <IoClose size={20} />
          </button>
        </Toast.Action>
      </Toast.Root>

      <Toast.Viewport className="fixed bottom-6 right-8" />
    </Toast.Provider>
  );
};

export default BaseToast;
