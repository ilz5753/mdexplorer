import { PropsWithChildren, createContext, useContext, useEffect } from "react";
import useAsyncStorageList from "../../hooks/useAsyncStorageList";
import { RouteNames, storageKeys } from "../../utils/constants";
import { CtxErrorMsg, NewId } from "../../utils/fn";
import { ITabHistory, THistory } from "./type";

let History = createContext<null | THistory>(null);

export let useHistory = () => {
  let ctx = useContext(History);
  if (ctx === null) throw new Error(CtxErrorMsg(`HistoryProvider`));
  return ctx;
};
let id = NewId();
export let StartLastPath = `/Explorer/${RouteNames.first}/${RouteNames.main}`;
let th: ITabHistory[] = [
  {
    id: RouteNames.first,
    name: RouteNames.first,
    lastPath: StartLastPath,
    history: [
      {
        id,
        name: RouteNames.main,
        path: StartLastPath,
      },
    ],
  },
];
export default function HistoryProvider({ children }: PropsWithChildren) {
  let value = useAsyncStorageList(storageKeys.slugs, th);
  let { load } = value;
  useEffect(() => {
    load();
  }, []);
  return <History.Provider {...{ value, children }} />;
}
