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
  const games = [
    {
      key: "sandbox",
      name: "Vẽ trên cát",
    },
    {
      key: "counting",
      name: "Đếm số",
    },
    {
      key: "spelling",
      name: "Đánh vần",
    },
    {
      key: "reading",
      name: "Đọc truyện",
    },
  ];
  return (
    <NoScrollView style={{ padding: 0 }}>
      <StatusBar hidden />
      <KidsZoneNavbar />
      <FullHorizontalList data={games} navigation={navigation} />
    </NoScrollView>
  );
};

export default KidsZone;
