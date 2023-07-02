import type { NextPage } from "next";
import BaseToast from "components/elements/toast";

const Home: NextPage = () => (
  <div className="flex h-[calc(100vh_-_10rem)] flex-col items-center justify-center space-x-10 space-y-4 px-10">
    <BaseToast />
    <p className="w-full text-center text-4xl">Varsion &alpha;</p>
    <div className="text-center text-xl">
      Therefore, there are bugs and unimplemented.
      <br />
      If you have any suggestions, please send them to me via{" "}
      <a href="https://twitter.com/kusuke0808" rel="noreferrer noopener" target="_blank" className="text-blue-400">
        Twitter
      </a>{" "}
      DM.
    </div>
  </div>
);

export default Home;
