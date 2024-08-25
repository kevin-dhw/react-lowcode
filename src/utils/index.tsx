// 是否为空
export const isEmpty = (val: any) => {
  if (
    !val.length ||
    !Object.keys(val).length ||
    val === undefined ||
    val === null
  ) {
    return true;
  }
  return false;
};
