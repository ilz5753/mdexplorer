import Wrapper from "../../components/Wrapper";
import ToolbarProvider from "../../contexts/Toolbar";
import ExplorerTabBar from "./TabBar";
let linkPrefix = "/Explorer";
export default function Explorer() {
  // let nav = useNavigationCtx();
  // console.log(nav.getState().routes);
  // return <RowExplorerInstance {...{ slug: storageKeys.folders }} />;
  return (
    <Wrapper sab sat>
      <ToolbarProvider {...{ linkPrefix }}>
        <ExplorerTabBar {...{ linkPrefix }} />
      </ToolbarProvider>
    </Wrapper>
  );
}
