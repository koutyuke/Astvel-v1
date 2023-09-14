import { ComponentPropsWithoutRef, FC } from "react";
import { FaSatellite } from "react-icons/fa";
import { PageLink } from "components/elements/pageLink";
import { Title } from "./title";

type Props = ComponentPropsWithoutRef<"nav">;

const Navigate: FC<Props> = ({ className, ...other }) => (
  <nav className={`flex h-full flex-col items-center ${className}`} {...other}>
    <Title title="Navigate" Icon={FaSatellite} />
    <ul>
      <li>
        <PageLink url="/guilds" className="">
          Guilds
        </PageLink>
      </li>
    </ul>
  </nav>
);

export { Navigate };
