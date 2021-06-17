import React from "react";

import { colors, sizes } from "../../constants";
import {
  Card,
  Row,
  ScreenView,
  Space,
  RoundImpress,
} from "../../components/Wrapper";
import { TextInput } from "../../components/TextInput";
import { AutoIcon, Button } from "../../components/Button";
import { HorizontalList } from "../../components/HorizontalList";
import { IconManager } from "../../utils/image";
import {
  Heading2,
  Body,
  Heading3,
  Heading1,
} from "../../components/Typography";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { hexToRgba } from "../../utils/color";
import { Icon, Divider } from "react-native-elements";
// import * as firebase from "firebase";
import auth from "@react-native-firebase/auth";

export const ChildItem = ({ age, name }) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        width: sizes.h1 + sizes.base * 4,
        paddingRight: sizes.base,
      }}
    >
      <RoundImpress color={colors.primary} size={3}>
        <Heading2 white>{age}</Heading2>
      </RoundImpress>
      <Body style={{ marginTop: sizes.base / 2, fontWeight: "bold" }}>
        {name}
      </Body>
    </TouchableOpacity>
  );
};

export const ChildAddButton = () => {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        width: sizes.h1 + sizes.base * 4,
        paddingRight: sizes.base,
      }}
    >
      <RoundImpress color={colors.primary} size={3}>
        <Body
          style={{ fontSize: sizes.h1, color: colors.white, marginBottom: 4 }}
        >
          +
        </Body>
      </RoundImpress>
      <Body
        style={{
          marginTop: sizes.base / 2,
          fontWeight: "bold",
          color: hexToRgba(colors.black, 0.33),
        }}
      >
        Thêm
      </Body>
    </TouchableOpacity>
  );
};

const SettingRow = ({ onPress, iconSource, text, color }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Divider
        style={{
          marginTop: -4,
          marginBottom: sizes.base * 0.75,
        }}
      />
      <Row style={{ alignItems: "center" }}>
        <AutoIcon
          source={iconSource}
          color={color ? color : colors.primary}
          width={sizes.h1 - 4}
        />
        <Body style={{ marginLeft: sizes.base, fontSize: sizes.body + 1 }}>
          {text}
        </Body>
      </Row>
    </TouchableOpacity>
  );
};

const signOut = () => {
  auth()
    .signOut()
    .then(() => console.log("Signed out successfully"))
    .catch((error) => console.log(error));
};

export const UserScreen = () => {
  return (
    <ScreenView title="Người dùng" isMainScreen>
      <Space>
        <Card title="Tổng quan">
          <Space>
            <View style={{ alignItems: "center" }}>
              <Space>
                <AutoIcon source={IconManager.avatar} width={sizes.short / 3} />
                <Heading2>Ngô Công Hậu</Heading2>
                <Body color={colors.fadeblack50}>muiheoconghau@gmail.com</Body>
              </Space>
            </View>
            <Heading3 style={{ alignSelf: "flex-start" }}>Các con</Heading3>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <ChildItem name="Hậu" age="5" />
              <ChildItem name="Tiến" age="3" />
              <ChildAddButton />
            </ScrollView>
          </Space>
        </Card>
        <Card title="Cài đặt">
          <Space>
            <SettingRow iconSource={IconManager.pincode} text="Đổi mã pin" />
            <SettingRow iconSource={IconManager.info} text="Đổi tên" />
            <SettingRow iconSource={IconManager.password} text="Đổi mật khẩu" />
            <SettingRow
              iconSource={IconManager.logout}
              text="Đăng xuất"
              color={colors.red}
              onPress={signOut}
            />
          </Space>
        </Card>
      </Space>
    </ScreenView>
  );
};

export default UserScreen;
