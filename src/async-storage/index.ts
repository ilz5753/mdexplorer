import AsyncStorage from "@react-native-async-storage/async-storage";

export function keyActions(key: string) {
  let get = async () => await AsyncStorage.getItem(key);
  let set = async (value: string) => await AsyncStorage.setItem(key, value);
  let remove = async () => await AsyncStorage.removeItem(key);
  return {
    get,
    set,
    remove,
  };
}
