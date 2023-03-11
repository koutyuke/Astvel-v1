import { useRouter } from "next/router";
import { ComponentPropsWithoutRef, FC } from "react";

type Props = {
  url: string;
  children: string;
} & Pick<ComponentPropsWithoutRef<"div">, "className">;

const InternalLink: FC<Props> = ({ url, children: text, className }) => {
  const router = useRouter();
  if (router.pathname === url) {
    return <div className={`underline decoration-white underline-offset-1 ${className}`}>{text}</div>;
  }

  return (
    <button
      type="button"
      onClick={() => router.push(url)}
      className={`${className} rounded-md outline-offset-2 outline-orange-500 hover:outline`}
    >
      {text}
    </button>
  );
};

export default InternalLink;
