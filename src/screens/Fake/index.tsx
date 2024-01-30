import { HexToRgba } from "@ilz5753/rnutils";
import { MDEditorCopy } from "../../contexts/FileEditorModal/MC";
import { useSafeAreaInsets } from "react-native-safe-area-context";
let text = `# Fake

> fake screen

- New
* list
- mixed
* intrested

>> new user?

* Yes
- No

_Ha?_

*Also*

~~What the fuck?~~

`;

export default function Fake() {
  let { top: topSavHeight, bottom: bottomSavHeight } = useSafeAreaInsets();
  return (
    <MDEditorCopy
      {...{
        colors: {
          headerShadowColor: HexToRgba("#000000", 0.36),
        },
        header: {
          title: "Fake",
          subtitle: "fake.md",
          hasLeftBtn: true,
          leftBtn: "close",
        },
        text,
        topSavHeight,
        bottomSavHeight,
        // horizontal: true,
        isRTL: true,
      }}
    />
  );
}
