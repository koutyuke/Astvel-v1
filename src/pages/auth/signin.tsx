import { Layout } from "components/layouts";
import { SignInButton } from "featutres/signIn/components";
import { NextPageWithLayout } from "next";
import Image from "next/image";
import { FaDiscord } from "react-icons/fa";
import { TbCirclesRelation } from "react-icons/tb";

const Signin: NextPageWithLayout = () => (
  <div className="flex h-full w-full max-w-[30rem] flex-col items-center justify-center space-y-4 text-center">
    <p className="text-5xl">Sign In</p>
    <p className="">
      This application operates a Discord bot.
      <br />
      Therefore, please log in with your Discord account.
    </p>
    <div className="flex h-32 w-full items-center justify-center space-x-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-teal-700 p-1 sm:h-24 sm:w-24 sm:rounded-3xl">
        <Image src="/icon.PNG" alt="icon" width={100} height={100} />
      </div>
      <TbCirclesRelation className="" size={60} />
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-700  p-2 sm:h-24 sm:w-24 sm:rounded-3xl">
        <FaDiscord size={100} />
      </div>
    </div>
    <SignInButton />
  </div>
);

Signin.getLayout = page => <Layout title="Sign In - Astvel">{page}</Layout>;

export default Signin;
