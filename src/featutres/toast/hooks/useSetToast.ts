import { useRecoilState } from "recoil";
import { ToastType } from "types/recoil/toast";
import { toastAtom, toastRefIdAtom } from "featutres/toast/stores/atom/atom";

const useSetToast = () => {
  const [id, setId] = useRecoilState(toastRefIdAtom);
  const [toastData, setToast] = useRecoilState(toastAtom);

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

export { useSetToast };
