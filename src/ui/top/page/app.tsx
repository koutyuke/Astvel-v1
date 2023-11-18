import { ComponentPropsWithoutRef, FC } from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

type Props = Pick<ComponentPropsWithoutRef<"div">, "className">;

const App: FC<Props> = ({ className }) => {
  return (
    <div
      className={twMerge(
        "box-border grid w-full grid-cols-12 gap-6 rounded-lg bg-black-2 py-16 shadow-2xl shadow-black",
        className,
      )}
    >
      <h2 className="col-[2_/_12] text-center text-4xl font-bold tablet:text-5xl">What&apos;s This Application?</h2>
      <p className="col-[2_/_12] text-center text-base text-gray-400 tablet:text-xl">
        This application can move multiple members to different channels at once.
      </p>
      <div className="col-[2_/_12] aspect-[3_/_2] flex-1 tablet:col-[2_/_7]">
        <Image height={640} width={960} src="/gif/demo1.gif" className="flex-1" alt="demo gif at Astvel" />
      </div>

      <div className="col-[2_/_12] flex flex-1 flex-col items-center justify-center space-y-8  tablet:col-[7_/_12]">
        <h3 className="text-2xl font-semibold">
          only{" "}
          <span className="bg-gradient-to-r from-emerald-500 to-sky-500 bg-clip-text text-4xl font-bold text-transparent">
            Two
          </span>{" "}
          steps
        </h3>
        <ul className="list-inside list-decimal space-y-2">
          <li>Select members using Drag-and-Drop.</li>
          <li>Push the Moving button.</li>
        </ul>
        <p className="text-center text-lg font-medium tablet:text-xl tablet:font-semibold">
          It is intuitive and very easy to operate.
        </p>
      </div>
    </div>
  );
};

export { App };
