import {
  IMDEditorColors,
  IMDEditorInput,
  TMDEditorPadSize,
  TMDEditorPreview,
} from "@ilz5753/rnmd";
export type TFileEditorSettings = {
  colors: IMDEditorColors;
  horizontal?: boolean | undefined;
  paddingSize?: TMDEditorPadSize | undefined;
  isRTL?: boolean | undefined;
  editorConfig?: IMDEditorInput | undefined;
  previewConfig?: TMDEditorPreview | undefined;
};
export interface IFileEditorSettingsModal {
  settings: TFileEditorSettings;
  show(): void;
}
