import { useMemo } from "react";
import TopTabBar from "../../../components/tabBar/top";
import { useHistory } from "../../../contexts/History";
import TopTabNavigation from "../../../navigation/top-tab";
import { IScreen } from "../../../navigation/type";
import HistoryStack from "./HistoryStack";
interface IExplorerTabBar {
  linkPrefix: string;
}
export default function ExplorerTabBar({ linkPrefix }: IExplorerTabBar) {
  let { data } = useHistory();
  let screens: IScreen[] = useMemo(
    () =>
      data.map(({ id, name, history }) => ({
        id,
        name,
        children: () => <HistoryStack {...{ history }} />,
      })),
    [data],
  );
  return (
    <TopTabNavigation
      {...{
        screens,
        tabBar: TopTabBar({ linkPrefix }),
      }}
    />
  );
}
