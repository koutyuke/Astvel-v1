import InternalLink from "components/elements/button/InternalLink";

const HeaderLinks = () => (
  <div className="flex h-full w-full items-center justify-center space-x-8">
    <InternalLink url="/" className="text-xl text-white">
      Home
    </InternalLink>
    <InternalLink url="how-to-use" className="text-xl text-white">
      How-To-Use
    </InternalLink>
    <InternalLink url="q&a" className="text-xl text-white">
      Q-&-A
    </InternalLink>
    <InternalLink url="Information" className="text-xl text-white">
      Information
    </InternalLink>
  </div>
);

export default HeaderLinks;
