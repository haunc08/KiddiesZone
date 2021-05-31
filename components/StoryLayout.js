import React, { useEffect, useRef, useState } from "react";
import { View, StatusBar, Text, ImageBackground } from "react-native";
import { colors, sizes } from "../constants";
import { NoScrollView, Space, StoryFrame } from "../components/Wrapper";
import { ImageButton } from "../components/Button";

export const StoryLayout = ({ navigation, children, backgroundSource }) => {
  return (
    <NoScrollView
      style={{
        flexDirection: "row-reverse",
        justifyContent: "flex-start",
        padding: 0,
      }}
    >
      <StatusBar hidden />
      <ImageBackground
        style={{
          position: "absolute",
          height: sizes.short,
          width: sizes.long,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "pink",
        }}
        source={backgroundSource}
      >
        {children}
      </ImageBackground>
      <View
        style={{
          alignSelf: "stretch",
          justifyContent: "center",
          backgroundColor: colors.fadeblack,
          padding: sizes.base,
        }}
      >
        <Space row>
          <ImageButton
            height={45}
            onPress={() => navigation.goBack()}
            source={require("../assets/icons/home.png")}
          />
          <ImageButton
            height={45}
            onPress={() => navigation.goBack()}
            source={require("../assets/icons/replay.png")}
          />
          <ImageButton
            height={45}
            onPress={() => navigation.goBack()}
            source={require("../assets/icons/back.png")}
          />
          <ImageButton
            height={45}
            onPress={() => navigation.goBack()}
            source={require("../assets/icons/next.png")}
          />
        </Space>
      </View>
    </NoScrollView>
  );
};

export default StoryLayout;
