import { Path, Svg } from "react-native-svg";
import { ISvgIcon } from "./type";

export default function Heart24Empty({ color = "black" }: ISvgIcon) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M17 6.5a2 2 0 012 2m-7-2.797L12.685 5a5.361 5.361 0 017.717 0c2.073 2.127 2.137 5.554.144 7.76l-5.726 6.338a3.78 3.78 0 01-5.64 0L3.454 12.76C1.46 10.554 1.524 7.127 3.598 5a5.361 5.361 0 017.717 0l.685.703z"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
