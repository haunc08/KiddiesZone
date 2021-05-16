import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const colors = {
  // base colors
  primary: "#6232c5",

  // colors
  black: "#1E1F20",
  white: "#FFFFFF",
  purple: "#6232c5",
  orange: "#ff9724",
  yellow: "#fec700",
  pink: "#ff2452",
  blue: "#0d8bf8",
  green: "#45cc51",
  cyan: "#00cfce",
  red: "#ee4238",

  smoke: "whitesmoke",
  darkgray: "#898C95",
  transparent: "transparent",
};

export const sizes = {
  // global sizes
  base: 14,

  // font sizes
  h1: 30,
  h2: 22,
  h3: 16,
  body: 16,

  // app dimensions
  width,
  height,
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
