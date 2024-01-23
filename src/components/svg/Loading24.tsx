import { Path, Svg } from "react-native-svg";
import { ISvgIcon } from "./type";

export default function Loading24({ color = "black" }: ISvgIcon) {
  return (
    <Svg width={72} height={72} viewBox="0 0 72 72" fill="none">
      <Path
        opacity={0.4}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M36 3.75A2.25 2.25 0 0138.25 6v9a2.25 2.25 0 01-4.5 0V6A2.25 2.25 0 0136 3.75zM36 54.75A2.25 2.25 0 0138.25 57v9a2.25 2.25 0 01-4.5 0v-9A2.25 2.25 0 0136 54.75zM13.195 13.195a2.25 2.25 0 013.183 0l6.363 6.364a2.25 2.25 0 11-3.182 3.182l-6.364-6.364a2.25 2.25 0 010-3.182zM49.258 49.258a2.25 2.25 0 013.182 0l6.364 6.364a2.25 2.25 0 11-3.182 3.182l-6.364-6.364a2.25 2.25 0 010-3.182zM68.25 36A2.25 2.25 0 0166 38.25h-9a2.25 2.25 0 010-4.5h9A2.25 2.25 0 0168.25 36zM17.25 36A2.25 2.25 0 0115 38.25H6a2.25 2.25 0 010-4.5h9A2.25 2.25 0 0117.25 36z"
        fill={color}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M58.804 13.195a2.25 2.25 0 010 3.183L52.44 22.74a2.25 2.25 0 11-3.182-3.182l6.364-6.364a2.25 2.25 0 013.182 0z"
        fill={color}
      />
      <Path
        opacity={0.4}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.742 49.258a2.25 2.25 0 010 3.182l-6.364 6.364a2.25 2.25 0 11-3.182-3.182l6.364-6.364a2.25 2.25 0 013.182 0z"
        fill={color}
      />
    </Svg>
  );
}
