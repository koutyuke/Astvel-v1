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
    <div className="h-fit w-full overflow-x-hidden">
      <main className={twMerge("m-auto min-h-screen w-full max-w-[80rem]  pb-10 pt-20", className)}>{children}</main>
    </div>
    {!footerHidden && <Footer />}
  </>
);

Layout.defaultProps = {
  footerHidden: false,
};

export { Layout };
