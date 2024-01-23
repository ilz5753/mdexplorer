import { registerSheet } from "react-native-actions-sheet";
import NoUFoF from "./sheets/NoUFoF";
import NoUTab from "./sheets/NoUTab";
import { SheetKeys } from "./utils/constants";
let sheets = [
  {
    id: SheetKeys.NoUTab,
    Sheet: NoUTab,
  },
  {
    id: SheetKeys.NoUFoF,
    Sheet: NoUFoF,
  },
];
sheets.forEach(({ id, Sheet }) => registerSheet(id, Sheet));
