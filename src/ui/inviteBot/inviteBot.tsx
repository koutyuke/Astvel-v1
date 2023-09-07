import { FC } from "react";
import { FiExternalLink } from "react-icons/fi";
import { AiOutlineInfoCircle } from "react-icons/ai";

const InviteBot: FC = () => {
  const url = "https://discord.com/api/oauth2/authorize?client_id=1078178551624368229&permissions=8&scope=bot";

  return (
    <div className="m-2 flex w-full flex-col items-center space-y-8 py-4 text-gray-500">
      <div className="flex max-w-[40rem] flex-col space-y-2 rounded-lg bg-yellow-200 p-6">
        <div className="flex items-center justify-start space-x-2">
          <AiOutlineInfoCircle size={24} />
          <p className="text-xl">Notes</p>
        </div>
        <ul className=" list-disc pl-8 leading-6">
          <li>Invite bots as administrators.</li>
          <li>This bot constantly monitors server members, channels, roles, etc.</li>
          <li>
            Due to Discord&#39;s permissions, category channels can be retrieved from the API even if they are set to
            private channels.
          </li>
        </ul>
      </div>
      <a
        className="flex h-16 w-44 items-center justify-center space-x-1 rounded-lg bg-red-400 text-center text-white duration-200 hover:scale-110"
        rel="noreferrer noopener"
        target="_blank"
        href={url}
      >
        <span className="text-xl">Bot Invite Link</span>
        <FiExternalLink size={20} />
      </a>
    </div>
  );
};

export { InviteBot };
