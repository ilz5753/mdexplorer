import { ReactNode } from "react";

export interface IToolbarCmpColors {
  /**
   * `back` | `forward` color
   */
  navigate?: string;
  navigateText?: string;
  title?: string;
  clearCacheBin?: string;
}
export interface IToolbarCmp {
  isRTL?: boolean;
  go?(back: boolean): void;
  backDisabled?: boolean;
  forwardDisabled?: boolean;
  title: string;
  hasStatusbar?: boolean;
  colors?: IToolbarCmpColors;
  //   Icon?: ComponentType; // next releases...
  // view menu, actions menu, search action, ...
}

export interface IToolbarCmpItem {
  icon: ReactNode;
  detail: ReactNode;
}
