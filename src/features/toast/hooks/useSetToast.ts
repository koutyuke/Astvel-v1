import { Toast, useToastRefIdState, useToastState } from "../stores";

const useSetToast = () => {
  const [id, setId] = useToastRefIdState();
  const [toastData, setToast] = useToastState();

  return ({ status, title, message }: Omit<Toast, "open">) => {
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
