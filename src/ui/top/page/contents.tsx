import { FC } from "react";
import { App, Bot, Build, EndMessage, Feature, Hero, Linkage } from "../components";

const Contents: FC = () => {
  return (
    <>
      <Hero />
      <Build />
      <App className="mt-32" />
      <Feature className="mt-36" />
      <Bot className="mt-36" />
      <Linkage className="mt-36" />
      <EndMessage className="mt-36" />
    </>
  );
};

export { Contents };
