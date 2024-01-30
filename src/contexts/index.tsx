import { PropsWithChildren } from "react";
import FileEditorModalProvider from "./FileEditorModal";
import FileEditorSettingsModalProvider from "./FileEditorSettingsModal";
import HistoryProvider from "./History";
import RefreshProvider from "./Refresh";

export default function ContextManager({ children }: PropsWithChildren) {
  return (
    <FileEditorSettingsModalProvider>
      <FileEditorModalProvider>
        <HistoryProvider>
          <RefreshProvider>{children}</RefreshProvider>
        </HistoryProvider>
      </FileEditorModalProvider>
    </FileEditorSettingsModalProvider>
  );
}
