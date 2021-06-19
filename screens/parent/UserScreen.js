import React, { useContext } from "react";

import { colors, sizes } from "../../constants";
import {
  Card,
  Row,
  ScreenView,
  Space,
  RoundImpress,
} from "../../components/Wrapper";
import { AutoIcon, Button } from "../../components/Button";
import { IconManager } from "../../utils/image";
import { Heading2, Body, Heading3 } from "../../components/Typography";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { hexToRgba } from "../../utils/color";
import { Divider } from "react-native-elements";

import auth from "@react-native-firebase/auth";
import { UserContext } from "../../App";
import { ChildrenContext } from "../../navigation/ParentNavigator";
import { calcAge, shortenName } from "../../utils/string";
import { HandlingMode } from "../../utils/enum";

export const ChildItem = ({ age, name, color, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        width: sizes.h1 + sizes.base * 4,
        paddingRight: sizes.base,
      }}
      onPress={onPress}
    >
      <RoundImpress color={color || colors.primary} size={3}>
        <Heading2 white>{age}</Heading2>
      </RoundImpress>
      <Body style={{ marginTop: sizes.base / 2, fontWeight: "bold" }}>
        {shortenName(name)}
      </Body>
    </TouchableOpacity>
  );
};

export const ChildAddButton = ({ onPress }) => {
  return (
    <TouchableOpacity
      style={{
        alignItems: "center",
        width: sizes.h1 + sizes.base * 4,
        paddingRight: sizes.base,
      }}
      onPress={onPress}
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

export const UserScreen = ({ navigation }) => {
  const user = useContext(UserContext);
  const children = useContext(ChildrenContext);

  const handlePressAddChild = () => {
    navigation.navigate("AddChildScreen", { mode: HandlingMode.ADD });
  };

  const handleEditChild = (child) => {
    console.log("handle edit child");
    navigation.navigate("AddChildScreen", { mode: HandlingMode.EDIT, child });
  };

  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log("Signed out successfully"))
      .catch((error) => console.log(error));
  };

  const ChildrenItems = () => {
    let items = [];

    if (children.length > 0) {
      items = children.map((child) => (
        <ChildItem
          name={child?.name}
          age={calcAge(child?.birthday.toDate())}
          onPress={() => handleEditChild(child)}
        />
      ));
    }

    items.push(<ChildAddButton onPress={handlePressAddChild} />);
    return items;
  };

  return (
    <ScreenView title="Người dùng" isMainScreen>
      <Space>
        <Card title="Tổng quan">
          <Space>
            <View style={{ alignItems: "center" }}>
              <Space>
                <AutoIcon source={IconManager.avatar} width={sizes.short / 3} />
                <Heading2>{user?.displayName}</Heading2>
                <Body color={colors.fadeblack50}>{user?.email}</Body>
              </Space>
            </View>
            <Heading3 style={{ alignSelf: "flex-start" }}>Các con</Heading3>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <ChildrenItems />
            </ScrollView>
          </Space>
        </Card>
        <Card title="Cài đặt">
          <Space>
            <SettingRow
              iconSource={IconManager.pincode}
              text="Đổi mã PIN"
              onPress={() => {
                navigation.navigate("CreatePasswordScreen");
              }}
            />
            <SettingRow
              iconSource={IconManager.info}
              onPress={() => {
                navigation.navigate("ChangeNameScreen");
              }}
              text="Cài đặt tài khoản"
            />
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
