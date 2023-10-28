import { ComponentPropsWithoutRef, FC } from "react";
import { botInviteUrl } from "stores/url/bot";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import { ExternalLink } from "components/elements/link";
import { ExternalLinkIcon } from "components/icon/externalLink";

type Props = Pick<ComponentPropsWithoutRef<"div">, "className">;

const Bot: FC<Props> = ({ className }) => {
  return (
    <ExternalLink url={botInviteUrl} className="transition-none hover:text-white">
      <div className="group h-36 w-48 rounded-lg bg-green-800 p-3 shadow-[3px_3px_25px_0] shadow-black/30 transition hover:scale-105">
        <div
          className={twMerge(
            "box-border flex h-full w-full flex-col items-start justify-between rounded-lg  bg-green-800 p-2 shadow-[2px_2px_20px_0] shadow-black/50  transition",
            className,
          )}
        >
          <span className="h-[4.5rem] w-[4.5rem]">
            <Image priority loading="eager" src="/icon.PNG" alt="icon image at Astvel" width={128} height={128} />
          </span>
          <div className="flex w-full items-center">
            <div className="w-0 flex-1 ">
              <span className="inline-block min-w-[4rem] max-w-full truncate text-center">Invite Bot</span>
            </div>
            <ExternalLinkIcon className="h-4 w-4 -rotate-90 stroke-white transition duration-200 group-hover:scale-110" />
          </div>
        </div>
      </div>
    </ExternalLink>
  );
};

export { Bot };
