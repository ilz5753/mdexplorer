import {
  ReScrollView,
  ReText,
  ReView,
  ScaleButton,
  backgroundColor,
  borderRadius,
  color,
  fontSize,
  getStyle,
  padding,
} from "@ilz5753/rnutils";
import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { isString } from "lodash";
import { useCallback, useMemo } from "react";
import { SheetManager } from "react-native-actions-sheet";
import { LinearTransition } from "react-native-reanimated";
import { useHistory } from "../../contexts/History";
import { useToolbar } from "../../contexts/Toolbar";
import { SheetKeys } from "../../utils/constants";
import { GetNameFromPath, NewId } from "../../utils/fn";
import SvgIcons from "../svg";
import { ITabBar } from "./type";
export default function TopTabBar({ isRTL, linkPrefix }: ITabBar) {
  return ({ state, descriptors, navigation }: MaterialTopTabBarProps) => {
    let { add, data: hData } = useHistory();
    let hNames = hData.map(({ name }) => name);
    let { updateToolbar } = useToolbar();
    let fd = useMemo(() => getStyle([`fd${isRTL ? "rr" : "r"}`]), [isRTL]);
    let createNewTab = useCallback(async () => {
      let hid = NewId();
      let id = NewId();
      try {
        let { lastPath, name, stackName } = (await SheetManager.show(
          SheetKeys.NoUTab,
          {
            payload: {
              linkPrefix,
              id: hid,
              historyNames: [],
              tabHistoryNames: hNames,
            },
          },
        )) as any;
        // console.log({ lastPath, name, stackName });
        add({
          id: hid,
          name,
          lastPath,
          history: [
            {
              id,
              name: stackName,
              path: lastPath,
            },
          ],
        });
      } catch (e: any) {}
    }, [linkPrefix, add]);
    return (
      <ReView
        {...{
          style: [padding("v", 8)],
          layout: LinearTransition,
        }}>
        <ReScrollView
          {...{
            horizontal: true,
            showsHorizontalScrollIndicator: false,
            layout: LinearTransition,
            contentContainerStyle: [fd],
          }}>
          <ReView
            {...{
              style: [fd, getStyle(["aic"])],
              layout: LinearTransition,
            }}>
            {state.routes.map((route, index) => {
              let { options } = descriptors[route.key];
              let label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;
              let focused = state.index === index;
              let onPress = () => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                });

                if (!focused && !event.defaultPrevented) {
                  let { name, params } = route;
                  if (hNames.includes(name)) {
                    let i = hNames.indexOf(name);
                    let { lastPath } = hData[i];
                    // console.log({ lastPath });
                    let { name: ln } = GetNameFromPath(lastPath);
                    navigation.navigate(name, params);
                    updateToolbar({ path: lastPath, name: ln }, true);
                  }
                }
              };
              let onLongPress = () => {
                navigation.emit({
                  type: "tabLongPress",
                  target: route.key,
                });
              };
              return (
                <ScaleButton
                  {...{
                    key: route.key,
                    accessibilityRole: "button",
                    accessibilityState: focused ? { selected: true } : {},
                    accessibilityLabel: options.tabBarAccessibilityLabel,
                    testID: options.tabBarTestID,
                    onPress,
                    onLongPress,
                    layout: LinearTransition,
                    style: [padding("h", 8)],
                  }}>
                  {/* <ReText>
                        {label}
                    </ReText> */}
                  {isString(label) && (
                    <ReText
                      {...{
                        style: [
                          fontSize(15),
                          color(focused ? "purple" : "black"),
                        ],
                      }}>
                      {label}
                    </ReText>
                  )}
                </ScaleButton>
              );
            })}
            <ScaleButton
              {...{
                onPress: createNewTab,
                style: [backgroundColor("#0047ff"), borderRadius("", 4)],
              }}>
              <SvgIcons.Plus24 {...{ color: "#ffffff" }} />
            </ScaleButton>
          </ReView>
        </ReScrollView>
      </ReView>
    );
  };
}
