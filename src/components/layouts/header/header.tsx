import { FC } from "react";
import Image from "next/image";
import { SignInOutSmall } from "featutres/signIn/components";
import { InternalLink } from "components/elements/InternalLink";
import { HamburgerMenu } from "./hamburger/hamburger";

const Header: FC = () => (
  <header className="sticky top-0 z-50 flex h-20 w-full grid-cols-[10rem_1fr_10rem] justify-between px-6 py-4 backdrop-blur sm:grid md:h-24 md:grid-cols-[12.5rem_1fr_12.5rem]">
    <div className="flex h-full w-40 items-center justify-center md:w-[12.5rem]">
      <Image src="/logo.PNG" alt="logo" width={200} height={50} />
    </div>
    <div className="hidden h-full w-full items-center justify-center space-x-4 text-xl text-white sm:flex md:space-x-8">
      <InternalLink url="/">Home</InternalLink>
      <InternalLink url="/guilds">Guilds</InternalLink>
      <InternalLink url="/usage">Usage</InternalLink>
      <InternalLink url="/information">Info</InternalLink>
    </div>
    <div className="hidden h-full w-full items-center justify-center sm:flex">
      <SignInOutSmall />
    </div>
    <div className="h-12 w-12 rounded-lg bg-gray-500 sm:hidden">
      <HamburgerMenu />
    </div>
  </header>
);

export { Header };
