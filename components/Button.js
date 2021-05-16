import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

import { icons, images, sizes, colors, fonts } from "../constants";

export const Button = ({ children, type, onPress, style }) => {
  var matchType;
  switch (type) {
    default:
      matchType = {
        back: colors.primary,
        fore: colors.white,
      };
      break;
    case "secondary":
      matchType = {
        back: colors.smoke,
        fore: colors.black,
      };
      break;
    case "outlined":
      matchType = {
        back: colors.transparent,
        fore: colors.primary,
        outline: colors.primary,
      };
      break;
  }

  return (
    <TouchableOpacity
      style={{
        padding: sizes.base - 2,
        backgroundColor: matchType.back,
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
          color: matchType.fore,
          ...fonts.h3,
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};
