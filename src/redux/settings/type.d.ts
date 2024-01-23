import {
  TMDEditorPadSize,
  IMDEditorColors,
  TMDEditorPreview,
} from "@ilz5753/rnmd";
export type TSettingsPreview = TMDEditorPreview;
export interface ISettingsEditor {
  horizontal?: boolean;
  isRTL?: boolean;
  paddingSize?: TMDEditorPadSize;
  fontSize?: number;
  colors?: IMDEditorColors;
}
export interface ISettings {
  editorConfig: ISettingsEditor;
  previewConfig: TSettingsPreview;
}
export interface ISettingsWrapper {
  settings: ISettings;
}
