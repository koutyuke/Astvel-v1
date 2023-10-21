import { ComponentProps, ComponentPropsWithoutRef, FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Seo } from "./seo";
import { Header } from "./header";
import { Footer } from "./footer";

type Props = {
  children: ReactNode;
  footerHidden?: boolean;
} & ComponentProps<typeof Seo> &
  Pick<ComponentPropsWithoutRef<"main">, "className">;

const Layout: FC<Props> = ({ children, title, description, footerHidden, className }) => (
  <>
    <Seo title={title} description={description} />
    <Header />
    <main
      className={twMerge(
        "m-auto flex h-0 min-h-[calc(100vh_-_4rem)] w-full max-w-[80rem] items-center justify-center py-4",
        className,
      )}
    >
      {children}
    </main>
    {!footerHidden && <Footer />}
  </>
);

Layout.defaultProps = {
  footerHidden: false,
};

export { Layout };
