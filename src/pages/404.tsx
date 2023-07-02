import ErrorMessage from "components/ui/errorMessage";
import { NextPage } from "next";

const NotFound: NextPage = () => (
  <div className="mx-10 flex h-[calc(100vh_-_10rem)] items-center justify-center">
    <ErrorMessage title="404">Page Not Found</ErrorMessage>
  </div>
);

export default NotFound;
