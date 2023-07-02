import { FC, ReactNode } from "react";

type Props = {
  title: string;
  children: string | ReactNode;
};

const ErrorMessage: FC<Props> = ({ title, children }) => (
  <div className="flex items-center justify-center space-x-4">
    <div className="w-64 text-end text-6xl">{title}</div>
    <div className="h-32 w-[2px] bg-white" />

    <div className="h-full w-64 text-start text-2xl">{children}</div>
  </div>
);

export default ErrorMessage;
