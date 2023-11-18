import { ExternalLink } from "components/elements/link";
import Image from "next/image";
import { ComponentPropsWithoutRef, FC } from "react";
import { botInviteUrl } from "stores/url/bot";
import { twMerge } from "tailwind-merge";

type Props = Pick<ComponentPropsWithoutRef<"div">, "className">;

const Bot: FC<Props> = ({ className }) => {
  return (
    <div className={twMerge("grid w-full grid-cols-12 items-center gap-6", className)}>
      <h2 className=" col-[3_/_11] text-center text-4xl font-bold tablet:text-5xl">Discord Bot</h2>
      <div className="col-[2_/_12] aspect-square justify-self-center tablet:col-[3_/_7]">
        <Image src="/icon.PNG" alt="icon at astvel" className="m-auto" width={200} height={200} />
      </div>
      <div className="col-[2_/_12] space-y-4 tablet:col-[7_/_11] tablet:space-y-2">
        <h4 className="text-center text-2xl font-semibold tablet:text-start ">Note</h4>
        <ul className="list-disc space-y-2 pl-8">
          <li>Use this bot to monitor within the server.</li>
          <li>
            The permission at the time of invitation is <span className="text-red-400">Administrator</span>.
          </li>
          <li>
            If you want to eliminate the service of this application, please <span className="text-red-400">kick</span>{" "}
            this bot from the server.
          </li>
        </ul>
        <h4 className="text-center text-2xl font-semibold tablet:text-start ">Invite Bot</h4>
        <ExternalLink url={botInviteUrl} icon className="mx-auto w-fit text-start text-xl tablet:mx-0 tablet:indent-4">
          <span>Invite</span>
        </ExternalLink>
      </div>
    </div>
  );
};

export { Bot };
