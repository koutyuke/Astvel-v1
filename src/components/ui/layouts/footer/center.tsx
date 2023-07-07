import { FC } from "react";
import { FaGithub, FaUserAstronaut } from "react-icons/fa";

import ContentsTitle from "./ContentsTitle";

const FooterCenterContents: FC = () => (
  <div className="flex flex-col space-y-4">
    <div className="flex  flex-col items-center justify-start space-y-2">
      <ContentsTitle title="Creater" Icon={FaUserAstronaut} />
      <a href="https://twitter.com/kusuke0808" rel="noreferrer noopener" target="_blank" className="text-blue-400">
        @kusuke0808
      </a>
    </div>

    <div className="flex flex-col items-center justify-start space-y-2">
      <ContentsTitle title="Repository" Icon={FaGithub} />
      <a href="https://github.com/koutyuke/Astvel" rel="noreferrer noopener" target="_blank">
        koutyuke/Astvel
      </a>
    </div>
  </div>
);

export default FooterCenterContents;
