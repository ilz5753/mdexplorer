import StackNavigation from "../navigation/stack";
import { IScreen } from "../navigation/type";
import Explorer from "./Explorer";
import Fake from "./Fake";
import Welcome from "./Welcome";

const screens: IScreen[] = [
  {
    id: "Welcome",
    name: "Welcome",
    component: Welcome,
  },
  {
    id: "Explorer",
    name: "Explorer",
    component: Explorer,
  },
  {
    id: "Fake",
    name: "Fake",
    component: Fake,
  },
];
export default function Screens() {
  return (
    <StackNavigation
      {...{
        screens,
        // initialIndex: 1,
      }}
    />
  );
}
