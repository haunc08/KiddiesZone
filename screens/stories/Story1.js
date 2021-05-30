import React, { useEffect, useRef, useState } from "react";
import {
  View,
  PermissionsAndroid,
  Platform,
  Alert,
  ImageBackground,
  StatusBar,
  Text,
} from "react-native";
import { colors, sizes } from "../../constants";
import Orientation from "react-native-orientation-locker";
import {
  Card,
  NoScrollView,
  Row,
  ScreenView,
  Space,
} from "../../components/Wrapper";
import { ImageButton } from "../../components/Button";
import { FullHorizontalList } from "../../components/HorizontalList";

export const Story1 = ({ navigation }) => {
  return (
    <NoScrollView
      style={{ flexDirection: "column-reverse", justifyContent: "flex-start" }}
    >
      <StatusBar hidden />
      <View
        style={{
          position: "absolute",
          width: sizes.width,
          height: sizes.height,
        }}
      >
        <ImageButton
          height={200}
          source={require("../../assets/images/story1/turtle1.png")}
        />
      </View>
      <View
        style={{
          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Space row>
          <ImageButton
            height={45}
            onPress={() => navigation.goBack()}
            source={require("../../assets/icons/home.png")}
          />
          <ImageButton
            height={45}
            onPress={() => navigation.goBack()}
            source={require("../../assets/icons/replay.png")}
          />
          <ImageButton
            height={45}
            onPress={() => navigation.goBack()}
            source={require("../../assets/icons/back.png")}
          />
          <ImageButton
            height={45}
            onPress={() => navigation.goBack()}
            source={require("../../assets/icons/next.png")}
          />
        </Space>
      </View>
    </NoScrollView>
  );
};

export default Story1;
