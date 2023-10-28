import { FC } from "react";
import { Separator } from "../components/toolbar/separator";

const Loading: FC = () => {
  return (
    <div className="flex h-full w-full animate-pulse flex-col space-y-4">
      <div className="mx-8 flex h-14 items-center justify-start rounded-lg border border-gray-500 p-2 tablet:mx-16">
        <div className="box-border h-9 w-9  rounded-md border border-gray-500 bg-black-3" />
        <Separator />
        <div className="flex flex-1 space-x-2">
          <div className="box-border h-9 w-9  rounded-md border border-gray-500 bg-black-3" />
          <div className="box-border h-9 w-9  rounded-md border border-gray-500 bg-black-3" />
          <div className="box-border h-9 w-9  rounded-md border border-gray-500 bg-black-3" />
        </div>
        <Separator />
        <div className="box-border h-9 w-9  rounded-md border border-gray-500 bg-black-3" />
      </div>
      {/* eslint-disable-next-line tailwindcss/no-custom-classname */}
      <div className="scrollber-hidden flex grow snap-x snap-mandatory space-x-4 overflow-x-auto px-8 tablet:px-16">
        <div className="w-1/3 min-w-[15rem] snap-center  space-y-4 overflow-hidden rounded-lg border border-gray-500 bg-black-2 p-2.5">
          <div className="box-border w-full items-center space-y-3 rounded-lg border border-gray-500 bg-black-2 p-3">
            <div className="h-5 w-full space-y-2 rounded-lg border border-gray-500 bg-black-3" />
            <div className="box-border w-full items-center space-y-3 rounded-lg border border-gray-500 bg-black-2 p-3">
              <div className="h-5 w-full space-y-2 rounded-lg border border-gray-500 bg-black-3" />
              <div className="box-border h-32 w-full space-y-4 rounded-lg border border-gray-500 p-2" />
            </div>
          </div>
        </div>
        <div className=" w-1/3 min-w-[15rem] snap-center  space-y-4 overflow-hidden rounded-lg border border-gray-500 bg-black-2 p-2.5">
          <div className="grid w-full grid-cols-[repeat(auto-fill_,_minmax(5rem_,_1fr))] justify-items-center gap-3">
            <div className="box-border h-24 w-20 rounded-lg border border-gray-500 bg-black-3" />
            <div className="box-border h-24 w-20 rounded-lg border border-gray-500 bg-black-3" />
            <div className="box-border h-24 w-20 rounded-lg border border-gray-500 bg-black-3" />
            <div className="box-border h-24 w-20 rounded-lg border border-gray-500 bg-black-3" />
            <div className="box-border h-24 w-20 rounded-lg border border-gray-500 bg-black-3" />
            <div className="box-border h-24 w-20 rounded-lg border border-gray-500 bg-black-3" />
            <div className="box-border h-24 w-20 rounded-lg border border-gray-500 bg-black-3" />
            <div className="box-border h-24 w-20 rounded-lg border border-gray-500 bg-black-3" />
            <div className="box-border h-24 w-20 rounded-lg border border-gray-500 bg-black-3" />
            <div className="box-border h-24 w-20 rounded-lg border border-gray-500 bg-black-3" />
            <div className="box-border h-24 w-20 rounded-lg border border-gray-500 bg-black-3" />
            <div className="box-border h-24 w-20 rounded-lg border border-gray-500 bg-black-3" />
          </div>
        </div>
        <div className="w-1/3 min-w-[15rem] snap-center space-y-2 overflow-hidden rounded-lg border border-gray-500 bg-black-2 p-2.5">
          <div className="box-border w-full items-center space-y-3 rounded-lg border border-gray-500 bg-black-2 p-3">
            <div className="h-5 w-full space-y-2 rounded-lg border border-gray-500 bg-black-3" />
            <div className="box-border w-full space-y-4 rounded-lg border border-gray-500 p-3">
              <div className="grid w-full grid-cols-[repeat(auto-fill_,_minmax(5rem_,_1fr))] justify-items-center gap-3">
                <div className="box-border h-24 w-20 rounded-lg border border-gray-500 bg-black-3" />
                <div className="box-border h-24 w-20 rounded-lg border border-gray-500 bg-black-3" />
                <div className="box-border h-24 w-20 rounded-lg border border-gray-500 bg-black-3" />
                <div className="box-border h-24 w-20 rounded-lg border border-gray-500 bg-black-3" />
                <div className="box-border h-24 w-20 rounded-lg border border-gray-500 bg-black-3" />
                <div className="box-border h-24 w-20 rounded-lg border border-gray-500 bg-black-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { Loading };
