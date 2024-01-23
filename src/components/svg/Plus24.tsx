import { Path, Svg } from "react-native-svg";
import { ISvgIcon } from "./type";

export default function Plus24({ color = "black" }: ISvgIcon) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 6v12m6-6H6"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
