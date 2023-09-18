import { FC, ReactNode } from "react";
import { TbTriangleInvertedFilled } from "react-icons/tb";

type Props = {
  label: string;
  children: ReactNode;
};

const Label: FC<Props> = ({ label, children }) => (
  <div className="flex w-full flex-col space-y-1">
    <div className="flex w-full items-center justify-start space-x-1">
      <TbTriangleInvertedFilled size={10} color="#6B7280" />
      <p className="text-sm text-gray-500">{label}</p>
    </div>
    {children}
  </div>
);

export { Label };