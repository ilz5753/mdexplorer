import { Path, Svg } from "react-native-svg";
import { ISvgIcon } from "./type";

export default function Check30({ color = "black" }: ISvgIcon) {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30" fill="none">
      <Path
        d="M6.25 16.25l4.408 3.526a2.5 2.5 0 003.42-.28L23.75 8.75"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
