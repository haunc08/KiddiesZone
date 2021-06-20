import React, { useEffect } from "react";

import { colors, sizes } from "../../constants";
import {
  Card,
  NoScrollView,
  Row,
  ScreenView,
  Space,
} from "../../components/Wrapper";
import Orientation from "react-native-orientation-locker";

import { View, ScrollView, StatusBar } from "react-native";
import { KidsZoneNavbar } from "../../components/Navigation";
import { FullHorizontalList } from "../../components/HorizontalList";
import { ImageManager } from "../../utils/image";

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
    },
    {
      key: "GameCountNumberScreen",
      name: "Đếm số",
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
      <FullHorizontalList data={games} onPress={handleChooseGame} />
    </NoScrollView>
  );
};

export default KidsZone;
