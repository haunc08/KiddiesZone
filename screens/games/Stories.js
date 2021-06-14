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

export const Stories = ({ navigation }) => {
  const stories = [
    {
      key: "Story",
      name: "Thỏ và rùa",
    },
    {
      key: "Story2",
      name: "Ba chiếc rìu",
    },
    {
      key: "Story3",
      name: "Truyện 3",
    },
  ];
  const goHome = () => {
    navigation.goBack();
  };
  const handleChooseStory = (screenRoute) => {
    navigation.navigate(screenRoute);
  };

  return (
    <NoScrollView style={{ padding: 0, flexDirection: "row" }}>
      <StatusBar hidden />
      <FullHorizontalList
        data={stories}
        width={550}
        onPress={handleChooseStory}
      >
        <ImageButton
          containerStyle={{ alignSelf: "center", marginRight: sizes.base * 2 }}
          onPress={() => goHome()}
          source={require("../../assets/icons/back.png")}
        />
      </FullHorizontalList>
    </NoScrollView>
  );
};
