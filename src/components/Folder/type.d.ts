import { ICheckBoxBtn, ICheckBoxColors } from "../CheckBox/type";

export interface IFolderData {
  id: string;
  name: string;
  path?: string;
  isFavorite?: boolean;
  isSelected?: boolean;
}
export interface IFolderColors {
  selectedBg?: string;
  defaultBg?: string;
  checkBox?: ICheckBoxColors;
  title?: string;
  subtitle?: string;
  selectedHeart?: string;
  defaultHeart?: string;
  recycleBin?: string;
}
export interface IFolder extends IFolderData, ICheckBoxBtn {
  colors?: IFolderColors;
  selectMode?: boolean;
  toggleFavorite?(): void;
  toggleSelect?(): void;
  onRemovePress?(): void;
}
