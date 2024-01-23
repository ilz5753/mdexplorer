import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useMemo } from "react";
import { IStackNavigation } from "./type";

const NS = createNativeStackNavigator();
export default function StackNavigation({
  screens,
  initialIndex = 0,
  headerShown = false,
}: IStackNavigation) {
  let length = useMemo(() => screens.length, [screens]);
  let index = useMemo(
    () => (initialIndex < length || initialIndex >= 0 ? initialIndex : 0),
    [initialIndex, length],
  );
  return (
    <NS.Navigator
      {...{
        screenOptions: { headerShown },
        initialRouteName: screens[index].name,
      }}>
      {screens.map(({ id, ...rest }) => (
        <NS.Screen {...{ key: id, ...rest }} />
      ))}
    </NS.Navigator>
  );
}
