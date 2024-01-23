import { Path, Svg } from "react-native-svg";
import { ISvgIcon } from "./type";

export default function Check18({ color = "black" }: ISvgIcon) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
      <Path
        d="M3.75 9.75l2.645 2.116a1.5 1.5 0 002.052-.168L14.25 5.25"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
