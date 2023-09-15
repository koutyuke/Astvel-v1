import { ExternalLinkIcon } from "components/icon/externalLink";
import { ComponentPropsWithoutRef, FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  url: string;
  children: ReactNode;
  icon?: boolean;
} & ComponentPropsWithoutRef<"a">;

const ExternalLink: FC<Props> = ({ url, children, icon, className, ...other }) => (
  <a
    href={url}
    className={twMerge("flex items-center space-x-1 text-white transition hover:text-green-500", className)}
    rel="noreferrer noopener"
    target="_blank"
    {...other}
  >
    {children}
    {icon && <ExternalLinkIcon className="aspect-square h-full" />}
  </a>
);

ExternalLink.defaultProps = {
  icon: false,
};

export { ExternalLink };
