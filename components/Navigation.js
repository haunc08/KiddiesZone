import React from "react";
import { View } from "react-native";
import { Avatar } from "react-native-elements";

import { icons, images, sizes, colors, fonts } from "../constants";
import { hexToRgba } from "../utils/color";
import { Button, ImageButton } from "./Button";
import { Body, Heading3 } from "./Typography";
import { Space } from "./Wrapper";

export const KidsZoneNavbar = ({ navigation, child }) => {
  return (
    <View
      style={{
        backgroundColor: hexToRgba(colors.white, 0.5),
        padding: sizes.base,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <View style={{ alignItems: "center", flexDirection: "row" }}>
        <Space>
          <View
            style={{
              backgroundColor: colors.white,
              height: 30,
              width: 30,
              borderRadius: 999,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Heading3>5</Heading3>
          </View>
          <Body white>Phan Huy Tiến</Body>
        </Space>
      </View>
      <Button small onPress={() => navigation.navigate("ParentPasswordScreen")}>
        Cho phụ huynh
      </Button>
    </View>
  );
};
