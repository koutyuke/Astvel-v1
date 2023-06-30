import InternalLink from "components/elements/button/InternalLink";

const HeaderLinks = () => (
  <div className="flex h-full w-full items-center justify-center space-x-8 text-xl text-white">
    <InternalLink url="/">Home</InternalLink>
    <InternalLink url="/guilds">Guilds</InternalLink>
    <InternalLink url="/how-to-use">How-To-Use</InternalLink>
    <InternalLink url="/q&a">Q-&-A</InternalLink>
  </div>
);

export default HeaderLinks;
