import { isAndroid } from "@ilz5753/rnutils";
import { useEffect } from "react";
import { LogBox } from "react-native";
import "react-native-gesture-handler";
import SystemNavigationBar from "react-native-system-navigation-bar";
import Main from "./src";
LogBox.ignoreAllLogs();
export default function App() {
  useEffect(() => {
    if (isAndroid)
      (async () => {
        try {
          await SystemNavigationBar.theme({
            navigation: {
              dark: "#ffffff",
              light: "#ffffff",
            },
            status: {
              dark: "#ffffff",
              light: "#ffffff",
            },
          });
        } catch (e) {}
      })();
  }, []);
  return <Main />;
}
