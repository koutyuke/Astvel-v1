import { IconType } from "react-icons";
import { BsGrid3X3Gap } from "react-icons/bs";
import { IoGridOutline } from "react-icons/io5";

const GridIcon: IconType = props => <IoGridOutline {...props} />;

const SmallGridIcon: IconType = props => <BsGrid3X3Gap {...props} />;

export { GridIcon, SmallGridIcon };
