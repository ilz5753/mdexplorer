import { PropsWithChildren } from "react";
import FileEditorModalProvider from "./FileEditorModal";
import HistoryProvider from "./History";
import RefreshProvider from "./Refresh";

export default function ContextManager({ children }: PropsWithChildren) {
  return (
    <FileEditorModalProvider>
      <HistoryProvider>
        <RefreshProvider>{children}</RefreshProvider>
      </HistoryProvider>
    </FileEditorModalProvider>
  );
}
