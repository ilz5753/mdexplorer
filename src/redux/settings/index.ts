import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { merge } from "lodash";
import { useSelector } from "react-redux";
import {
  ISettings,
  ISettingsEditor,
  ISettingsWrapper,
  TSettingsPreview,
} from "./type";
let initialState: ISettings = {
  editorConfig: {
    horizontal: false,
    isRTL: false,
    paddingSize: "x",
    fontSize: 16,
  },
  previewConfig: {
    styles: {},
    colors: {},
  },
};
let settings = createSlice({
  name: "settings",
  initialState,
  reducers: {
    updateEditor(state, { payload }: PayloadAction<ISettingsEditor>) {
      state.editorConfig = merge({}, state.editorConfig, payload);
    },
    updatePreview(state, { payload }: PayloadAction<TSettingsPreview>) {
      state.previewConfig = merge({}, state.previewConfig, payload);
    },
  },
});
let GS = ({ settings }: ISettingsWrapper) => settings;
export let useSettings = () => useSelector(GS);
export let settingsActions = settings.actions;
let SettingsReducer = settings.reducer;
export default SettingsReducer;
