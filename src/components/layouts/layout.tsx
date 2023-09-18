import { ComponentProps, FC, ReactNode } from "react";
import { Seo } from "./seo";
import { Header } from "./header";
import { Footer } from "./footer";

type Props = {
  children: ReactNode;
} & ComponentProps<typeof Seo>;

const Layout: FC<Props> = ({ children, title, description }) => (
  <>
    <Seo title={title} description={description} />
    <Header />
    <main className="m-auto flex h-0 min-h-[calc(100vh_-_4rem)] w-full max-w-[100rem] items-center justify-center px-10 py-8">
      {children}
    </main>
    <Footer />
  </>
);

export { Layout };
