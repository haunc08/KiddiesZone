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

export const subtractArray = (a1, a2) => {
  if (!a1) return a2;
  if (!a2) return a1;
  var a = [],
    diff = [];

  for (var i = 0; i < a1.length; i++) {
    a[a1[i]] = true;
  }

  for (var i = 0; i < a2.length; i++) {
    if (a[a2[i]]) {
      delete a[a2[i]];
    } else {
      a[a2[i]] = true;
    }
  }

  for (var k in a) {
    diff.push(k);
  }

  return diff;
};
