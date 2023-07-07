import Image from "next/image";
import FooterLeftContets from "./left";
import FooterRightContents from "./right";
import FooterCenterContents from "./center";

const Footer = () => (
  <footer className="flex grid-cols-[1fr_1fr_1fr] grid-rows-[3.5rem_minmax(6rem,1fr)_2rem] flex-col  gap-x-2 gap-y-4 space-y-3 bg-gray-800 px-2 pt-6 text-white sm:grid sm:space-y-2">
    <div className="col-[1_/_4] row-start-1 flex h-full items-center justify-center">
      <Image src="/icon.PNG" alt="icon" className="" width={50} height={50} />
      <Image src="/logo.PNG" alt="logo" width={200} height={50} />
    </div>
    <FooterLeftContets/>
    <FooterCenterContents/>
    <FooterRightContents/>
    <span className="col-[1_/_4] row-start-3 w-full text-center">&copy; Astnvel</span>
  </footer>
);

export default Footer;
