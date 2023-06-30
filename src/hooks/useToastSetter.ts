import { useRecoilState } from "recoil";
import { ToastType } from "types/recoil/toast";
import { toast, toastRefId } from "utils/recoil/toast";

const useToastSetter = () => {
  const [id, setId] = useRecoilState(toastRefId);
  const [toastData, setToast] = useRecoilState(toast);

  return ({ status, title, message }: Omit<ToastType, "open">) => {
    clearTimeout(id);
    setToast({
      ...toastData,
      open: false,
    });
    window.clearTimeout(id);
    setId(
      window.setTimeout(() => {
        setToast({
          status,
          title,
          message,
          open: true,
        });
      }, 100),
    );
  };
};

export default useToastSetter;
