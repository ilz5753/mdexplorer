import {
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
import { useMemo } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";
import CheckBox from "../CheckBox";
import SvgIcons from "../svg";
import { IFolder } from "./type";
import { isUndefined } from "lodash";

export default function Folder({
  id,
  name,
  path,
  isFavorite,
  onPress,
  disabled,
  isSelected,
  colors = {},
  selectMode,
  duration = 300,
  rounded,
  toggleFavorite,
  toggleSelect,
  size,
  onRemovePress,
}: IFolder) {
  let {
    selectedBg = "#f3f3f3",
    defaultBg = "#ffffff",
    selectedHeart = "#ff0000",
    defaultHeart = "#747474",
    title = "#000000",
    subtitle = "#9c9c9c",
    checkBox,
    recycleBin = "#747474",
  } = colors;
  let Heart = useMemo(
    () => SvgIcons[`Heart24${isFavorite ? "Fill" : "Empty"}`],
    [isFavorite],
  );
  return (
    <TouchableOpacity
      {...{
        style: [
          fw,
          getStyle(["fdr", "aic", "jcsb"]),
          backgroundColor(isSelected ? selectedBg : defaultBg),
          padding("v", 4),
          padding("h", 8),
          borderRadius("", 8),
          disabled && styles.disabled,
          gap(8),
        ],
        activeOpacity: 0.72,
        onPress: selectMode ? toggleSelect : onPress,
        disabled,
      }}>
      <Animated.View
        {...{
          style: [getStyle(["fdr", "aic"]), selectMode && gap(8), f1],
          layout: LinearTransition.duration(duration),
        }}>
        {selectMode && (
          <CheckBox
            {...{
              disabled: true,
              isSelected,
              colors: checkBox,
              size,
              duration,
              rounded,
            }}
          />
        )}
        <Animated.View
          {...{
            style: [!isUndefined(path) && gap(4), f1],
            layout: LinearTransition.duration(duration),
          }}>
          <Animated.Text
            {...{
              style: [color(title), fontSize(16), getStyle(["fw7"])],
              numberOfLines: 1,
              layout: LinearTransition.duration(duration),
            }}>
            {name}
          </Animated.Text>
          {path && (
            <Animated.Text
              {...{
                style: [color(subtitle), fontSize(16), getStyle(["fw4"])],
                numberOfLines: 1,
                ellipsizeMode: "middle",
                layout: LinearTransition.duration(duration),
              }}>
              {path}
            </Animated.Text>
          )}
        </Animated.View>
      </Animated.View>
      <Animated.View
        {...{
          style: [getStyle(["fdr", "aic"]), gap(8)],
          layout: LinearTransition.duration(duration),
        }}>
        <TouchableOpacity
          {...{
            activeOpacity: 0.72,
            onPress: toggleFavorite,
            disabled: disabled || selectMode,
          }}>
          <Animated.View
            {...{
              style: [selectMode && styles.disabled],
              layout: LinearTransition.duration(duration),
            }}>
            <Heart {...{ color: isFavorite ? selectedHeart : defaultHeart }} />
          </Animated.View>
        </TouchableOpacity>
        <TouchableOpacity
          {...{
            activeOpacity: 0.72,
            onPress: onRemovePress,
            disabled: disabled || selectMode,
          }}>
          <Animated.View
            {...{
              style: [selectMode && styles.disabled],
              layout: LinearTransition.duration(duration),
            }}>
            <SvgIcons.RecycleBin24 {...{ color: recycleBin }} />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  disabled: {
    opacity: 0.5,
  },
});
