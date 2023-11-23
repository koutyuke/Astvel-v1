import { FC } from "react";
import Image from "next/image";
import { ExternalLink } from "components/elements/link";
import { botInviteUrl } from "stores/url/bot";

const NotFoundGuild: FC = () => (
  <div className="grid grid-rows-[3rem_,_8rem_,_1fr] items-center justify-items-center gap-2 tablet:grid-cols-[8rem_,_18rem] tablet:grid-rows-[3rem_,_1fr]">
    <p className="text-4xl font-semibold">No Guild</p>
    <div className="h-fit w-fit tablet:col-span-1 tablet:row-[1_/_3]">
      <Image
        src="/space/crashed-rocket.png"
        alt="crashed-rocket image"
        priority
        loading="eager"
        height={128}
        width={128}
      />
    </div>
    <div className="flex flex-col items-center justify-center space-y-2 text-center">
      <p>Guild doesn&apos;t exist or has no bots in it.</p>
      <span>Please check the URL or</span>
      <span>
        <ExternalLink url={botInviteUrl} icon className="w-fit border-b  border-white hover:border-green-500">
          invite the bot
        </ExternalLink>
      </span>
    </div>
  </div>
);

export { NotFoundGuild };
