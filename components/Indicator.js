import React from "react";
import { Animated, View } from "react-native";
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { colors } from "react-native-elements";
import { sizes } from "../constants";
import { autoSize, IconManager, ImageManager } from "../utils/image";
import { ImageButton } from "./Button";
import { Heading1, Heading2 } from "./Typography";
import { Space } from "./Wrapper";

export const Hearts = ({ lives, points, reverse, pointColor, noPadding }) => {
  const size = autoSize(IconManager.correct, null, 50);

  return (
    <View
      style={{
        flexDirection: reverse ? "row-reverse" : "row",
        padding: noPadding ? 0 : sizes.base,
        zIndex: 32,
      }}
    >
      <Space tight center>
        <Image
          style={{
            ...size,
            resizeMode: "contain",
          }}
          source={lives > 0 ? IconManager.heart : IconManager.heartempty}
        />
        <Image
          style={{
            ...size,
            resizeMode: "contain",
          }}
          source={lives > 1 ? IconManager.heart : IconManager.heartempty}
        />
        <Image
          style={{
            ...size,
            resizeMode: "contain",
          }}
          source={lives > 2 ? IconManager.heart : IconManager.heartempty}
        />
        <Heading1
          color={pointColor || colors.white}
          style={{ marginHorizontal: sizes.base }}
        >
          {points}
        </Heading1>
      </Space>
    </View>
  );
};
