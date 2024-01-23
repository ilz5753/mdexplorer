export interface IFileEditorModalData {
  name: string;
  path: string;
  fileContent: string;
}
export type TSetData = (newData?: Partial<IFileEditorModalData>) => void;
export interface IFileEditorModal {
  data: IFileEditorModalData;
  handler(setData: (newData?: Partial<IFileEditorModalData>) => void): void;
  show(fileData: IFileEditorModalData, setData?: TSetData): void;
}
