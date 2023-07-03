import { FC } from "react";
import Image from "next/image";
import SignInOutButton from "components/elements/button/signInOut";
import HeaderLinks from "./HeaderLinks";

const Header: FC = () => (
  <header className="sticky top-0 z-50 grid h-24 w-full grid-cols-[20%_60%_20%] bg-gray-800 px-6 py-4">
    <div className="flex h-full w-full items-center justify-center">
      <Image src="/logo.PNG" alt="logo" width={200} height={50} />
    </div>
    <HeaderLinks />
    <div className="flex h-full w-full items-center justify-center">
      <SignInOutButton />
    </div>
  </header>
);

export default Header;
