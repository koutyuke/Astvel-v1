import { ComponentProps, ComponentPropsWithoutRef, FC, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Seo } from "./seo";
import { Header } from "./header";
import { Footer } from "./footer";

type Props = {
  children: ReactNode;
} & ComponentProps<typeof Seo> &
  Pick<ComponentPropsWithoutRef<"main">, "className">;

const Layout: FC<Props> = ({ children, title, description, className }) => (
  <>
    <Seo title={title} description={description} />
    <Header />
    <main
      className={twMerge(
        "m-auto flex h-0 min-h-[calc(100vh_-_4rem)] w-full max-w-[100rem] items-center justify-center py-4",
        className,
      )}
    >
      {children}
    </main>
    <Footer />
  </>
);

export { Layout };
