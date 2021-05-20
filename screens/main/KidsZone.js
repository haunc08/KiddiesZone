import React, { useEffect } from "react";

import { colors, sizes } from "../../constants";
import { Card, Row, ScreenView, Space } from "../../components/Wrapper";
import { TextInput } from "../../components/TextInput";
import { Button } from "../../components/Button";
import { GameList } from "../../components/GameList";
import Orientation from "react-native-orientation-locker";
import {
  Body,
  Heading1,
  Heading2,
  Heading3,
} from "../../components/Typography";
import { View, ScrollView } from "react-native";
import { Avatar } from "react-native-elements";

export const KidsZone = () => {
  useEffect(() => {
    Orientation.lockToLandscapeLeft();
  }, []);
  const games = [
    {
      name: "Vẽ trên cát",
    },
    {
      name: "Đếm số",
    },
    {
      name: "Đánh vần",
    },
    {
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
              <Card touchable style={{ width: 320 }} title={g.name} />
            ))}
          </Space>
        </View>
      </ScrollView>
    </View>
  );
};

export default KidsZone;
