import { backgroundColor, f1, isAndroid } from "@ilz5753/rnutils";
import { NavigationContainer } from "@react-navigation/native";
import { PropsWithChildren } from "react";
import { KeyboardAvoidingView, StatusBar } from "react-native";
import { SheetProvider } from "react-native-actions-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import ContextManager from "./contexts";
import store from "./redux/store";
import Screens from "./screens";
import "./sheets";
function WithContexts({ children }: PropsWithChildren) {
  return (
    <GestureHandlerRootView {...{ style: [f1] }}>
      <SafeAreaProvider {...{ style: [f1, backgroundColor("white")] }}>
        <KeyboardAvoidingView
          {...{
            style: [f1],
            behavior: isAndroid ? "height" : "padding",
          }}>
          <Provider {...{ store }}>
            <ContextManager>
              <NavigationContainer>{children}</NavigationContainer>
            </ContextManager>
          </Provider>
        </KeyboardAvoidingView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

export default function Main() {
  return (
    <WithContexts>
      <SheetProvider>
        <Screens />
      </SheetProvider>
      <StatusBar {...{ barStyle: "dark-content" }} />
    </WithContexts>
  );
}
