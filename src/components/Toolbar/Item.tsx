import { ReView, gap, getStyle } from "@ilz5753/rnutils";
import { IToolbarCmpItem } from "./type";

export default function ToolbarCmpItem({ icon, detail }: IToolbarCmpItem) {
  return (
    <ReView {...{ style: [gap(6), getStyle(["aic"])] }}>
      {icon}
      {detail}
    </ReView>
  );
}
