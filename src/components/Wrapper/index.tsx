import { backgroundColor, f1, padding } from "@ilz5753/rnutils";
import { PropsWithChildren } from "react";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { IWrapper } from "./type";

export default function Wrapper({
  children,
  sab = false,
  sat = false,
}: PropsWithChildren<IWrapper>) {
  let { top, bottom } = useSafeAreaInsets();
  return (
    <Animated.View
      {...{
        style: [
          f1,
          sat && padding("t", top),
          sab && padding("b", bottom),
          backgroundColor("#ffffff"),
          padding("h", 8),
        ],
        children,
      }}
    />
  );
}
