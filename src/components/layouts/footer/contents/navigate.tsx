import { ComponentPropsWithoutRef, FC } from "react";
import { FaSatellite } from "react-icons/fa";
import { InternalLink } from "components/elements/InternalLink";
import { Title } from "./title";

type Props = ComponentPropsWithoutRef<"nav">;

const Navigate: FC<Props> = ({ className, ...other }) => (
  <nav className={`flex h-full flex-col items-center ${className}`} {...other}>
    <Title title="Navigate" Icon={FaSatellite} />
    <ul>
      <li>
        <InternalLink url="/guilds" className="">
          Guilds
        </InternalLink>
      </li>
    </ul>
  </nav>
);

export { Navigate };