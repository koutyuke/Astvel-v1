import Image from "next/image";
import ContentsTitle from "./ContentsTitle";

const Footer = () => (
  <footer className="grid h-60 grid-cols-[50%_50%] grid-rows-[1fr_1.5rem] items-center justify-center bg-gray-800 p-2 text-white">
    <div className="flex items-center justify-center">
      <Image src="/icon.PNG" alt="icon" className="" width={100} height={100} />
      <Image src="/logo.PNG" alt="logo" width={360} height={90} />
    </div>
    <div className="grid h-36 w-full grid-cols-[50%_50%] grid-rows-[50%_50%]">
      <nav className="row-[1_/_3] flex h-full flex-col items-center">
        <ContentsTitle imageUrl="/space/artificial-satellite.png" title="Contents" />
      </nav>
      <div className="flex flex-col items-center justify-start">
        <ContentsTitle imageUrl="/space/astronaut.png" title="Creater" alt="astronaut" />
      </div>
      <div className="flex h-full w-full flex-col items-center justify-start">
        <ContentsTitle imageUrl="/space/space-station.png" title="Framework" alt="space-station" />
      </div>
    </div>
    <span className="col-[1_/_3] row-start-2 w-full text-center">&copy; Astnvel</span>
  </footer>
);

export default Footer;
