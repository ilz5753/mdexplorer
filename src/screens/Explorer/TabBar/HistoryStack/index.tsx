import { useMemo } from "react";
import { IHistory } from "../../../../contexts/History/type";
import StackNavigation from "../../../../navigation/stack";
import History from "./History";
import useNavigationCtx from "../../../../hooks/useNavigationCtx";
import { IScreen } from "../../../../navigation/type";
export interface IHistoryStack {
  history: IHistory[];
}
export default function HistoryStack({ history }: IHistoryStack) {
  let screens: IScreen[] = useMemo(
    () =>
      history.map(({ id, name, path }) => ({
        id,
        name,
        // component: History(path),
        children: () => <History {...{ path }} />,
      })),
    [history],
  );
  // let { getState } = useNavigationCtx();
  // let s = getState();
  // console.log(s);
  return (
    <StackNavigation
      {...{
        screens,
        // headerShown: true,
      }}
    />
  );
}
