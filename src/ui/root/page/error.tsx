import { FC } from "react";
import Image from "next/image";

const AccessError: FC = () => {
  return (
    <div className="grid grid-rows-[3rem_,_8rem_,_1fr] items-center justify-items-center gap-4 tablet:grid-cols-[8rem_,_18rem] tablet:grid-rows-[3rem_,_1fr]">
      <p className="text-4xl">Access Error</p>
      <div className="h-fit w-fit tablet:col-span-1 tablet:row-[1_/_3]">
        <Image
          src="/space/destroyed-planet.png"
          alt="crashed-rocket image"
          priority
          loading="eager"
          height={128}
          width={128}
        />
      </div>
      <div className="flex flex-col items-center justify-center space-y-2 text-center">
        <p>You don&apos;t have access to this page.</p>
        <p className="leading-6">
          Please check your network or
          <br />
          Reload the page.
        </p>
      </div>
    </div>
  );
};

export { AccessError };
