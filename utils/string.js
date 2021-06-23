import { colors } from "../constants";

export const shortenName = (name) => {
  const start = name.lastIndexOf(" ");
  return name.slice(start + 1);
};

export const calcAge = (birthday) => {
  const today = Date.now();
  const dateRange = (today - birthday) / (1000 * 3600 * 24);
  return Math.floor(dateRange / 365);
};

export const removeDup = (array, key) => {
  let res = [];
  array.map((a) => {
    if (!res.some((r) => r[key] === a[key])) {
      res.push(a);
    }
  });
  return res;
};
