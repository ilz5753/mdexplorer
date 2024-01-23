import { LogBox } from "react-native";
import "react-native-gesture-handler";
import Main from "./src";
LogBox.ignoreAllLogs();
export default function App() {
  return <Main />;
}
