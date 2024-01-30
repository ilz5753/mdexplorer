import { TMDEditorPadSize } from "@ilz5753/rnmd";
import {
  HexToRgba,
  ReText,
  ReView,
  ScaleButton,
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  color,
  f1,
  fontSize,
  fw,
  getStyle,
  padding,
} from "@ilz5753/rnutils";
import { isNull, merge } from "lodash";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toggle from "react-native-toggle-element";
import { CtxErrorMsg } from "../../utils/fn";
import { IFileEditorSettingsModal, TFileEditorSettings } from "./type";

let FileEditorSettingsModal = createContext<IFileEditorSettingsModal | null>(
  null,
);
export let useFileEditorSettingsModal = () => {
  let ctx = useContext(FileEditorSettingsModal);
  if (isNull(ctx))
    throw new Error(CtxErrorMsg(`FileEditorSettingsModalProvider`));
  return ctx;
};
export default function FileEditorSettingsModalProvider({
  children,
}: PropsWithChildren) {
  let [Settings, setSettings] = useState<TFileEditorSettings>();
  let [visible, setVisible] = useState(false);
  let show = useCallback(() => setVisible(true), []);
  let close = useCallback(() => setVisible(false), []);
  let settings = useMemo(
    () =>
      Settings ?? { colors: { headerShadowColor: HexToRgba("#000000", 0.45) } },
    [Settings],
  );
  let updateSettings = useCallback(
    (set: Partial<TFileEditorSettings>) => {
      let n = merge({}, settings, set);
      n.colors = settings.colors;
      setSettings(n);
      close();
    },
    [settings],
  );
  return (
    <FileEditorSettingsModal.Provider
      {...{
        value: {
          show,
          settings,
        },
      }}>
      {children}
      <Modal
        {...{
          visible,
          onRequestClose: close,
          style: [f1, backgroundColor("#ffffff")],
          animationType: "slide",
        }}>
        <SettingsWrapper
          {...{
            settings,
            updateSettings,
          }}
        />
      </Modal>
    </FileEditorSettingsModal.Provider>
  );
}
interface ISettingsWrapper {
  settings: TFileEditorSettings;
  updateSettings(settings: Partial<TFileEditorSettings>): void;
}
function SettingsWrapper({ settings, updateSettings }: ISettingsWrapper) {
  let insets = useSafeAreaInsets();
  let [isRTL, setIsRTL] = useState(settings.isRTL ?? false);
  let [horizontal, setHorizontal] = useState(settings.horizontal ?? false);
  let [paddingSize, setPaddingSize] = useState<TMDEditorPadSize>(
    settings.paddingSize ?? "x",
  );
  let IsRTL = useMemo(() => horizontal && isRTL, [horizontal, isRTL]);
  let save = useCallback(
    () => updateSettings({ isRTL: IsRTL, horizontal }),
    [updateSettings, IsRTL, horizontal],
  );
  let g = <ReView {...{ style: [padding("t", 21)] }} />;
  let uh = useCallback((_if = false) => setHorizontal(_if), []);
  let ui = useCallback((_if = false) => setIsRTL(_if), []);
  let toggleProps = useMemo(
    () => ({
      trackBar: {
        activeBackgroundColor: "#ff5400",
        inActiveBackgroundColor: "#9a9a9a",
        borderWidth: 3.6,
        width: 100,
      },
      thumbStyle: { backgroundColor: "#ffffff" },
    }),
    [],
  );
  return (
    <ReView
      {...{
        style: [
          f1,
          padding("h", 16),
          padding("t", insets.top),
          padding("b", insets.bottom),
        ],
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
          MD Editor Settings
        </ReText>
      </ReView>
      {g}
      <ReView
        {...{
          style: [getStyle(["fdr", "aic", "jcsb"])],
        }}>
        <ReText
          {...{
            style: [fontSize(16), color("#000000")],
          }}>
          Horizontal
        </ReText>
        <Toggle
          {...{
            value: horizontal,
            onPress: uh,
            ...toggleProps,
          }}
        />
      </ReView>
      {g}
      <ReView
        {...{
          style: [getStyle(["fdr", "aic", "jcsb"])],
        }}>
        <ReText
          {...{
            style: [fontSize(16), color("#000000")],
          }}>
          Is RTL
        </ReText>
        <Toggle
          {...{
            value: IsRTL,
            onPress: ui,
            disabled: !horizontal,
            ...toggleProps,
          }}
        />
      </ReView>
      {g}
      <ScaleButton
        {...{
          style: [
            fw,
            getStyle(["aic"]),
            borderRadius("", 12),
            backgroundColor("#0099ff"),
            padding("v", 12),
          ],
          onPress: save,
        }}>
        <ReText
          {...{
            style: [fontSize(16), color("#ffffff"), getStyle(["fw6"])],
          }}>
          Save
        </ReText>
      </ScaleButton>
    </ReView>
  );
}
