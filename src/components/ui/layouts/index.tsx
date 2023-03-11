import { FC, ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";

type Props = {
  children: ReactNode;
};

const Layout: FC<Props> = ({ children }) => (
  <>
    <Header />
    <div className="min-h-[100vh] w-full pt-24">{children}</div>
    <Footer />
  </>
);

export default Layout;
