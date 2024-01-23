import { Path, Svg } from "react-native-svg";
import { ISvgIcon } from "./type";

export default function Edit24({ color = "black" }: ISvgIcon) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.75 6A3.25 3.25 0 016 2.75h6a.75.75 0 000-1.5H6A4.75 4.75 0 001.25 6v12A4.75 4.75 0 006 22.75h12A4.75 4.75 0 0022.75 18v-6a.75.75 0 00-1.5 0v6A3.25 3.25 0 0118 21.25H6A3.25 3.25 0 012.75 18V6zm13.669-3.323a2.312 2.312 0 013.27 0l1.634 1.635a2.312 2.312 0 010 3.269l-1.45 1.45a16.081 16.081 0 01-.357-.183c-.835-.44-1.827-1.057-2.567-1.797-.74-.74-1.357-1.732-1.797-2.567a16.251 16.251 0 01-.182-.358l1.449-1.449zm-.53 5.434c.875.876 1.989 1.565 2.87 2.033l-5.699 5.7a2.312 2.312 0 01-1.308.654l-3.432.49a1.156 1.156 0 01-1.308-1.308l.49-3.432c.071-.495.3-.954.654-1.308l5.7-5.7c.468.882 1.157 1.996 2.033 2.871z"
        fill={color}
      />
    </Svg>
  );
}
