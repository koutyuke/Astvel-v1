import "../styles/globals.css";
import type { AppProps } from "next/app";
import "destyle.css"

// eslint-disable-next-line react/jsx-props-no-spreading
const MyApp = ({ Component, pageProps }: AppProps) => <Component {...pageProps} />;

export default MyApp;
