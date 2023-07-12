import { FC } from "react";
import Image from "next/image";
import SignInOutButton from "components/elements/button/signInOut";
import HeaderLinks from "./links";
import HamburgerMenu from "./hamburger";

const Header: FC = () => (
  <header className="sticky top-0 z-50 flex h-20 w-full grid-cols-[10rem_1fr_10rem] justify-between px-6 py-4 backdrop-blur sm:grid md:h-24 md:grid-cols-[12.5rem_1fr_12.5rem]">
    <div className="flex h-full w-40 items-center justify-center md:w-[12.5rem]">
      <Image src="/logo.PNG" alt="logo" width={200} height={50} />
    </div>
    <HeaderLinks />
    <div className="hidden h-full w-full items-center justify-center sm:flex">
      <SignInOutButton />
    </div>
    <div className="h-12 w-12 rounded-lg bg-gray-500 sm:hidden">
      <HamburgerMenu />
    </div>
  </header>
);

export default Header;
