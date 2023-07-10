import InternalLink from "components/elements/button/InternalLink";

const HeaderLinks = () => (
  <div className="hidden h-full w-full items-center justify-center space-x-4 text-xl text-white sm:flex md:space-x-8">
    <InternalLink url="/">Home</InternalLink>
    <InternalLink url="/guilds">Guilds</InternalLink>
    <InternalLink url="/usage">Usage</InternalLink>
    <InternalLink url="/information">Info</InternalLink>
  </div>
);

export default HeaderLinks;
