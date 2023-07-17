import Layout from "components/ui/layouts";
import { NextPageWithLayout } from "next";

const Information: NextPageWithLayout = () => (
  <div className="flex h-full flex-col items-center justify-center text-2xl">
    <p>Comming Soon....</p>
    <div>
      <p>lisens</p>
      <div>
        Icons made by{" "}
        <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">
          {" "}
          Smashicons{" "}
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
    <div>
      <div>
        {" "}
        Icons made by Prashanth Rapolu 15 from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
    <div>
      <div>
        {" "}
        Icons made by{" "}
        <a href="https://www.freepik.com" title="Freepik">
          {" "}
          Freepik{" "}
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
  </div>
);

Information.getLayout = page => <Layout title="Informatino - Astvel">{page}</Layout>;

export default Information;
