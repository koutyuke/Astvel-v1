import { useRef } from "react";
import { useRecoilState } from "recoil";
import { ToastType } from "types/recoil/toast";
import { toast } from "utils/recoil/toast";

const useToastSetter = () => {
  const timerRef = useRef(0);
  const [toastData, setToast] = useRecoilState(toast);

  return ({ status, title, message }: Omit<ToastType, "open">) => {
    clearTimeout(timerRef.current);
    setToast({
      ...toastData,
      open: false,
    });
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      setToast({
        status,
        title,
        message,
        open: true,
      });
    }, 100);
  };
};

export default useToastSetter;
