import ErrorMessage from "components/ui/errorMessage";
import { NextPage } from "next";

const NotFound: NextPage = () => (
  <div className="flex h-full items-center justify-center">
    <ErrorMessage title="404">Page Not Found</ErrorMessage>
  </div>
);

export default NotFound;
