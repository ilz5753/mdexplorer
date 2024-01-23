import { Path, Svg } from "react-native-svg";
import { ISvgIcon } from "./type";

export default function Check48({ color = "black" }: ISvgIcon) {
  return (
    <Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
      <Path
        d="M10 26l7.053 5.642a4 4 0 005.472-.447L38 14"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
