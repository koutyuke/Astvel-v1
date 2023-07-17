/* eslint-disable react/require-default-props */
import Head from "next/head";
import { FC } from "react";

type Props = {
  title: string;
  description?: string;
};

const Seo: FC<Props> = ({ title, description }) => (
  <Head>
    <title>{title}</title>
    <meta property="og:url" content="https://www.astvel.app" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content={title} />
    <meta property="og:discription" content={description ?? "hoge"} />
    <meta property="og:site_name" content="Astvel" />
    <meta property="og:image" content="https://www.astvel.app/OGP.jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="640" />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:creator" content="@kusuke0808" />
  </Head>
);

export default Seo;
