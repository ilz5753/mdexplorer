export interface ICheckBoxColors {
  selectedBg?: string;
  defaultBg?: string;
  selectedBorder?: string;
  defaultBorder?: string;
  check?: string;
}
export interface ICheckBoxBtn {
  onPress?(): void;
  disabled?: boolean;
  duration?: number;
  rounded?: boolean;
  size?: 18 | 24 | 30 | 32 | 48;
}
export interface ICheckBox extends ICheckBoxBtn {
  colors?: ICheckBoxColors;
  isSelected?: boolean;
  isRTL?: boolean;
}
