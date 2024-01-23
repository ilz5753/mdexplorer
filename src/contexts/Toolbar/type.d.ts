import { IToolbarCmp } from "../../components/Toolbar/type";
export type TToolbar = Pick<IToolbarCmp, "colors" | "isRTL"> & {
  name: string;
  path: string;
  shouldNavigate?: boolean;
};
export interface IToolbarCtx {
  updateToolbar(
    options?: Partial<TToolbar>,
    back?: boolean,
    forward?: boolean,
    // nav?: boolean,
  ): void;
  options: TToolbar;
  // path: string;
}
export interface IToolbarProvider {
  // linkPrefix: string;
}
