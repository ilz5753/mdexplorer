import {
  ReView,
  ScaleButton,
  SquareLayout,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  center,
  f1,
} from "@ilz5753/rnutils";
import { useMemo } from "react";
import {
  FadeIn,
  FadeInLeft,
  FadeInRight,
  FadeOut,
  FadeOutLeft,
  FadeOutRight,
  LinearTransition,
} from "react-native-reanimated";
import SvgIcons from "../svg";
import { ICheckBox } from "./type";

export default function CheckBox({
  onPress,
  disabled,
  isSelected,
  size = 18,
  colors = {},
  duration = 300,
  rounded,
  isRTL = false,
}: ICheckBox) {
  let {
    selectedBg = "#0047ff",
    defaultBg = "transparent",
    selectedBorder = "#0047ff",
    defaultBorder = "#787878",
    check = "#ffffff",
  } = colors;
  let Cmp = useMemo(() => {
    let icon = SvgIcons.Check18;
    switch (size) {
      case 24:
        icon = SvgIcons.Check24;
        break;
      case 30:
        icon = SvgIcons.Check30;
        break;
      case 32:
        icon = SvgIcons.Check32;
        break;
      case 48:
        icon = SvgIcons.Check48;
        break;
      default:
        break;
    }
    return icon;
  }, [size]);
  let icSize = useMemo(() => {
    let s = 18;
    switch (size) {
      case 24:
      case 30:
      case 32:
      case 48:
        s = size;
        break;
      default:
        break;
    }
    return s * 1.08;
  }, [size]);
  let br = useMemo(
    () => borderRadius("", icSize * (rounded ? 0.5 : 0.125)),
    [icSize, rounded],
  );
  return (
    <ScaleButton
      {...{
        style: [
          SquareLayout(icSize),
          br,
          borderWidth("", 0.75),
          borderColor("", isSelected ? selectedBorder : defaultBorder),
          !isSelected && backgroundColor(defaultBg),
          center,
        ],
        selectedOpacity: 0.72,
        disabled,
        onPress,
        entering: (isRTL ? FadeInRight : FadeInLeft).duration(duration),
        exiting: (isRTL ? FadeOutRight : FadeOutLeft).duration(duration / 2),
        layout: LinearTransition.duration(duration),
      }}>
      {isSelected && (
        <ReView
          {...{
            style: [f1, backgroundColor(selectedBg), br],
            entering: FadeIn.duration(duration),
            exiting: FadeOut.duration(duration / 2),
            layout: LinearTransition.duration(duration),
          }}>
          <Cmp {...{ color: check }} />
        </ReView>
      )}
    </ScaleButton>
  );
}
