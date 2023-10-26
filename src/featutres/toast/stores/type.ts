export type Toast = {
  open: boolean;
  title: string;
  message: string;
  status: "success" | "error" | "warning" | "information";
};
