import { FC } from "react";
import Image from "next/image";
import { InternalLink } from "components/elements/link";

const Hero: FC = () => {
  return (
    <div className="relative grid h-screen max-h-[60rem] w-full grid-cols-12 items-center gap-6 shadow-2xl">
      <div className="z-20 col-[2_/_12] space-y-4 pt-[10%] tablet:col-[2_/_7]">
        <h1 className="text-6xl font-bold leading-none">
          Easily Move
          <br />
          Discord Members
        </h1>
        <ul className="text-xl text-gray-400">
          <li>This Application that can move multiple members at once in an instant.</li>
          <li>Better Discord experience during games and meetings and other.</li>
        </ul>
        <InternalLink
          path="./guilds"
          className="flex h-10 w-40  items-center justify-center rounded-lg border border-green-500 text-center transition hover:bg-green-500/30 hover:text-white"
        >
          <span>Get Started</span>
        </InternalLink>
      </div>
      <div className="relative z-20 col-[7_/_13] hidden h-full flex-1 overflow-x-visible tablet:block">
        <span className="absolute left-0 top-1/2 flex aspect-[10_/_8] h-4/5 -translate-y-1/2 items-center">
          <Image
            src="/images/hero.png"
            className=""
            height={800}
            width={1000}
            priority
            loading="eager"
            alt="hero image at Astvel"
          />
        </span>
      </div>
      <div className="absolute left-1/2 top-1/2 z-10 aspect-square h-4/5 max-h-[60rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(48,_164,_108,_0.75)_0,_rgba(48,_164,_108,_0.75)_1%,_rgba(48,_164,_108,_0.0)_100%)] blur-3xl" />
    </div>
  );
};

export { Hero };
