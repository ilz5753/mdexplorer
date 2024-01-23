export interface IFolderOrFileColors {
  selectedBg?: string;
  defaultBg?: string;
  checkBox?: ICheckBoxColors;
  title?: string;
  subtitle?: string;
  selectedHeart?: string;
  defaultHeart?: string;
  recycleBin?: string;
  file?: string;
  folder?: string;
  editPen?: string;
}
export type TFolderOrFileKind =
  | "Folder"
  | "md"
  | "js"
  | "ts"
  | "tsx"
  | "jsx"
  | "pdf"
  | "...";
export interface IFolderOrFileData {
  id: string;
  name: string;
  path: string;
  isFile?: boolean;
  isFavorite?: boolean;
  selected?: boolean;
  kind?: TFolderOrFileKind;
  createdAt?: number;
  updatedAt?: number;
  lastOpenedAt?: number;
  isOpen?: boolean;
  fileContent?: string;
}

export interface IFolderOrFile extends IFolderOrFileData {
  selectMode?: boolean;
  toggleSelect?(): void;
  selectDisabled?: boolean;

  onPress?(): void;
  onLongPress?(): void;
  disabled?: boolean;

  colors?: IFolderOrFileColors;

  toggleFavorite?(): void;

  handleDelete?(): void;
  handleEdit?(): void | Promise<void>;

  duration?: number;

  isRTL?: boolean;
}
