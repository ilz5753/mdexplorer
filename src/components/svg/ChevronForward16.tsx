import { Path, Svg } from "react-native-svg";
import { ISvgIcon } from "./type";

export default function ChevronForward16({ color = "black" }: ISvgIcon) {
  return (
    <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
      <Path
        d="M5 3.5L11 8l-6 4.5"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
