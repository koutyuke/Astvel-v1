import { DndIcon } from "components/icon/dnd";
import { RealTimeIcon } from "components/icon/realTime";
import { SortIcon } from "components/icon/sort";
import { TeamIcon } from "components/icon/team";
import Image from "next/image";
import { ComponentPropsWithoutRef, FC, useState } from "react";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

type Props = Pick<ComponentPropsWithoutRef<"div">, "className">;

const variants = tv({
  variants: {
    slide: {
      dnd: "",
      sortable: "translate-x-[-100%]",
      realTime: "translate-x-[-200%]",
      team: "translate-x-[-300%]",
    },
  },
});

const Feature: FC<Props> = ({ className }) => {
  const [state, setState] = useState<"dnd" | "realTime" | "sortable" | "team">("dnd");
  return (
    <div className={twMerge("grid w-full grid-cols-12 gap-6", className)}>
      <h2 className="col-[2_/_12] h-fit text-center text-4xl font-bold tablet:text-5xl">Main Features</h2>
      <div className="col-[2_/_12] flex h-12 justify-center space-x-2 ">
        <button
          type="button"
          className={twMerge(
            "flex aspect-square h-full items-center justify-center rounded-lg border border-transparent bg-black-2 shadow-lg shadow-black transition",
            state === "dnd" ? "border-green-500" : "hover:border-gray-500",
          )}
          onClick={() => {
            setState("dnd");
          }}
        >
          <DndIcon size={30} />
        </button>
        <button
          type="button"
          className={twMerge(
            "flex aspect-square h-full items-center justify-center rounded-lg border border-transparent bg-black-2 shadow-lg shadow-black transition",
            state === "sortable" ? "border-green-500" : "hover:border-gray-500",
          )}
          onClick={() => {
            setState("sortable");
          }}
        >
          <SortIcon size={30} />
        </button>
        <button
          type="button"
          className={twMerge(
            "flex aspect-square h-full items-center justify-center rounded-lg border border-transparent bg-black-2 shadow-lg shadow-black transition",
            state === "realTime" ? "border-green-500" : "hover:border-gray-500",
          )}
          onClick={() => {
            setState("realTime");
          }}
        >
          <RealTimeIcon size={30} />
        </button>
        <button
          type="button"
          className={twMerge(
            "flex aspect-square h-full items-center justify-center rounded-lg border border-transparent bg-black-2 shadow-lg shadow-black transition",
            state === "team" ? "border-green-500" : "hover:border-gray-500",
          )}
          onClick={() => {
            setState("team");
          }}
        >
          <TeamIcon size={24} />
        </button>
      </div>
      <div className="col-[2_/_12] flex items-center justify-center tablet:col-[2_/_7]">
        <div className="box-border aspect-[3_/_2] w-full max-w-[60rem] overflow-hidden rounded-lg bg-black-2 shadow-xl shadow-black">
          <div className={twMerge("flex h-full transition-all duration-500", variants({ slide: state }))}>
            <div className="h-full w-full shrink-0">
              <Image src="/gif/dnd.gif" className="h-full w-full" height={640} width={960} alt="dnd.gif at Astvel" />
            </div>
            <div className="h-full w-full  shrink-0">
              <Image src="/gif/sort.gif" className="h-full w-full" height={640} width={960} alt="sort.gif at Astvel" />
            </div>
            <div className="h-full w-full shrink-0">
              <Image
                src="/gif/realTime.gif"
                className="h-full w-full"
                height={640}
                width={960}
                alt="realTime.gif at Astvel"
              />
            </div>
            <div className="h-full w-full shrink-0">
              <Image src="/gif/team.gif" className="h-full w-full" height={640} width={960} alt="team.gif at Astvel" />
            </div>
          </div>
        </div>
      </div>
      <div className="col-[2_/_12] h-full overflow-x-hidden tablet:col-[7_/_12]">
        <div className={twMerge("flex h-full w-full text-center transition duration-500", variants({ slide: state }))}>
          <div className="my-auto h-full w-full shrink-0 space-y-4 tablet:h-4/5">
            <h3 className="inline-block w-full text-3xl font-bold">Drag and Drop</h3>
            <p className="m-auto max-w-sm text-lg text-gray-400">
              Members and teams can be moved around using drag-and-drop. Each sortable abject is also sorted using
              drag-and-drop
            </p>
          </div>
          <div className="my-auto h-full w-full shrink-0 space-y-4 tablet:h-4/5 ">
            <h3 className="inline-block w-full text-3xl font-bold">Sortable</h3>
            <p className="m-auto max-w-sm text-lg text-gray-400">
              Channels and members can be reordered: voice channels, category channels and teams can be reordered only
              within a defined range. Members can be reordered in various places.
            </p>
          </div>
          <div className="my-auto h-full w-full shrink-0 space-y-4 tablet:h-4/5 ">
            <h3 className="inline-block w-full text-3xl font-bold">Real Time</h3>
            <p className="m-auto max-w-sm text-lg text-gray-400">
              Reflects the state of Discord in real time. So you can see which members are available without having to
              look at the Discord app.
            </p>
          </div>
          <div className="my-auto h-full w-full shrink-0 space-y-4 tablet:h-4/5 ">
            <h3 className="inline-block w-full text-3xl font-bold">Team</h3>
            <p className="m-auto max-w-sm text-lg text-gray-400">
              You can create a new unit called a team. This allows you to select multiple members at once.This is for
              you only and will not be shown to other members.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Feature };
