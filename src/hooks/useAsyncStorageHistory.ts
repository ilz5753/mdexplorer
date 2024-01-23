import { useCallback, useState } from "react";
import { keyActions } from "../async-storage";
type SoN = string | number;
export interface IASList<T extends SoN> {
  add(item: T): void;
  update(prevItem: T, newItem: T): void;
  remove(item: T): void;
  load(): Promise<void>;
  save(): Promise<void>;
  data: T[];
  unregisterStorageKey(): Promise<void>;
  removeLast: () => T | undefined;
}
export default function useAsyncStorageHistory<T extends SoN>(
  key: string,
  initial: T[],
): IASList<T> {
  let [data, setData] = useState(initial);
  let ka = keyActions(key);
  let saveInternal = useCallback(async (data: T[]) => {
    try {
      await ka.set(JSON.stringify(data));
    } catch (e: any) {
      throw new Error(`can't write data of key: "${key}" in storage.`);
    }
  }, []);
  let save = useCallback(async () => await saveInternal(data), [data]);
  let add = useCallback(
    (item: T) => {
      let copy = [...data];
      copy.push(item);
      saveInternal(copy).then(() => setData(copy));
    },
    [data],
  );
  let update = useCallback(
    (prevItem: T, newItem: T) => {
      let copy = [...data];
      if (copy.includes(prevItem)) {
        let index = copy.indexOf(prevItem);
        copy[index] = newItem;
        saveInternal(copy).then(() => setData(copy));
      }
    },
    [data],
  );
  let remove = useCallback((item: T) => {
    let copy = [...data];
    if (copy.includes(item)) {
      let index = copy.indexOf(item);
      copy.splice(index, 1);
      saveInternal(copy).then(() => setData(copy));
    }
  }, [data]);
  let load = useCallback(async () => {
    try {
      let d = await ka.get();
      if (d) {
        try {
          let parsed = JSON.parse(d);
          setData(parsed);
        } catch (e: any) {}
      }
    } catch (e: any) {
      throw new Error(`can't read key: "${key}" from storage.`);
    }
  }, []);
  let removeLast = useCallback(() => {
    let copy = [...data];
    let last = copy.pop();
    saveInternal(copy).then(() => setData(copy));
    return last;
  }, [data]);
  return {
    add,
    update,
    remove,
    load,
    save,
    data,
    unregisterStorageKey: ka.remove,
    removeLast,
  };
}
