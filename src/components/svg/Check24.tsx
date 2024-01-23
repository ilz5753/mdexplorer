import { Path, Svg } from "react-native-svg";
import { ISvgIcon } from "./type";

export default function Check24({ color = "black" }: ISvgIcon) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M5 13l3.526 2.821a2 2 0 002.736-.224L19 7"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
