import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { icons, images, sizes, colors, fonts } from "../constants";

export const Button = ({ children, type, onPress, style, small }) => {
  var matchType;
  switch (type) {
    default:
      matchType = {
        background: colors.primary,
        foreground: colors.white,
      };
      break;
    case "secondary":
      matchType = {
        background: colors.smoke,
        foreground: colors.black,
      };
      break;
    case "outlined":
      matchType = {
        background: colors.transparent,
        fore: colors.primary,
        outline: colors.primary,
      };
      break;
  }

  return (
    <TouchableOpacity
      style={{
        padding: sizes.base - 2,
        paddingVertical: small ? sizes.base - 8 : sizes.base - 2,
        backgroundColor: matchType.background,
        alignItems: "center",
        borderRadius: 999,
        borderWidth: matchType.outline && 2,
        borderColor: matchType.outline,
        ...style,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          color: matchType.foreground,
          ...fonts.h3,
          fontSize: 14,
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};
