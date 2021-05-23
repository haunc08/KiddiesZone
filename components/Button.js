import React from "react";
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";

import { icons, images, sizes, colors, fonts } from "../constants";
import { Heading3 } from "./Typography";

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

export const ImageButton = ({
  style,
  source,
  onPress,
  disable,
  small,
  title,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ alignItems: "center" }}>
      <Image
        style={{
          width: small ? 45 : 60,
          height: small ? 45 : 60,
          ...style,
          opacity: disable ? 0.25 : 1,
        }}
        source={source}
      />
      {title ? <Heading3>{title}</Heading3> : null}
    </TouchableOpacity>
  );
};
