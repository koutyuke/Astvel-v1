import { FC } from "react";
import Image from "next/image";
import { InternalLink } from "components/elements/link";
import { SignIn } from "featutres/signIn/components";
import { HamburgerMenu } from "./hamburger/hamburger";

const Header: FC = () => (
  <header className="sticky top-0 z-50 box-border flex h-16 w-full items-center justify-between space-x-3 border-b-[1px] border-gray-500 px-8 backdrop-blur tablet:space-x-8 tablet:px-16 ">
    <InternalLink path="/">
      <figure className="flex h-full items-center justify-center">
        <span>
          <Image priority loading="eager" src="/icon.PNG" alt="icon image at Astvel" width={40} height={40} />
        </span>
        <span className="hidden h-7 tablet:block">
          <Image priority loading="eager" src="/logo.PNG" alt="logo image at Astvel" width={108} height={27} />
        </span>
      </figure>
    </InternalLink>
    <nav className="hidden w-auto grow items-center justify-start space-x-5 text-white tablet:flex">
      <InternalLink path="/">Home</InternalLink>
      <InternalLink path="/guilds">Guilds</InternalLink>
      <InternalLink path="/usage">Usage</InternalLink>
      <InternalLink path="/information">Info</InternalLink>
    </nav>
    <div className="flex grow items-center justify-end tablet:grow-0">
      <SignIn contentAlignment="end" />
    </div>
    <div className="tablet:hidden">
      <HamburgerMenu />
    </div>
  </header>
);

export { Header };
