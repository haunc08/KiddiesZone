import React, { useEffect } from "react";

import { colors, sizes } from "../../constants";
import {
  Card,
  NoScrollView,
  Row,
  ScreenView,
  Space,
  RoundImpress,
} from "../../components/Wrapper";
import Orientation from "react-native-orientation-locker";

import { View, ScrollView, StatusBar } from "react-native";
import { KidsZoneNavbar } from "../../components/Navigation";
import { FullHorizontalList } from "../../components/HorizontalList";
import { ImageManager } from "../../utils/image";
import { Heading2 } from "../../components/Typography";
import { IconManager } from "../../utils/image";
import { ImageButton } from "../../components/Button";

export const KidsZone = ({ navigation }) => {
  useEffect(() => {
    Orientation.lockToLandscapeLeft();
  }, []);
  const handleChooseGame = (screenName) => {
    navigation.navigate(screenName);
  };

  const games = [
    {
      key: "Instruments",
      name: "Âm nhạc",
      image: ImageManager.games.instrument,
    },
    {
      key: "Shapes",
      name: "Hình khối",
      image: ImageManager.games.shapes,
    },
    {
      key: "Movies",
      name: "Xem hoạt hình",
      image: ImageManager.games.movies,
    },
    {
      key: "Sandbox",
      name: "Vẽ trên cát",
      image: ImageManager.games.sandbox,
    },
    {
      key: "Stories",
      name: "Đọc truyện",
      image: ImageManager.games.stories,
    },
    {
      key: "GameCountNumberScreen",
      name: "Đếm số",
      image: ImageManager.games.numbers2,
    },
    {
      key: "GameAlphabet",
      name: "Đánh vần",
    },
    {
      key: "GameAdd",
      name: "Phép cộng",
    },
    {
      key: "TrashGame",
      name: "Dọn rác",
    },
  ];
  return (
    <NoScrollView style={{ padding: 0 }} imgSource={ImageManager.kidszonebg}>
      <StatusBar hidden />
      {/* <KidsZoneNavbar navigation={navigation} /> */}
      <FullHorizontalList data={games} onPress={handleChooseGame}>
        <View
          style={{
            alignItems: "center",
            alignSelf: "center",
            marginRight: 100,
          }}
        >
          <Space tight>
            <View style={{ height: sizes.base * 0 }} />
            <RoundImpress size={3}>
              <Heading2 style={{ fontSize: sizes.h2 + 6 }}>5</Heading2>
            </RoundImpress>
            <Heading2 white>Ngô Công Hậu</Heading2>

            <ImageButton
              onPress={() => navigation.navigate("ParentPasswordScreen")}
              source={IconManager.back}
              height={sizes.base * 3}
              style={{ marginTop: sizes.base }}
            />
          </Space>
        </View>
      </FullHorizontalList>
    </NoScrollView>
  );
};

export default KidsZone;
