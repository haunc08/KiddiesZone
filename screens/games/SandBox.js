import React, { useEffect } from "react";

import { colors, sizes } from "../../constants";
import { Card, Row, ScreenView, Space } from "../../components/Wrapper";
import { TextInput } from "../../components/TextInput";
import { Button } from "../../components/Button";
import { GameList } from "../../components/GameList";
import Orientation from "react-native-orientation-locker";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import {
  Body,
  Heading1,
  Heading2,
  Heading3,
} from "../../components/Typography";
import { View, ScrollView } from "react-native";
import { Avatar } from "react-native-elements";

export const SandBox = ({ navigation }) => {
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
    <View style={{ flex: 1, backgroundColor: colors.darkprimary }}>
      <View
        style={{
          backgroundColor: colors.fadeblack,
          padding: sizes.base,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View style={{ alignItems: "center", flexDirection: "row" }}>
          <Space>
            <Avatar
              rounded
              source={{
                uri: "https://picsum.photos/128",
              }}
            />
            <Body white>Ngô Công Hậu</Body>
          </Space>
        </View>
        <Button small>Cho phụ huynh</Button>
      </View>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{ padding: sizes.base * 2 }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingRight: 200,
          }}
        >
          <Space loose>
            {games.map((g) => (
              <Card
                key={g.key}
                touchable
                style={{ width: 320 }}
                title={g.name}
                onPress={() => navigation.navigate(g.key)}
              />
            ))}
          </Space>
        </View>
      </ScrollView>
    </View>
  );
};

export default SandBox;
