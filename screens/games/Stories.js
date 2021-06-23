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
import { IconManager, ImageManager } from "../../utils/image";
import { playSoundFile } from "../../utils/sound";

export const Stories = ({ navigation }) => {
  const stories = [
    {
      key: "Story",
      name: "Thỏ và rùa",
      image: ImageManager.stories.turtlerabbit,
    },
    {
      key: "Story2",
      name: "Ba chiếc rìu",
      image: ImageManager.stories.riu,
    },
  ];
  const goHome = () => {
    navigation.goBack();
  };
  const handleChooseStory = (screenRoute) => {
    navigation.navigate(screenRoute);
  };

  useEffect(() => {
    playSoundFile("stories");
  }, []);

  return (
    <NoScrollView
      style={{ padding: 0, flexDirection: "row" }}
      imgSource={ImageManager.kidszonebg}
    >
      <StatusBar hidden />
      <FullHorizontalList
        data={stories}
        width={370}
        onPress={handleChooseStory}
        spaceScale={1}
      >
        <ImageButton
          containerStyle={{ alignSelf: "center", marginRight: sizes.base * 2 }}
          onPress={() => goHome()}
          source={IconManager.buttons.orange.back}
          height={sizes.base * 4.5}
        />
      </FullHorizontalList>
    </NoScrollView>
  );
};
