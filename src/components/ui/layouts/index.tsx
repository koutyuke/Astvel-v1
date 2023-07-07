import { FC, ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => (
  <>
    <Header />
    <main className="m-auto flex h-0 min-h-[calc(100vh_-_5rem)] w-full max-w-[100rem] items-center justify-center px-10 py-8 md:min-h-[calc(100vh_-_6rem)]">
      {children}
    </main>
    <Footer />
  </>
);

export default Layout;
