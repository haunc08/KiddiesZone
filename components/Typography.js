import React from "react";
import { Text } from "react-native";

import { icons, images, sizes, colors, fonts } from "../constants";

export const Heading1 = ({ children, style, white, color }) => {
  return (
    <Text
      style={{
        ...fonts.h1,
        color: white ? colors.white : color ? color : colors.black,
        ...style,
      }}
    >
      {children}
    </Text>
  );
};

export const Heading2 = ({ children, style, white, color }) => {
  return (
    <Text
      style={{
        ...fonts.h2,
        color: white ? colors.white : color ? color : colors.black,
        ...style,
      }}
    >
      {children}
    </Text>
  );
};

export const Heading3 = ({ children, style, white }) => {
  return (
    <Text
      style={{
        ...fonts.h3,
        color: white ? colors.white : colors.black,
        ...style,
      }}
    >
      {children}
    </Text>
  );
};

export const Body = ({ children, style, white, center, color }) => {
  return (
    <Text
      style={{
        ...fonts.body,
        color: white ? colors.white : color ? color : colors.black,
        textAlign: center ? "center" : "auto",
        ...style,
      }}
    >
      {children}
    </Text>
  );
};
