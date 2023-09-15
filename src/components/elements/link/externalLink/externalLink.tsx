import { ExternalLinkIcon } from "components/icon/externalLink";
import { FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  url: string;
  children: ReactNode;
  icon: boolean;
};

const ExternalLink: FC<Props> = ({ url, children, icon }) => (
  <a
    href={url}
    className={twMerge("flex items-center text-white hover:text-green-500")}
    rel="noreferrer noopener"
    target="_blank"
  >
    {children}
    {icon && <ExternalLinkIcon />}
  </a>
);

export { ExternalLink };
