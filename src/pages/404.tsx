import { NextPage } from "next";
import Image from "next/image";

const NotFound: NextPage = () => (
  <div className="flex h-full flex-col items-center justify-center space-y-4">
    <div className="flex h-20 items-center text-7xl">
      <span>4</span>
      <Image src="/icon.PNG" alt="icon" className="" width={75} height={75} />
      <span>4</span>
    </div>
    <p className="text-2xl">Oops! Page Not Found</p>
    <p className="text-center">
      We can&apos;t find the page <br className="sm:hidden" />
      you&apos;re looking for.
      <br />
      Please check URL.
    </p>
  </div>
);

export default NotFound;
