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

export const KidsZone = ({ navigation }) => {
  useEffect(() => {
    Orientation.lockToLandscapeLeft();
  }, []);
  const handleChooseGame = (screenName) => {
    navigation.navigate(screenName);
  };
  const games = [
    {
      key: "Sandbox",
      name: "Vẽ trên cát",
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
      key: "Spelling",
      name: "Đánh vần",
    },
  ];
  return (
    <NoScrollView style={{ padding: 0 }}>
      <StatusBar hidden />
      <KidsZoneNavbar />
      <FullHorizontalList data={games} handlePress={handleChooseGame} />
    </NoScrollView>
  );
};

export default KidsZone;
