import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("screen");

export const colors = {
  // base colors
  primary: "#7a81ff",
  darkprimary: "#4c249e",

  // colors
  black: "#1E1F20",
  white: "#FFFFFF",
  purple: "#7a81ff",
  orange: "#ff9724",
  yellow: "#fec700",
  pink: "#ff2452",
  blue: "#0d8bf8",
  green: "#45cc51",
  cyan: "#00cfce",
  red: "#ee4238",
  brown: "#6f4938",

  white80: "rgba(255, 255, 255, 0.8)",
  fadeblack: "rgba(30, 31, 32, 0.25)",
  fadeblack50: "rgba(30, 31, 32, 0.5)",
  black38: "rgba(30, 31, 32, 0.38)",
  smoke: "whitesmoke",
  darkgray: "#898C95",
  transparent: "transparent",
};

export const sizes = {
  // global sizes
  base: 14,
  nav: 56,

  // font sizes
  h1: 30,
  h2: 22,
  h3: 16,
  body: 16,

  // app dimensions
  width,
  height,

  long: width > height ? width : height,
  short: width > height ? height : width,

  fulllandscape: {
    width: width > height ? width : height,
    height: width > height ? height : width,
  },
};

export const fonts = {
  h1: { fontFamily: "Roboto-Black", fontSize: sizes.h1 },
  h2: { fontFamily: "Roboto-Bold", fontSize: sizes.h2 },
  h3: { fontFamily: "Roboto-Bold", fontSize: sizes.h3 },
  body: {
    fontFamily: "Roboto-Regular",
    fontSize: sizes.body,
  },
};

const appTheme = { colors, sizes, fonts };

export default appTheme;
