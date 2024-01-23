/**
 * don't implement `ToolbarProvider` inside of `src/contexts/index.tsx`
 */
import { useLinkTo } from "@react-navigation/native";
import { isEmpty, merge } from "lodash";
import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { BackHandler } from "react-native";
import ToolbarCmp from "../../components/Toolbar";
import useAsyncStorageHistory from "../../hooks/useAsyncStorageHistory";
import { RouteNames, storageKeys } from "../../utils/constants";
import { CtxErrorMsg, GetNameFromPath } from "../../utils/fn";
import { StartLastPath } from "../History";
import { IToolbarCtx, IToolbarProvider, TToolbar } from "./type";

let Toolbar = createContext<null | IToolbarCtx>(null);
export let useToolbar = () => {
  let ctx = useContext(Toolbar);
  if (ctx === null) throw new Error(CtxErrorMsg(`ToolbarProvider`));
  return ctx;
};
let ibh: string[] = [];
let ifh: string[] = [];
export default function ToolbarProvider({
  children,
}: PropsWithChildren<IToolbarProvider>) {
  let linkTo = useLinkTo();
  let [options, setOptions] = useState<TToolbar>({
    path: StartLastPath,
    name: RouteNames.main,
  });
  let { shouldNavigate, path, ...rest } = options;
  let backHistory = useAsyncStorageHistory(storageKeys.backHistory, ibh);
  let forwardHistory = useAsyncStorageHistory(storageKeys.backHistory, ifh);
  let {
    data: backData,
    add: backAdd,
    removeLast: backRemove,
    load: backLoad,
  } = backHistory;
  let {
    data: forwardData,
    add: forwardAdd,
    removeLast: forwardRemove,
    load: forwardLoad,
  } = forwardHistory;
  let updateToolbar = useCallback(
    (o: Partial<TToolbar> = {}, back = false, forward = false) => {
      let no = merge({}, options, o);
      let prevPath = options.path;
      // console.log({ o, back, forward, no, prevPath });
      setOptions(no);
      if (back) backAdd(prevPath);
      if (forward) forwardAdd(prevPath);
    },
    [backAdd, options, forwardAdd],
  );
  let go = useCallback(
    (back: boolean) => {
      let path = (back ? backRemove : forwardRemove)();
      if (path) {
        let { name } = GetNameFromPath(path);
        updateToolbar({ path, name, shouldNavigate: true }, !back, back);
      }
    },
    [backRemove, forwardRemove, updateToolbar],
  );
  useEffect(() => {
    backLoad();
    forwardLoad();
  }, []);
  useEffect(() => {
    let hb = BackHandler.addEventListener("hardwareBackPress", () => {
      go(true);
      return true;
    });
    return () => {
      hb.remove();
    };
  }, [go]);
  useEffect(() => {
    if (shouldNavigate) {
      linkTo(path);
      setOptions(o => ({ ...o, shouldNavigate: false }));
    }
  }, [shouldNavigate, path]);
  return (
    <Toolbar.Provider
      {...{
        value: {
          updateToolbar,
          options,
          // path,
        },
      }}>
      <ToolbarCmp
        {...{
          title: options.name,
          go,
          backDisabled: isEmpty(backData),
          forwardDisabled: isEmpty(forwardData),
          ...rest,
        }}
      />
      {children}
    </Toolbar.Provider>
  );
}
