import { FC } from "react";
import InternalLink from "components/elements/button/InternalLink";
import { FaSatellite } from "react-icons/fa";
import ContentsTitle from "./ContentsTitle";

const FooterLeftContets: FC = () => (
  <nav className="flex h-full flex-col items-center">
    <ContentsTitle title="Contents" Icon={FaSatellite} />
    <ul>
      <li>
        <InternalLink url="/guilds" className="">
          Guilds
        </InternalLink>
      </li>
    </ul>
  </nav>
);

export default FooterLeftContets;
