import { ReView, backgroundColor, center, f1 } from "@ilz5753/rnutils";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { StatusBar } from "react-native";
import {
  FadeInLeft,
  FadeInRight,
  FadeOutLeft,
  FadeOutRight,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import SvgIcons from "../../components/svg";
import { CtxErrorMsg } from "../../utils/fn";
import { IRefresh } from "./type";
let Refresh = createContext<null | IRefresh>(null);
export let useRefresh = () => {
  let ctx = useContext(Refresh);
  if (ctx === null) throw new Error(CtxErrorMsg(`RefreshProvider`));
  return ctx;
};
export default function RefreshProvider({ children }: PropsWithChildren) {
  let rot = useSharedValue(0);
  let [refresh, setRefresh] = useState(false);
  let reload = useCallback((duration: number) => {
    setRefresh(true);
    rot.value = withRepeat(withTiming(360, { duration: 1000 }), -1);
    setTimeout(() => {
      setRefresh(false);
      rot.value = 0;
    }, duration);
  }, []);
  let rotationAnim = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${rot.value}deg`,
      },
    ],
  }));
  return (
    <Refresh.Provider {...{ value: { reload } }}>
      {refresh ? (
        <ReView
          {...{
            style: [f1, center, backgroundColor("#ffffff")],
            entering: FadeInLeft.duration(500),
            exiting: FadeOutLeft.duration(500),
            layout: LinearTransition,
          }}>
          <ReView {...{ style: [rotationAnim], layout: LinearTransition }}>
            <SvgIcons.Loading24 {...{ color: "#0099ff" }} />
          </ReView>
          <StatusBar {...{ barStyle: "dark-content" }} />
        </ReView>
      ) : (
        <ReView
          {...{
            style: [f1],
            entering: FadeInRight.duration(500),
            exiting: FadeOutRight.duration(500),
            layout: LinearTransition,
            children,
          }}
        />
      )}
      {/* {children} */}
      {/* {refresh && (
        <ReView
          {...{
            style: [f1, center, overlay1],
          }}>
          <ReView
            {...{
              style: [rotationAnim],
              entering: FadeIn,
              exiting: FadeOut,
              layout: LinearTransition,
            }}>
            <SvgIcons.Loading24 {...{ color: "#0099ff" }} />
          </ReView>
        </ReView>
      )} */}
    </Refresh.Provider>
  );
}
