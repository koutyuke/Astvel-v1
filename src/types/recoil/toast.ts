export type ToastType = {
  open: boolean;
  title: string;
  message: string;
  status: "success" | "error" | "warning" | "information";
};
