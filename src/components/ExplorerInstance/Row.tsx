import {
  ReScrollView,
  ReText,
  ReView,
  ScaleButton,
  center,
  color,
  f1,
  fw,
  gap,
  getStyle,
  padding,
} from "@ilz5753/rnutils";
import { useLinkTo } from "@react-navigation/native";
import { isEmpty } from "lodash";
import { useCallback, useEffect, useMemo, useReducer } from "react";
import { SheetManager } from "react-native-actions-sheet";
import { useDispatch } from "react-redux";
import { useFileEditorModal } from "../../contexts/FileEditorModal";
import { IFileEditorModalData } from "../../contexts/FileEditorModal/type";
import { useHistory } from "../../contexts/History";
import { useToolbar } from "../../contexts/Toolbar";
import useAsyncStorageList from "../../hooks/useAsyncStorageList";
import { SheetKeys } from "../../utils/constants";
import { GetNameFromPath, NewId } from "../../utils/fn";
import RowFolderOrFile from "../FolderOrFile/Row";
import { IFolderOrFileData } from "../FolderOrFile/type";
import Wrapper from "../Wrapper";
import SvgIcons from "../svg";
import { IExplorerInstance } from "./type";
let fofs: IFolderOrFileData[] = [];
export default function RowExplorerInstance({
  path,
  isRTL = false,
}: IExplorerInstance) {
  let { handler, show } = useFileEditorModal();
  let dispatch = useDispatch();
  let linkTo = useLinkTo();
  let history = useHistory();
  let { updateToolbar } = useToolbar();
  let [selectMode, toggleSelect] = useReducer(s => !s, false);
  let { data, add, update, remove, filter, load } = useAsyncStorageList(
    path,
    fofs,
  );
  useEffect(() => {
    load();
  }, []);
  let createNewFof = useCallback(async () => {
    let id = NewId();
    let { remain } = GetNameFromPath(path);
    let { name: slug } = GetNameFromPath(remain);
    let hNames = history.data.map(({ name }) => name);
    let hIds = history.data.map(({ id }) => id);
    try {
      if (slug) {
        let index = hNames.indexOf(slug);
        let { history: ih } = history.data[index];
        let sId = hIds[index];
        let ihi = ih.map(({ id }) => id);
        let ihn = ih.map(({ name }) => name);
        // console.log({ slug, index, ih, ihi, id });
        // console.log({ ih, fofId: id });
        let {
          path: _path,
          name,
          isFile,
        } = (await SheetManager.show(SheetKeys.NoUFoF, {
          payload: {
            remain,
            historyNames: ihn,
            tabHistoryNames: hNames,
          },
        })) as any;
        add({
          id,
          name,
          path: _path,
          isFile,
        });
        if (!ihi.includes(id)) {
          let nh = [...ih, { id, name, path: _path }];
          // console.log({ nh, slug, sId });
          // console.log();
          history.update(sId, {
            history: nh,
          });
        }
      }
    } catch (e: any) {}
  }, [path, add, history]);
  let fd = useMemo(() => getStyle([`fd${isRTL ? "rr" : "r"}`]), [isRTL]);
  let removeAll = useCallback(() => {
    filter(({ selected = false }) => !selected);
    toggleSelect();
  }, [filter]);
  return (
    <Wrapper>
      {isEmpty(data) ? (
        <ReView {...{ style: [f1, center] }}>
          <SvgIcons.EmptyFile120 />
          <ScaleButton {...{ activeOpacity: 0.72, onPress: createNewFof }}>
            <ReText {...{ style: [color("#4100ff")] }}>Add First Item</ReText>
          </ScaleButton>
        </ReView>
      ) : (
        <ReScrollView>
          <ReView
            {...{
              style: [fw, fd, getStyle(["aic", "jcsb"]), padding("", 8)],
            }}>
            {/* <ReView></ReView> */}
            <ScaleButton {...{ onPress: toggleSelect }}>
              <SvgIcons.Check24 {...{ color: "#4100ff" }} />
            </ScaleButton>
            <ReView>
              {selectMode ? (
                <ScaleButton {...{ onPress: removeAll }}>
                  <SvgIcons.RecycleBin24 {...{ color: "#4100ff" }} />
                </ScaleButton>
              ) : (
                <ScaleButton {...{ onPress: createNewFof }}>
                  <SvgIcons.Plus24 {...{ color: "#4100ff" }} />
                </ScaleButton>
              )}
            </ReView>
          </ReView>
          <ReView {...{ style: [gap(8)] }}>
            {data.map(fof => (
              <RowFolderOrFile
                {...{
                  key: fof.id,
                  ...fof,
                  selectMode,
                  toggleSelect() {
                    update(fof.id, { selected: !fof.selected });
                  },
                  toggleFavorite() {
                    update(fof.id, { isFavorite: !fof.isFavorite });
                  },
                  rounded: true,
                  // disabled: true,
                  // size: 24,
                  onLongPress() {
                    if (!selectMode) toggleSelect();
                    update(fof.id, { selected: !fof.selected });
                  },
                  // isRTL: true,
                  handleDelete() {
                    remove(fof.id);
                  },
                  async handleEdit() {
                    let { remain } = GetNameFromPath(fof.path);
                    let { name: slug } = GetNameFromPath(remain);
                    let hNames = history.data.map(({ name }) => name);
                    // console.log(fof);
                    // console.log({ remain, slug, hNames });
                    try {
                      if (slug) {
                        let index = hNames.indexOf(slug);
                        let { history: ih } = history.data[index];
                        let ihi = ih.map(({ id }) => id);
                        // console.log({ ihi, fofId: fof.id });
                        if (ihi.includes(fof.id)) {
                          let nih = ih
                            .filter(({ id }) => id !== fof.id)
                            .map(({ name }) => name);
                          // console.log({ nih });
                          let { path: _path, name } = (await SheetManager.show(
                            SheetKeys.NoUFoF,
                            {
                              payload: {
                                name: fof.name,
                                remain,
                                IsFile: fof.isFile,
                                historyNames: nih,
                                tabHistoryNames: hNames,
                              },
                            },
                          )) as any;
                          update(fof.id, {
                            path: _path,
                            name,
                          });
                          let nhc = [...ih];
                          let i = ihi.indexOf(fof.id);
                          nhc[i] = { ...nhc[i], name, path: _path };
                          history.update(slug, {
                            history: nhc,
                          });
                        }
                      }
                    } catch (e: any) {
                      // console.log(e);
                    }
                  },
                  onPress() {
                    let { name, path, fileContent = "", isFile, id } = fof;
                    if (isFile) {
                      let s = Date.now();
                      let setData = (
                        newData: Partial<IFileEditorModalData> = {
                          fileContent: "",
                        },
                      ) => {
                        let { fileContent } = newData;
                        update(id, { fileContent });
                      };
                      show({ name, path, fileContent }, setData);
                      let e = Date.now();
                      console.log({ s, e, d: e - s });
                      // handler(setData);
                    } else {
                      let { remain } = GetNameFromPath(path);
                      let { name: slug } = GetNameFromPath(remain);
                      // let _path = `${remain}/${name}`;
                      updateToolbar(
                        { path, shouldNavigate: true, name },
                        true,
                        false,
                      );
                      if (slug)
                        history.update(slug, {
                          lastPath: path,
                        });
                    }
                  },
                }}
              />
            ))}
          </ReView>
        </ReScrollView>
      )}
    </Wrapper>
  );
}
