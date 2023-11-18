import { FC } from "react";
import Image from "next/image";

const NoSignIn: FC = () => (
  <div className="grid grid-rows-[3rem_,_8rem_,_1fr] items-center justify-items-center gap-4 tablet:grid-cols-[8rem_,_18rem] tablet:grid-rows-[3rem_,_1fr]">
    <p className="text-4xl font-bold">No Sign in</p>
    <div className="h-fit w-fit tablet:col-span-1 tablet:row-[1_/_3]">
      <Image src="/space/astronaut.png" alt="astronaut image" priority loading="eager" height={128} width={128} />
    </div>
    <div className="flex flex-col items-center justify-center space-y-2 text-center">
      <p>You didn&apos;t sign in on discord, did you?</p>
      <p>Please Sign in on Discord.</p>
    </div>
  </div>
);

export { NoSignIn };
