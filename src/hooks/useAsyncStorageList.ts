import { useCallback, useState } from "react";
import { keyActions } from "../async-storage";
interface IId {
  id: string;
}
export interface IASList<T extends IId> {
  add(item: T): void;
  update(id: string, item: Partial<Omit<T, "id">>): void;
  remove(id: string): void;
  load(): Promise<void>;
  save(): Promise<void>;
  data: T[];
  unregisterStorageKey(): Promise<void>;
  removeLast: () => T | undefined;
  filter: (filterFn: (item: T) => boolean) => void;
}
export default function useAsyncStorageList<T extends IId>(
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
  let add = useCallback(
    (item: T) => {
      let { id } = item;
      let copy = [...data];
      let ids = copy.map(({ id }) => id);
      if (!ids.includes(id)) {
        copy.push(item);
        saveInternal(copy).then(() => setData(copy));
      }
    },
    [data],
  );
  let update = useCallback(
    (id: string, item: Partial<Omit<T, "id">>) => {
      let copy = [...data];
      let ids = copy.map(({ id }) => id);
      if (ids.includes(id)) {
        let index = ids.indexOf(id);
        copy[index] = { ...copy[index], ...item };
        saveInternal(copy).then(() => setData(copy));
      }
    },
    [data],
  );
  let remove = useCallback(
    (id: string) => {
      let copy = [...data];
      let ids = copy.map(({ id }) => id);
      if (ids.includes(id)) {
        let index = ids.indexOf(id);
        copy.splice(index, 1);
        saveInternal(copy).then(() => setData(copy));
      }
    },
    [data],
  );
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
    saveInternal(copy);
    setData(copy);
    return last;
  }, [data]);
  let save = useCallback(async () => await saveInternal(data), [data]);
  let filter = useCallback(
    (filterFn: (item: T) => boolean) => {
      let copy = [...data];
      copy = copy.filter(filterFn);
      saveInternal(copy).then(() => setData(copy));
    },
    [data],
  );
  return {
    add,
    update,
    remove,
    load,
    save,
    data,
    unregisterStorageKey: ka.remove,
    removeLast,
    filter,
  };
}
