import { Path, Svg } from "react-native-svg";
import { ISvgIcon } from "./type";

export default function Check32({ color = "black" }: ISvgIcon) {
  return (
    <Svg width={32} height={32} viewBox="0 0 32 32" fill="none">
      <Path
        d="M6.667 17.333l4.702 3.762a2.667 2.667 0 003.648-.299L25.333 9.333"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
