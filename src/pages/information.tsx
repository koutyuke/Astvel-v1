import { Layout } from "components/layouts";
import { NextPageWithLayout } from "next";

const Information: NextPageWithLayout = () => (
  <div className="flex h-full flex-col items-center justify-center text-2xl">
    <p>Comming Soon....</p>
    <div>
      <div>
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
      <div>
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
      <div>
        {" "}
        Icons made by{" "}
        <a href="https://www.flaticon.com/authors/juicy-fish" title="juicy_fish">
          {" "}
          juicy_fish{" "}
        </a>{" "}
        from{" "}
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </div>
    </div>
  </div>
);

Information.getLayout = page => (
  <Layout title="Informatino - Astvel" className="flex items-center justify-center">
    {page}
  </Layout>
);

export default Information;
