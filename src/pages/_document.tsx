import { Html, Head, Main, NextScript } from "next/document";

const Document = () => (
  <Html lang="ja">
    <Head />
    <body className="bg-black-1" draggable={false}>
      <Main />
      <NextScript />
    </body>
  </Html>
);

export default Document;
