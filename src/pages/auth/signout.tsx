import SignOutButton from "components/elements/button/signInOut/signOut";
import Layout from "components/ui/layouts";
import { NextPageWithLayout } from "next";
import Image from "next/image";

const Signout: NextPageWithLayout = () => (
  <div className="flex h-full w-full max-w-[30rem] flex-col items-center justify-center space-y-4 text-center">
    <p className="text-5xl">Sign Out</p>
    <p className="">
      Oh, you&apos;re signing out?
      <br />
      That&apos;s a little disappointing.....
    </p>
    <div className="flex h-32 w-full items-center justify-center">
      <Image src="/space/astronaut-ingravity.png" alt="astronaut" width={150} height={150} />
    </div>
    <SignOutButton className="h-10 w-40 rounded-full bg-[#ff4da6]" />
  </div>
);

Signout.getLayout = page => <Layout title="Sign Out - Astvel">{page}</Layout>;

export default Signout;
