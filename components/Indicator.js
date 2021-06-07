import React from "react";
import { Animated, View } from "react-native";
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { sizes } from "../constants";
import { autoSize, IconManager, ImageManager } from "../utils/image";
import { ImageButton } from "./Button";
import { Heading1, Heading2 } from "./Typography";
import { Space } from "./Wrapper";

export const Hearts = ({ lives, points }) => {
  const size = autoSize(IconManager.correct, null, 50);

  return (
    <View
      style={{
        flexDirection: "row",
        padding: sizes.base,
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
        <Heading1 white style={{ marginLeft: sizes.base }}>
          {points}
        </Heading1>
      </Space>
    </View>
  );
};
