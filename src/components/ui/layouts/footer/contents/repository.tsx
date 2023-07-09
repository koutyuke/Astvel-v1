import { ComponentPropsWithoutRef, FC } from "react";
import { FaGithub } from "react-icons/fa";

import Title from "./title";

type Props = ComponentPropsWithoutRef<"div">;

const Repository: FC<Props> = ({ className, ...other }) => (
  <div className={`flex flex-col items-center justify-start space-y-1 ${className}`} {...other}>
    <Title title="Repository" Icon={FaGithub} />
    <a href="https://github.com/koutyuke/Astvel" rel="noreferrer noopener" target="_blank">
      koutyuke/Astvel
    </a>
  </div>
);

export default Repository;
