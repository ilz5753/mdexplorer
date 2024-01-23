import RowExplorerInstance from "../../../../components/ExplorerInstance/Row";
import useNavigationCtx from "../../../../hooks/useNavigationCtx";
export interface I_History {
  path: string;
}
export default function History({ path }: I_History) {
  // let { getState } = useNavigationCtx();
  // let s = getState();
  // console.log(s);
  return <RowExplorerInstance {...{ path }} />;
}
