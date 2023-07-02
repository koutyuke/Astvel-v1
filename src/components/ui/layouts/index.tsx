import { FC, ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => (
  <>
    <Header />
    <main className="flex min-h-[100vh] w-full justify-center pb-8 pt-32">{children}</main>
    <Footer />
  </>
);

export default Layout;
