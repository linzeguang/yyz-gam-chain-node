export const substring = (
  value: string,
  start: number = 4,
  end: number = 4
) => {
  if (value === "--") return value;
  if (value) {
    let subStr1 = value.substring(0, start);
    let subStr2 = value.substring(value.length - end, value.length);
    return `${subStr1}...${subStr2}`;
  }
  return "--";
};
