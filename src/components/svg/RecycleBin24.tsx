import { Path, Svg } from "react-native-svg";
import { ISvgIcon } from "./type";

export default function RecycleBin24({ color = "black" }: ISvgIcon) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.406 2.89A2 2 0 0111.07 2h1.86a2 2 0 011.664.89l.906 1.36h3.75a.75.75 0 010 1.5H4.75a.75.75 0 010-1.5H8.5l.906-1.36zM15 22H9a4 4 0 01-4-4V7h14v11a4 4 0 01-4 4zm-5-11.75a.75.75 0 01.75.75v7a.75.75 0 01-1.5 0v-7a.75.75 0 01.75-.75zm4 0a.75.75 0 01.75.75v7a.75.75 0 01-1.5 0v-7a.75.75 0 01.75-.75z"
        fill={color}
      />
    </Svg>
  );
}
