import { Path, Svg } from "react-native-svg";
import { ISvgIcon } from "./type";

export default function Heart24Fill({ color = "black" }: ISvgIcon) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 5.524l.765-.822c2.113-2.27 5.538-2.27 7.65 0 2.113 2.27 2.113 5.95 0 8.22l-6.885 7.397a2.06 2.06 0 01-3.06 0l-6.886-7.397c-2.112-2.27-2.112-5.95 0-8.22 2.113-2.27 5.538-2.27 7.651 0l.765.822zm5-.274a.75.75 0 000 1.5c.69 0 1.25.56 1.25 1.25a.75.75 0 001.5 0A2.75 2.75 0 0017 5.25z"
        fill={color}
      />
    </Svg>
  );
}
