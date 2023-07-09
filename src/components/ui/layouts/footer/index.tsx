import Image from "next/image";
import Navigate from "./contents/navigate";
import Framework from "./contents/framework";
import Creater from "./contents/creater";
import Repository from "./contents/repository";
import Library from "./contents/library";

const Footer = () => (
  <footer className="flex grid-rows-[3.5rem_minmax(6rem,1fr)_1.5rem] flex-col  space-y-6 bg-gray-800 px-2 pb-2 pt-6 text-white sm:grid sm:gap-x-2 sm:gap-y-4 sm:space-y-0">
    <div className="row-start-1 flex h-full items-center justify-center">
      <Image src="/icon.PNG" alt="icon" className="" width={50} height={50} />
      <Image src="/logo.PNG" alt="logo" width={200} height={50} />
    </div>
    <div className="flex grid-cols-3 grid-rows-2 flex-col space-y-6 sm:grid sm:space-y-0">
      <Navigate className="order-1 col-start-1 row-[1_/_3]" />
      <Creater className="order-2 col-start-2 row-start-1" />
      <Framework className="order-4 col-start-3 row-start-1"/>
      <Repository className="order-3 col-start-2 row-start-2" />
      <Library className="order-5 col-start-3 row-start-2" />
    </div>
    <span className="row-start-3 h-6 w-full text-center">&copy; Astnvel</span>
  </footer>
);

export default Footer;
