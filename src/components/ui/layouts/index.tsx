import { FC, ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => (
  <>
    <Header />
    <main className="flex h-0 min-h-[calc(100vh_-_6rem)] w-full items-center justify-center px-10 py-8">
      {children}
    </main>
    <Footer />
  </>
);

export default Layout;
