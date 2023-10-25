import { FC, SVGProps } from "react";

type Props = Pick<SVGProps<SVGSVGElement>, "className" | "width" | "height">;

const SpeechBalloonTriangle: FC<Props> = ({ width, height, className }) => (
  <svg width={width ?? "20"} height={height ?? "10"} viewBox="0 0 40 20" className={className}>
    <polygon points="0,0 40,0 20,20" />
  </svg>
);

export { SpeechBalloonTriangle };
