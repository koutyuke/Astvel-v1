import { ComponentPropsWithoutRef, FC } from "react";
import { FaUserAstronaut } from "react-icons/fa";
import { Title } from "./title";

type Props = ComponentPropsWithoutRef<"div">;

const Creater: FC<Props> = ({ className, ...other }) => (
  <div className={`flex  flex-col items-center justify-start space-y-1 ${className}`} {...other}>
    <Title title="Creater" Icon={FaUserAstronaut} />
    <a href="https://twitter.com/kusuke0808" rel="noreferrer noopener" target="_blank" className="text-blue-400">
      @kusuke0808
    </a>
  </div>
);

export { Creater };
