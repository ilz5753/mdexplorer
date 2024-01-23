import {
  ReText,
  ReView,
  ScaleButton,
  color,
  fontSize,
  fw,
  gap,
  getStyle,
  opacity,
  padding,
} from "@ilz5753/rnutils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useMemo } from "react";
import { LinearTransition } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SvgIcons from "../svg";
import ToolbarCmpItem from "./Item";
import { IToolbarCmp } from "./type";
import { useRefresh } from "../../contexts/Refresh";
let Chevron = (isRTL = false) =>
  SvgIcons[`Chevron${isRTL ? "Forward" : "Back"}16`];
export default function ToolbarCmp({
  isRTL = false,
  go,
  backDisabled = false,
  forwardDisabled = false,
  title,
  hasStatusbar = false,
  colors = {},
}: IToolbarCmp) {
  let { reload } = useRefresh();
  let {
    navigate = "#666666",
    navigateText = "#8f8f8f",
    title: titleColor = "#000000",
    clearCacheBin = "#666666",
  } = colors;
  let insets = useSafeAreaInsets();
  let fd = useMemo(() => getStyle([`fd${isRTL ? "rr" : "r"}`]), [isRTL]);
  // let ta = useMemo(() => getStyle([`ta${isRTL ? "r" : "l"}`]), [isRTL]);
  let pt = useMemo(
    () => (hasStatusbar ? insets.top : 8),
    [hasStatusbar, insets],
  );
  let GO = useCallback(
    (step: boolean) => {
      if (go) go(step);
    },
    [go],
  );
  let back = useCallback(() => GO(true), [GO]);
  let forward = useCallback(() => GO(false), [GO]);
  let BACK = useMemo(() => Chevron(isRTL), [isRTL]);
  let FORWARD = useMemo(() => Chevron(!isRTL), [isRTL]);
  let bs = [padding("v", 4)];
  let _do = opacity(0.36);
  let ds = useMemo(
    () => [fontSize(13.5), getStyle(["fw7"]), color(navigateText)],
    [navigateText],
  );
  let clearCache = useCallback(async () => {
    try {
      await AsyncStorage.clear();
      reload(750);
    } catch (e: any) {}
  }, []);
  return (
    <ReView
      {...{
        style: [
          fw,
          padding("h", 16),
          padding("b", 8),
          padding("t", pt),
          fd,
          getStyle(["aic", "jcsb"]),
          //   borderWidth("", 0.5),
        ],
        layout: LinearTransition,
      }}>
      <ReView
        {...{
          style: [fd, getStyle(["aic"]), gap(16)],
          layout: LinearTransition,
        }}>
        <ToolbarCmpItem
          {...{
            icon: (
              <ReView
                {...{
                  style: [fd, getStyle(["aic"]), gap(12)],
                  layout: LinearTransition,
                }}>
                <ScaleButton
                  {...{
                    onPress: back,
                    style: [backDisabled && _do, bs],
                    disabled: backDisabled,
                    layout: LinearTransition,
                  }}>
                  <BACK {...{ color: navigate }} />
                </ScaleButton>
                <ScaleButton
                  {...{
                    onPress: forward,
                    style: [forwardDisabled && _do, bs],
                    disabled: forwardDisabled,
                    layout: LinearTransition,
                  }}>
                  <FORWARD {...{ color: navigate }} />
                </ScaleButton>
              </ReView>
            ),
            detail: (
              <ReView
                {...{
                  style: [fd, getStyle(["aic"])],
                  layout: LinearTransition,
                }}>
                <ReText
                  {...{
                    style: [ds],
                    layout: LinearTransition,
                  }}>
                  Back
                </ReText>
                <ReText
                  {...{
                    style: [ds],
                    layout: LinearTransition,
                  }}>
                  /
                </ReText>
                <ReText
                  {...{
                    style: [ds],
                    layout: LinearTransition,
                  }}>
                  Forward
                </ReText>
              </ReView>
            ),
          }}
        />
        <ReText
          {...{
            style: [fontSize(18), getStyle(["fw7"]), color(titleColor)],
            layout: LinearTransition,
          }}>
          {title}
        </ReText>
      </ReView>
      <ReView
        {...{
          // style: [fd, getStyle(["aic"]), gap(12)],
          layout: LinearTransition,
        }}>
        <ToolbarCmpItem
          {...{
            icon: (
              <ScaleButton
                {...{
                  onPress: clearCache,
                  style: [bs],
                  // disabled: backDisabled,
                  layout: LinearTransition,
                }}>
                <SvgIcons.RecycleBin24 {...{ color: clearCacheBin }} />
              </ScaleButton>
            ),
            detail: (
              <ReText
                {...{
                  style: [ds],
                  layout: LinearTransition,
                }}>
                Clear cache
              </ReText>
            ),
          }}
        />
      </ReView>
    </ReView>
  );
}
