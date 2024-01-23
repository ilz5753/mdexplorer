import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useMemo } from "react";
import { ITopTabNavigation } from "./type";

const TT = createMaterialTopTabNavigator();
export default function TopTabNavigation({
  screens,
  initialIndex = 0,
  tabBar,
  swipeEnabled = false,
}: ITopTabNavigation) {
  let length = useMemo(() => screens.length, [screens]);
  let index = useMemo(
    () => (initialIndex < length || initialIndex >= 0 ? initialIndex : 0),
    [initialIndex, length],
  );
  return (
    <TT.Navigator
      {...{
        initialRouteName: screens[index].name,
        tabBar,
        screenOptions: { swipeEnabled },
      }}>
      {screens.map(({ id, ...rest }) => (
        <TT.Screen {...{ key: id, ...rest }} />
      ))}
    </TT.Navigator>
  );
}
