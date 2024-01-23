import {
  ReText,
  ReView,
  ScaleButton,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  color,
  fontSize,
  fw,
  getStyle,
  padding,
} from "@ilz5753/rnutils";
import { isEmpty, isUndefined } from "lodash";
import { useCallback, useMemo, useState } from "react";
import { SheetManager, SheetProps } from "react-native-actions-sheet";
import { InputOutline } from "react-native-input-outline";
import Toggle from "react-native-toggle-element";
import CustomSheetProvider from "../components/CustomSheetProvider";
import SvgIcons from "../components/svg";
export interface INoUFoF {
  name?: string;
  remain: string;
  IsFile?: boolean;
  historyNames: string[];
  tabHistoryNames: string[];
}
export default function NoUFoF({
  sheetId,
  payload = { remain: "/Nothing", historyNames: [], tabHistoryNames: [] },
}: SheetProps<INoUFoF>) {
  let { name, remain, IsFile, historyNames, tabHistoryNames } = payload;
  let hasIsFile = useMemo(() => !isUndefined(IsFile), [IsFile]);
  let [isFile, setIsFile] = useState(hasIsFile ? IsFile : true);
  let fileSuffix = useMemo(() => (isFile ? ".md" : ""), [isFile]);
  let newMode = useMemo(() => isUndefined(name), [name]);
  let rsn = useMemo(
    () => (name ? (isFile ? name.replace(fileSuffix, "") : name) : ""),
    [name, isFile, fileSuffix],
  );
  let [FoFName, setFoFName] = useState(rsn);
  let g = <ReView {...{ style: [padding("t", 30)] }} />;
  let rtn = useMemo(() => FoFName.trim(), [FoFName]);
  let fsRtn = useMemo(() => `${rtn}${fileSuffix}`, [rtn, fileSuffix]);
  let emptyRtn = useMemo(() => isEmpty(rtn), [rtn]);
  let nameExist = useMemo(
    () => historyNames.includes(fsRtn) || tabHistoryNames.includes(rtn),
    [fsRtn, historyNames, tabHistoryNames, rtn],
  );
  let disabled = useMemo(() => emptyRtn || nameExist, [emptyRtn, nameExist]);
  let path = useMemo(
    () => `${remain}/${emptyRtn ? "[No Name]" : rtn}${fileSuffix}`,
    [remain, emptyRtn, rtn, fileSuffix],
  );
  let save = useCallback(async () => {
    try {
      await SheetManager.hide(sheetId, {
        payload: {
          path,
          name: `${rtn}${fileSuffix}`,
          isFile,
        },
      });
    } catch (e) {}
  }, [sheetId, path, rtn, isFile, fileSuffix]);
  let updateIsFile = useCallback((_if = false) => setIsFile(_if), []);
  let _if = useMemo(() => isFile && (IsFile ?? true), [isFile, IsFile]);
  let ph = useMemo(() => `${_if ? "File" : "Folder"} Name`, [_if]);
  return (
    <CustomSheetProvider {...{ sheetId }}>
      <ReView
        {...{
          style: [padding("h", 16)],
        }}>
        <ReView
          {...{
            style: [
              padding("v", 12),
              getStyle(["aic"]),
              borderWidth("b", 0.75),
              borderColor("b", "#777777"),
            ],
          }}>
          <ReText
            {...{
              style: [fontSize(20), color("#000000"), getStyle(["fw8"])],
            }}>
            {newMode ? "Create New" : "Edit"} {_if ? "Markdown File" : "Folder"}
          </ReText>
        </ReView>
        {g}
        <ReView {...{ style: [getStyle(["aic"])] }}>
          <Toggle
            {...{
              value: isFile,
              onPress: updateIsFile,
              trackBar: {
                activeBackgroundColor: "#ff5400",
                inActiveBackgroundColor: "#9a9a9a",
                borderWidth: 3.6,
                width: 100,
              },
              thumbStyle: { backgroundColor: "#ffffff" },
              rightComponent: <SvgIcons.Markdown24 {...{ color: "#0a45a0" }} />,
              leftComponent: (
                <SvgIcons.Folder24Close {...{ color: "#4100ff" }} />
              ),
              disabled: !isUndefined(IsFile),
            }}
          />
        </ReView>
        {g}
        <InputOutline
          {...{
            value: FoFName,
            onChangeText: setFoFName,
            placeholder: ph,
            placeholderTextColor: "#878787",
            error: emptyRtn
              ? `Please Fill ${ph}.`
              : nameExist
              ? `${ph} Already Exist.`
              : undefined,
          }}
        />
        {g}
        <InputOutline
          {...{
            value: path,
            placeholder: "Path",
            placeholderTextColor: "#878787",
            editable: false,
            backgroundColor: "#f7f7f7",
          }}
        />
        {g}
        <ScaleButton
          {...{
            style: [
              fw,
              getStyle(["aic"]),
              borderRadius("", 12),
              backgroundColor(disabled ? "#c0c0c0" : "#0099ff"),
              padding("v", 16),
            ],
            onPress: save,
            disabled,
          }}>
          <ReText
            {...{ style: [fontSize(16), color("#ffffff"), getStyle(["fw6"])] }}>
            {newMode ? "Create" : "Save"}
          </ReText>
        </ScaleButton>
        {g}
      </ReView>
    </CustomSheetProvider>
  );
}
