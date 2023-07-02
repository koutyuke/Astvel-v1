import Image from "next/image";
import { SiNextdotjs, SiReact, SiTailwindcss, SiExpress, SiSocketdotio } from "react-icons/si";
import { TbBrandRadixUi } from "react-icons/tb";
import InternalLink from "components/elements/button/InternalLink";
import ContentsTitle from "./ContentsTitle";

const Footer = () => (
  <footer className="grid h-60 grid-cols-[50%_50%] grid-rows-[1fr_1.5rem] items-center justify-center bg-gray-800 p-2 text-white">
    <div className="flex items-center justify-center">
      <Image src="/icon.PNG" alt="icon" className="" width={80} height={80} />
      <Image src="/logo.PNG" alt="logo" width={320} height={80} />
    </div>
    <div className="grid h-36 w-full grid-cols-[50%_50%] grid-rows-[50%_50%]">
      <nav className="row-[1_/_3] flex h-full flex-col items-center">
        <ContentsTitle imageUrl="/space/artificial-satellite.png" title="Contents" />
        <ul>
          <li>
            <InternalLink url="/guilds" className="">
              Guilds
            </InternalLink>
          </li>
        </ul>
      </nav>
      <div className="flex flex-col items-center justify-start">
        <ContentsTitle imageUrl="/space/astronaut.png" title="Creater" alt="astronaut" />
        <ul>
          <li>
            <a
              href="https://twitter.com/kusuke0808"
              rel="noreferrer noopener"
              target="_blank"
              className="text-blue-400"
            >
              @kusuke0808
            </a>
          </li>
        </ul>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-start">
        <ContentsTitle imageUrl="/space/space-station.png" title="Library" alt="space-station" />
        <div className="flex space-x-2">
          <SiNextdotjs size={24} color="white" />
          <SiReact size={24} />
          <SiTailwindcss size={24} />
          <SiExpress size={24} />
          <SiSocketdotio size={24} />
          <TbBrandRadixUi size={24} />
        </div>
      </div>
    </div>
    <span className="col-[1_/_3] row-start-2 w-full text-center">&copy; Astnvel</span>
  </footer>
);

export default Footer;
