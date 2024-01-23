export const CtxErrorMsg = (name: string) =>
  `App is not wrap inside of ${name}.`;
let IdGen = () => {
  let i = 0;
  return () => {
    i += 1;
    return `${i}`;
  };
};
export const NewId = Object.freeze(IdGen());
export const GetNameFromPath = (path = "") => {
  let s = path.split("/");
  let c = s.pop();
  return {
    name: c,
    remain: s.join("/"),
  };
};
export const getRemainingPath = (path: string, title: string) => {
  const index = path.lastIndexOf(title);
  if (index !== -1) {
    return path.slice(0, index).trim();
  }
  return path;
};
