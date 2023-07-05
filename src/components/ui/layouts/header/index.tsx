import { FC } from "react";
import Image from "next/image";
import SignInOutButton from "components/elements/button/signInOut";
import HeaderLinks from "./HeaderLinks";

const Header: FC = () => (
  <header className="sticky top-0 z-50 flex h-20 w-full grid-cols-[10rem_1fr_10rem]  justify-between bg-gray-800 px-6 py-4 sm:grid md:h-24 md:grid-cols-[12.5rem_1fr_12.5rem]">
    <div className="flex h-full w-40 items-center justify-center md:w-[12.5rem]">
      <Image src="/logo.PNG" alt="logo" width={200} height={50} />
    </div>
    <HeaderLinks />
    <div className="hidden h-full w-full items-center justify-center sm:flex">
      <SignInOutButton />
    </div>
  </header>
);

export default Header;
