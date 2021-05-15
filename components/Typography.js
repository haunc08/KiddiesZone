import React from "react";
import { Text } from "react-native";

import { icons, images, SIZES, COLORS, FONTS } from "../constants";

export const Title = ({ children }) => {
  return <Text style={{ ...FONTS.largeTitle }}>{children}</Text>;
};

export const Heading1 = ({ children }) => {
  return <Text style={{ ...FONTS.h1 }}>{children}</Text>;
};

export const Heading2 = ({ children }) => {
  return <Text style={{ ...FONTS.h2 }}>{children}</Text>;
};

export const Heading3 = ({ children }) => {
  return <Text style={{ ...FONTS.h3 }}>{children}</Text>;
};

export const Body = ({ children }) => {
  return <Text style={{ ...FONTS.body4 }}>{children}</Text>;
};
