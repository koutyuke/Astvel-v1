import { DiscordIcon } from "components/icon/social/discord";
import { LinkIcon } from "components/icon/link";
import { Layout } from "components/layouts";
import { SignIn } from "features/signIn/components";
import { NextPageWithLayout } from "next";
import Image from "next/image";

const Signin: NextPageWithLayout = () => (
  <div className="flex h-full w-full max-w-[30rem] flex-col items-center justify-center space-y-4 text-center">
    <p className="text-5xl">Sign In</p>
    <p className="">
      This application operates a Discord bot.
      <br />
      Therefore, please log in with your Discord account.
    </p>
    <div className="flex h-32 w-full items-center justify-center space-x-4">
      <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-teal-700 p-1">
        <Image src="/icon.PNG" alt="icon" width={100} height={100} />
      </div>
      <LinkIcon size={60} />
      <div className="sm:rounded-3xl flex h-20 w-20 items-center justify-center rounded-2xl  bg-blue-700 p-2">
        <DiscordIcon size={100} />
      </div>
    </div>
    <SignIn />
  </div>
);

Signin.getLayout = page => <Layout title="Sign In - Astvel">{page}</Layout>;

export default Signin;
