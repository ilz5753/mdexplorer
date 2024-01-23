import {
  HexToRgba,
  ReText,
  ReView,
  ScaleButton,
  backgroundColor,
  borderRadius,
  color,
  f1,
  fontSize,
  fw,
  gap,
  getStyle,
  padding,
} from "@ilz5753/rnutils";
import { StyleSheet } from "react-native";
import { IFolderOrFile } from "./type";
import { LinearTransition } from "react-native-reanimated";
import CheckBox from "../CheckBox";
import { useMemo } from "react";
import SvgIcons from "../svg";

export default function RowFolderOrFile({
  selectMode = false,
  selected = false,
  toggleSelect,
  selectDisabled = false,
  onPress,
  onLongPress,
  disabled = false,
  colors = {},
  toggleFavorite,
  handleDelete,
  handleEdit,

  name,
  path,
  isFile = false,
  isFavorite = false,
  isOpen = false,
  kind = "md",
  createdAt,
  updatedAt,
  lastOpenedAt,
  duration = 300,
  isRTL = false,
}: IFolderOrFile) {
  let {
    selectedBg = HexToRgba("#077bff", 0.15),
    defaultBg = "#f3f3f3",
    selectedHeart = "#ff0000",
    defaultHeart = "#747474",
    editPen = "#747474",
    title = "#000000",
    checkBox,
    recycleBin = "#747474",
    file = "#cab614",
    folder = "#077bff",
  } = colors;
  /**
   * folder or file icon
   */
  let FoFIc = useMemo(
    () =>
      isFile
        ? SvgIcons.Markdown24
        : isOpen
        ? SvgIcons.Folder24Open
        : SvgIcons.Folder24Close,
    [isFile, isOpen],
  );
  let Heart = useMemo(
    () => SvgIcons[`Heart24${isFavorite ? "Fill" : "Empty"}`],
    [isFavorite],
  );
  let fd = useMemo(() => getStyle([`fd${isRTL ? "rr" : "r"}`]), [isRTL]);
  let ta = useMemo(() => getStyle([`ta${isRTL ? "r" : "l"}`]), [isRTL]);
  let btnsDisabled = useMemo(
    () => disabled || selectMode,
    [disabled, selectMode],
  );
  return (
    <ScaleButton
      {...{
        style: [
          fw,
          fd,
          getStyle(["aic", "jcsb"]),
          backgroundColor(selected ? selectedBg : defaultBg),
          padding("v", 8),
          padding("h", 12),
          borderRadius("", 8),
          disabled && styles.disabled,
          gap(8),
        ],
        onPress: selectMode ? toggleSelect : onPress,
        onLongPress: selectMode ? toggleSelect : onLongPress,
        layout: LinearTransition.duration(duration),
      }}>
      <ReView
        {...{
          style: [fd, getStyle(["aic"]), gap(8), f1],
          layout: LinearTransition.duration(duration),
        }}>
        {selectMode && (
          <CheckBox
            {...{
              disabled: true,
              isSelected: selected,
              colors: checkBox,
              size: 18,
              duration,
              rounded: true,
              isRTL,
            }}
          />
        )}
        <ReView {...{ layout: LinearTransition.duration(duration) }}>
          <FoFIc {...{ color: isFile ? file : folder }} />
        </ReView>
        <ReView
          {...{
            style: [f1],
            layout: LinearTransition.duration(duration),
          }}>
          <ReText
            {...{
              style: [color(title), fontSize(15), getStyle(["fw7"]), ta],
              numberOfLines: 1,
              ellipsizeMode: "middle",
              layout: LinearTransition.duration(duration),
            }}>
            {name}
          </ReText>
        </ReView>
      </ReView>
      <ReView
        {...{
          style: [fd, getStyle(["aic"]), gap(8)],
          layout: LinearTransition.duration(duration),
        }}>
        <ScaleButton
          {...{
            onPress: handleEdit,
            disabled: btnsDisabled,
          }}>
          <ReView
            {...{
              style: [selectMode && styles.disabled],
              layout: LinearTransition.duration(duration),
            }}>
            <SvgIcons.Edit24 {...{ color: editPen }} />
          </ReView>
        </ScaleButton>
        <ScaleButton
          {...{
            onPress: toggleFavorite,
            disabled: btnsDisabled,
          }}>
          <ReView
            {...{
              style: [selectMode && styles.disabled],
              layout: LinearTransition.duration(duration),
            }}>
            <Heart {...{ color: isFavorite ? selectedHeart : defaultHeart }} />
          </ReView>
        </ScaleButton>
        <ScaleButton
          {...{
            onPress: handleDelete,
            disabled: btnsDisabled,
          }}>
          <ReView
            {...{
              style: [selectMode && styles.disabled],
              layout: LinearTransition.duration(duration),
            }}>
            <SvgIcons.RecycleBin24 {...{ color: recycleBin }} />
          </ReView>
        </ScaleButton>
      </ReView>
    </ScaleButton>
  );
}
const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
});
