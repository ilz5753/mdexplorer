import { ViewStyle } from "react-native";

export interface ICustomSheetProvider {
  sheetId: string;
  gestureEnabled?: boolean;
  containerStyle?: ViewStyle;
}
