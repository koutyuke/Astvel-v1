import { FC, Fragment, useEffect, useState } from "react";
import { InternalLink } from "components/elements/link";
import { twMerge } from "tailwind-merge";

const HamburgerMenu: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="group flex h-9 w-9 flex-col justify-around rounded-lg p-2 outline outline-2 outline-white transition hover:outline-green-500"
        onClick={() => {
          setOpen(!open);
        }}
      >
        <span
          className={twMerge(
            "h-0.5 w-5 rounded-full bg-red-100 transition group-hover:bg-green-500",
            open ? " translate-y-[calc(20px_/_3)] rotate-45" : "",
          )}
        />
        <span
          className={twMerge(
            "h-0.5 w-5 rounded-full bg-white transition group-hover:bg-green-500",
            open ? " opacity-0" : "opacity-1",
          )}
        />
        <span
          className={twMerge(
            "h-0.5 w-5 rounded-full bg-white transition group-hover:bg-green-500",
            open ? " translate-y-[calc(-20px_/_3)] -rotate-45" : "",
          )}
        />
      </button>
      <nav
        className={twMerge(
          "fixed right-0 top-16 z-50 overflow-hidden bg-black duration-300",
          open ? "h-[calc(100vh_-_4rem)] w-full rounded-none " : "h-0 w-0 rounded-b-[5rem] rounded-tl-[5rem]",
        )}
      >
        <div
          className={twMerge(
            "flex h-full w-full flex-col items-center justify-center space-y-8 overflow-auto px-4 py-16 text-center",
            open ? "opacity-100 delay-[400ms]" : "opacity-0",
          )}
        >
          <InternalLink
            path="/"
            className="text-4xl font-semibold"
            onClick={() => {
              setOpen(false);
            }}
          >
            Home
          </InternalLink>
          <InternalLink
            path="/guilds"
            className="text-4xl font-semibold"
            onClick={() => {
              setOpen(false);
            }}
          >
            Guilds
          </InternalLink>
          <InternalLink
            path="/usage"
            className="text-4xl font-semibold"
            onClick={() => {
              setOpen(false);
            }}
          >
            Usage
          </InternalLink>
          <InternalLink
            path="/information"
            className="text-4xl font-semibold"
            onClick={() => {
              setOpen(false);
            }}
          >
            Info
          </InternalLink>
        </div>
      </nav>
    </>
  );
};

export { HamburgerMenu };
