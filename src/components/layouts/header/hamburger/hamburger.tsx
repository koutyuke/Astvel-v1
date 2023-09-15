import { FC, Fragment, useState } from "react";
import { Fade as Hamburger } from "hamburger-react";
import { SignInOutLarge, SignOutButton } from "featutres/signIn/components";
import { InternalLink } from "components/elements/link";

const pathParams = [
  {
    path: "/",
    display: "Home",
  },
  {
    path: "/guilds",
    display: "Guilds",
  },
  {
    path: "/usage",
    display: "Usage",
  },
  {
    path: "/info",
    display: "Information",
  },
];

const HamburgerMenu: FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Hamburger size={24} toggle={setOpen} toggled={open} />
      <button
        className={`fixed left-0 top-20 z-40 opacity-90 ${open ? "h-[calc(100vh_-_5rem)] w-full" : "h-0 w-0"}`}
        onClick={() => {
          setOpen(false);
        }}
        type="button"
        aria-label="Close"
      />
      <div
        className={`fixed right-0 top-20 z-50 overflow-hidden bg-black opacity-90 duration-300 ${
          open ? "h-[calc(100vh_-_5rem)] w-72 rounded-none " : "h-0 w-0 rounded-b-[5rem] rounded-tl-[5rem]"
        }`}
      >
        <div
          className={` ${
            open ? "opacity-100 delay-[400ms]" : "opacity-0"
          } flex h-full w-full flex-col items-start space-y-8 overflow-auto px-4 py-8`}
        >
          <div className="flex w-full justify-center">
            <SignInOutLarge />
          </div>
          <div className="flex w-full flex-col space-y-3">
            {pathParams.map(({ path, display }) => (
              <Fragment key={path}>
                <div className="h-[2px] w-full bg-gray-200" />
                <InternalLink
                  url={path}
                  className="px-4 text-2xl font-light"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  {display}
                </InternalLink>
              </Fragment>
            ))}
            <div className="h-[2px] w-full bg-gray-200" />
            <SignOutButton
              className="pl-4 text-2xl font-light"
              onClick={() => {
                setOpen(false);
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export { HamburgerMenu };
