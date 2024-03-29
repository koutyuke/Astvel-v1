import { Layout } from "components/layouts";
import { NextPageWithLayout } from "next";
import Image from "next/image";

const NotFound: NextPageWithLayout = () => (
  <div className="flex flex-col items-center justify-center space-y-4">
    <div className="flex h-20 items-center text-7xl">
      <span>4</span>
      <Image src="/icon.PNG" alt="user icon image" priority loading="eager" className="" width={75} height={75} />
      <span>4</span>
    </div>
    <p className="text-2xl">Oops! Page Not Found</p>
    <p className="text-center leading-6">
      We can&apos;t find the page you&apos;re looking for.
      <br />
      Please check URL....
    </p>
  </div>
);

NotFound.getLayout = page => (
  <Layout title="Page Not Fournd - Astvel" className="flex items-center justify-center">
    {page}
  </Layout>
);

export default NotFound;
