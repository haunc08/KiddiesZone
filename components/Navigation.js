import React from "react";
import { View } from "react-native";
import { Avatar } from "react-native-elements";

import { icons, images, sizes, colors, fonts } from "../constants";
import { Button, ImageButton } from "./Button";
import { Body } from "./Typography";
import { Space } from "./Wrapper";

export const KidsZoneNavbar = () => {
  return (
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
  );
};
