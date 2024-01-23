import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import { ComponentType, ReactNode } from "react";

export interface IScreen {
  id: string;
  name: string;
  component?: ComponentType;
  options?: object;
  children?: ComponentType;
}
export interface IBaseNavigation {
  screens: IScreen[];
  initialIndex?: number;
}
export interface IStackNavigation extends IBaseNavigation {
  headerShown?: boolean;
}
export interface ITopTabNavigation extends IBaseNavigation {
  tabBar?(props: MaterialTopTabBarProps): ReactNode;
  swipeEnabled?: boolean;
}
