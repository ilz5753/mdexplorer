import { MDPreview } from "@ilz5753/rnmd";
import {
  backgroundColor,
  borderRadius,
  color,
  fontSize,
  fw,
  getStyle,
  padding,
} from "@ilz5753/rnutils";
import { useLinkTo } from "@react-navigation/native";
import { useCallback } from "react";
import { TouchableOpacity } from "react-native";
import Animated from "react-native-reanimated";
import Wrapper from "../../components/Wrapper";
let md = `# 🚀 Welcome to MDExplorer! 📂

Explore and edit Markdown files with MDExplorer, an app designed for seamless navigation and editing. Let's dive into the features:

## 💅 Features:

---

1. 🖥️ **Simple MacOS-Like Navigation Bar**: Enjoy a familiar navigation experience reminiscent of MacOS.
2. 📑 **Top Tab-Based Navigation**: Navigate through nested files and folders with ease using top tabs.
3. 🏞️ **Hierarchical Navigation**: Explore files hierarchically for an organized experience.
4. 🗑️ **Clear Cache Button**: Easily clear cache when needed for a fresh start.
5. 🔄 **Seamless Loading View**: Experience smooth loading transitions for a seamless user interface.
6. 📝 **MDEditor File Handling**: Edit Markdown files effortlessly with the integrated Markdown editor.
7. ↩️ **Back/Forward Navigation**: Navigate back and forth based on folder paths for efficient exploration.

## 📦 Packages Used:

---

1. **@ilz5753/rnmd:** React Native Markdown Editor and Viewer
2. **@ilz5753/rnutils:** Utility functions for React Native
3. **@react-native-async-storage/async-storage:** Asynchronous storage for React Native
4. **react-navigation:** Navigation for React Native apps
5. **redux and @reduxjs/toolkit:** State management for React applications
6. **lodash:** Utility library for JavaScript
7. **react-native-actions-sheet:** Action sheet component for React Native
8. **react-native-gesture-handler:** Gesture recognition for React Native
9. **react-native-input-outline:** Input outline component for React Native
10. **react-native-reanimated:** React Native library for smooth animations
11. **react-native-svg:** SVG library for React Native
12. **react-native-toggle-element:** Toggle element component for React Native

## ✅ Todo

---

Explore more possibilities with these upcoming features for MDExplorer:

> **⚙️ MDEditor Settings Screen**:

>> [ ] Create a settings screen for the Markdown Editor.

>> [ ] Implement it as a Modal or Stack screen.

---

> **🔍 Search Functionality**:

>> [ ] Add a search feature to easily locate files and content.

>> [ ] Implement intuitive search functionality for a seamless experience.

---

> **📂 File/Folder Actions**:

>> [ ] Expand the list of actions for files and folders.

>> [ ] Include options like Edit, Favorite, and Delete.

Feel free to contribute and stay tuned for exciting updates! 🚀

Ready to explore Markdown in style? Let MDExplorer be your guide! 🌟
`;
export default function Welcome() {
  let linkTo = useLinkTo();
  let goToExplorer = useCallback(() => linkTo(`/Explorer`), []);
  return (
    <Wrapper sab sat>
      <MDPreview
        {...{
          md,
          colors: {
            ruleColors: {},
          },
          styles: {},
        }}
      />
      <Animated.View
        {...{
          style: [fw, padding("t", 16), getStyle(["aic"])],
        }}>
        <TouchableOpacity
          {...{
            style: [
              padding("", 10),
              borderRadius("", 12),
              backgroundColor("#0047ff"),
            ],
            activeOpacity: 0.72,
            onPress: goToExplorer,
          }}>
          <Animated.Text {...{ style: [fontSize(18), color("#ffffff")] }}>
            Go to Explorer
          </Animated.Text>
        </TouchableOpacity>
      </Animated.View>
    </Wrapper>
  );
}
