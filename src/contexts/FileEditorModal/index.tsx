import { backgroundColor, f1 } from "@ilz5753/rnutils";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { CtxErrorMsg } from "../../utils/fn";
import { useFileEditorSettingsModal } from "../FileEditorSettingsModal";
// import { MDEditorCopy } from "./MC";
import { MDEditor } from "@ilz5753/rnmd";
// import { MDEditor } from "./MDEditor";
import { IFileEditorModal, IFileEditorModalData, TSetData } from "./type";
let FileEditorModal = createContext<null | IFileEditorModal>(null);
export let useFileEditorModal = () => {
  let ctx = useContext(FileEditorModal);
  if (ctx === null) throw new Error(CtxErrorMsg(`FileEditorModalProvider`));
  return ctx;
};
export default function FileEditorModalProvider({
  children,
}: PropsWithChildren) {
  let insets = useSafeAreaInsets();
  let { settings } = useFileEditorSettingsModal();
  let handlerRef = useRef<(newData?: Partial<IFileEditorModalData>) => void>();
  let [editorVisible, setEditorVisible] = useState(false);
  let [data, setData] = useState<IFileEditorModalData>({
    name: "",
    path: "",
    fileContent: "",
  });
  let editorOpen = useCallback(() => setEditorVisible(true), []);
  let editorClose = useCallback(() => setEditorVisible(false), []);
  let handler = useCallback(
    (setData: (newData?: Partial<IFileEditorModalData>) => void) => {
      handlerRef.current = setData;
    },
    [],
  );
  let onSubmitText = useCallback((text: string) => {
    if (handlerRef.current) handlerRef.current({ fileContent: text });
    editorClose();
  }, []);
  let show = useCallback(
    (fileData: IFileEditorModalData, SetData?: TSetData) => {
      setData(fileData);
      editorOpen();
      handlerRef.current = SetData;
    },
    [],
  );
  let editor = useMemo(
    () => (
      <MDEditor
        {...{
          header: {
            title: data.name,
            subtitle: data.path,
            hasLeftBtn: true,
            leftBtn: "close",
            leftPress: {
              onPress: editorClose,
            },
          },
          text: data.fileContent,
          onSubmitText,
          // topSavHeight: insets.top,
          bottomSavHeight: insets.bottom,
          ...settings,
          // paddingSize: "xxx",
          // horizontal: true,
        }}
      />
    ),
    [data, insets, settings],
  );
  return (
    <FileEditorModal.Provider
      {...{
        value: {
          data,
          handler,
          show,
        },
      }}>
      {children}
      <Modal
        {...{
          visible: editorVisible,
          onRequestClose: editorClose,
          style: [f1, backgroundColor("#ffffff")],
          animationType: "slide",
          //
        }}>
        {editor}
      </Modal>
    </FileEditorModal.Provider>
  );
}
