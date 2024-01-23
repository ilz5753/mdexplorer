import { NavigationContext } from "@react-navigation/native";
import { useContext } from "react";
import { CtxErrorMsg } from "../utils/fn";

export default function useNavigationCtx() {
  let ctx = useContext(NavigationContext);
  if (!ctx) throw new Error(CtxErrorMsg(`NavigationContainer`));
  return ctx;
}
