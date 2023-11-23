import { NextJSIcon } from "components/icon/social/nextjs";
import { RadixUIIcon } from "components/icon/social/radixUI";
import { ReactIcon } from "components/icon/social/react";
import { SocketIoIcon } from "components/icon/social/socketIo";
import { SwrIcon } from "components/icon/social/swr";
import { TailwindcssIcon } from "components/icon/social/tailwindcss";
import { FC } from "react";

const Build: FC = () => {
  return (
    <div className="relative grid h-20 w-full grid-cols-12 items-center gap-6">
      <div className="col-[2_/_12] box-border flex h-full flex-col items-center space-y-2 rounded-xl  bg-black-2 p-3 shadow-lg shadow-black">
        <p className="text-center text-sm">
          The app is built on +20 <br className="tablet:hidden" />
          libraries and frameworks
        </p>
        <div className="flex w-full grow items-center justify-center space-x-2 overflow-auto">
          <NextJSIcon size={24} />
          <ReactIcon size={24} />
          <TailwindcssIcon size={24} />
          <RadixUIIcon size={24} />
          <SocketIoIcon size={24} />
          <SwrIcon size={24} />
        </div>
      </div>
    </div>
  );
};

export { Build };
