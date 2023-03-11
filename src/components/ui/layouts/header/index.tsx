import { FC } from "react";
import Image from "next/image";
import LogInOutButton from "components/elements/button/LogInOut";
import HeaderLinks from "./HeaderLinks";

const Header: FC = () => (
  <header className="fixed grid h-24 w-full grid-cols-[20%_60%_20%] bg-gray-800 py-4 px-6">
    <div className="flex h-full w-full items-center justify-center">
      <Image src="/logo.PNG" alt="logo" width={200} height={50} />
    </div>
    <HeaderLinks />
    <div className="flex h-full w-full items-center justify-center">
      <LogInOutButton />
    </div>
  </header>
);

export default Header;
