import React from "react";
import { Text } from "react-native";

import { icons, images, sizes, colors, fonts } from "../constants";

export const Heading1 = ({ children, style }) => {
  return <Text style={{ ...fonts.h1, ...style }}>{children}</Text>;
};

export const Heading2 = ({ children, style }) => {
  return <Text style={{ ...fonts.h2, ...style }}>{children}</Text>;
};

export const Heading3 = ({ children, style }) => {
  return <Text style={{ ...fonts.h3, ...style }}>{children}</Text>;
};

export const Body = ({ children, style }) => {
  return <Text style={{ ...fonts.body, ...style }}>{children}</Text>;
};
