import { FC } from "react";
import Image from "next/image";

const NoSignIn: FC = () => (
  <div className="flex h-full w-full items-center justify-center space-x-4">
    <Image src="/space/astronaut.png" alt="asrtonaut" height={100} width={100} />
    <div className="flex flex-col items-center justify-center space-y-2 text-center">
      <p className="text-4xl">No Sign In !!</p>
      <p>You didn&apos;t sign in on discord, did you?</p>
      <p>Please Signin on Discord.</p>
    </div>
  </div>
);

export default NoSignIn;
