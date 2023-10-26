import Image from "next/image";
import { ExternalLink, InternalLink } from "components/elements/link";
import { GithubIcon } from "components/icon/github";
import { DiscordIcon } from "components/icon/discord";

const Footer = () => (
  <footer className="flex w-full flex-col justify-center space-y-8 border-t border-gray-500 px-8 py-16 tablet:p-16">
    <div className="grid h-full grid-cols-12 grid-rows-3 justify-items-center gap-6 border-b border-gray-500 pb-8 tablet:grid-rows-2 laptop:grid-rows-1">
      <div className="col-start-2 col-end-12 row-start-1 flex h-full flex-col items-center justify-start laptop:col-start-1 laptop:col-end-7">
        <div className="flex h-16 items-center">
          <Image src="/icon.PNG" alt="icon" className="" width={64} height={64} />
          <Image src="/logo.PNG" alt="logo" width={160} height={40} />
        </div>
        <div className="flex space-x-2">
          <ExternalLink url="https://github.com/koutyuke/Astvel">
            <GithubIcon className="fill-white transition hover:fill-green-500" />
          </ExternalLink>
          <ExternalLink url="https://discordapp.com/users/1078178551624368229">
            <DiscordIcon className="fill-white transition hover:fill-green-500" />
          </ExternalLink>
        </div>
      </div>
      <nav className="col-start-2 col-end-7 row-start-2 flex h-full flex-col space-y-3 tablet:col-end-5 laptop:col-start-7 laptop:col-end-9 laptop:row-start-1">
        <p className="text-xl font-bold">Content</p>
        <InternalLink path="/" className="text-xs">
          <p>Home</p>
        </InternalLink>
        <InternalLink path="/guilds" className="text-xs">
          <p className="">Select-Guild</p>
        </InternalLink>
        <InternalLink path="/usage" className="text-xs">
          <p>Usage</p>
        </InternalLink>
        <InternalLink path="/information" className="text-xs">
          <p>Information</p>
        </InternalLink>
      </nav>
      <div className="col-start-7 col-end-12  row-start-2 h-full space-y-3 tablet:col-start-5 tablet:col-end-9 laptop:col-start-9 laptop:col-end-11 laptop:row-start-1">
        <p className="text-xl font-bold">About</p>
        <ExternalLink url="https://github.com/koutyuke/Astvel" className="text-xs" icon>
          <p>Code(Github)</p>
        </ExternalLink>
        <ExternalLink url="" className="text-xs" icon>
          <p>Licens(Github)</p>
        </ExternalLink>
        <ExternalLink url="" className="text-xs" icon>
          <p>Design(Figma)</p>
        </ExternalLink>
      </div>
      <div className="col-start-2 col-end-7 row-start-3 h-full space-y-3  tablet:col-start-9  tablet:col-end-12 tablet:row-start-2 laptop:col-start-11 laptop:col-end-13 laptop:row-start-1">
        <p className="text-xl font-bold">Creator</p>
        <ExternalLink url="https://twitter.com/kusuke0808" icon className="text-xs">
          <p>X(Twitter)</p>
        </ExternalLink>
        <ExternalLink url="https://github.com/koutyuke" icon className="text-xs">
          <p>Github</p>
        </ExternalLink>
        <ExternalLink url="https://discordapp.com/users/687588356875354126" icon className="text-xs">
          <p>Discord</p>
        </ExternalLink>
      </div>
    </div>
    <p className="h-4 text-center">&copy; Astvel</p>
  </footer>
);

export { Footer };
