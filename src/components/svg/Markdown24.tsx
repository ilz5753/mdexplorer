import { Path, Svg } from "react-native-svg";
import { ISvgIcon } from "./type";

export default function Markdown24({ color = "black" }: ISvgIcon) {
  return (
    <Svg width={24} height={14.77} viewBox="0 0 24 14.77" fill="none">
      <Path
        d="M22.27 14.771H1.73A1.731 1.731 0 010 13.041V1.73A1.73 1.73 0 011.73 0h20.54A1.73 1.73 0 0124 1.73V13.04a1.73 1.73 0 01-1.73 1.732zM5.768 11.309v-4.5l2.309 2.885 2.307-2.886v4.5h2.308V3.464h-2.308L8.077 6.348 5.768 3.463H3.46v7.848l2.308-.002zm15.464-3.923h-2.308V3.462h-2.308v3.924h-2.308l3.462 4.039 3.462-4.04z"
        fill={color}
      />
    </Svg>
  );
}
