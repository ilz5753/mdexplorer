import { IASList } from "../../hooks/useAsyncStorageList";

export interface IHistory {
  id: string;
  name: string;
  path: string;
}
export interface ITabHistory {
  id: string;
  name: string;
  lastPath: string;
  history: IHistory[];
}
export type THistory = IASList<ITabHistory>;
