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
import CustomSheetProvider from "../components/CustomSheetProvider";
import { NewId } from "../utils/fn";
export interface INoUTab {
  name?: string;
  linkPrefix: string;
  id: string;
  stackName?: string;
  historyNames: string[];
  tabHistoryNames: string[];
}
export default function NoUTab({
  sheetId,
  payload = {
    linkPrefix: "",
    id: NewId(),
    historyNames: [],
    tabHistoryNames: [],
  },
}: SheetProps<INoUTab>) {
  let { name, linkPrefix, id, stackName, historyNames, tabHistoryNames } =
    payload;
  let newMode = isUndefined(name);
  let [TabName, setTabName] = useState(name ?? "");
  let [StackName, setStackName] = useState(stackName ?? ``);
  let g = <ReView {...{ style: [padding("t", 30)] }} />;
  let rtn = useMemo(() => TabName.trim(), [TabName]);
  let rsn = useMemo(() => StackName.trim(), [StackName]);
  let emptyRtn = useMemo(() => isEmpty(rtn), [rtn]);
  let emptyRsn = useMemo(() => isEmpty(rsn), [rsn]);
  let lastPath = useMemo(
    () =>
      `${linkPrefix}/${emptyRtn ? "[No Tab Name]" : rtn}/${
        emptyRsn ? "[No Stack Name]" : rsn
      }`,
    [linkPrefix, rtn, rsn, emptyRtn, emptyRsn],
  );
  let isSameName = useMemo(() => rtn === rsn, [rtn, rsn]);
  let rtnExist = useMemo(
    () => historyNames.includes(rtn) || tabHistoryNames.includes(rtn),
    [rtn, historyNames, tabHistoryNames, rtn],
  );
  let rsnExist = useMemo(
    () => historyNames.includes(rsn) || tabHistoryNames.includes(rsn),
    [rsn, historyNames, tabHistoryNames, rsn],
  );
  let disabled = useMemo(
    () => emptyRtn || emptyRsn || isSameName || rtnExist || rsnExist,
    [emptyRtn, emptyRsn, isSameName, rtnExist, rsnExist],
  );
  let save = useCallback(async () => {
    try {
      await SheetManager.hide(sheetId, {
        payload: {
          lastPath,
          name: rtn,
          stackName: rsn,
        },
      });
    } catch (e) {}
  }, [sheetId, lastPath, rtn, rsn]);
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
            {newMode ? "Create New" : "Edit"} Tab
          </ReText>
        </ReView>
        {g}
        <InputOutline
          {...{
            value: TabName,
            onChangeText: setTabName,
            placeholder: "Tab Name",
            placeholderTextColor: "#878787",
            error: emptyRtn
              ? "Please Fill Tab Screen Name"
              : isSameName
              ? "Duplicate Names Found Via Stack Screen Name"
              : rtnExist
              ? "Duplicate Tab Screen Name"
              : undefined,
          }}
        />
        {g}
        <InputOutline
          {...{
            value: lastPath,
            placeholder: "Last Path",
            placeholderTextColor: "#878787",
            editable: false,
            backgroundColor: "#f7f7f7",
            focusable: false,
          }}
        />
        {g}
        <InputOutline
          {...{
            value: StackName,
            onChangeText: setStackName,
            placeholder: "Stack Name",
            placeholderTextColor: "#878787",
            error: emptyRsn
              ? "Please Fill Stack Screen Name"
              : isSameName
              ? "Duplicate Names Found Via Tab Screen Name"
              : rsnExist
              ? "Duplicate Stack Screen Name"
              : undefined,
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
              padding("v", 12),
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
