import { PropsWithChildren } from "react";
import ActionSheet from "react-native-actions-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ICustomSheetProvider } from "./type";

export default function CustomSheetProvider({
  sheetId,
  children,
  gestureEnabled = true,
  containerStyle,
}: PropsWithChildren<ICustomSheetProvider>) {
  let safeAreaInsets = useSafeAreaInsets();
  return (
    <ActionSheet
      {...{
        id: sheetId,
        children,
        headerAlwaysVisible: true,
        indicatorStyle: {
          backgroundColor: "#dddddd",
        },
        gestureEnabled,
        containerStyle,
        safeAreaInsets,
        // snapPoints: [],
        statusBarTranslucent: false,
        drawUnderStatusBar: false,
      }}
    />
  );
}
