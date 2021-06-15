import React, { useEffect, useRef, useState } from "react";

import { colors, sizes } from "../../constants";
import {
  Card,
  NoScrollView,
  Row,
  ScreenView,
  Space,
} from "../../components/Wrapper";
import Orientation from "react-native-orientation-locker";

import {
  View,
  ScrollView,
  StatusBar,
  Text,
  ImageBackground,
} from "react-native";
import { KidsZoneNavbar } from "../../components/Navigation";
import { FullHorizontalList } from "../../components/HorizontalList";
import { IconManager, ImageManager } from "../../utils/image";
import { ImageButton } from "../../components/Button";
import { Heading1, Heading2 } from "../../components/Typography";
import { TouchableOpacity } from "react-native-gesture-handler";

const buttonSize = 81;
const fieldSize = 16;
const numberSize = 36;

export const CreatePasswordScreen = ({ navigation }) => {
  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const wrong = useRef(false);

  useEffect(() => {
    if (rePassword.length >= 4) {
      if (rePassword !== password) {
        wrong.current = true;
        setRePassword("");
      }
    }
  }, [rePassword]);
  const button = (num) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (password.length < 4) {
            setPassword(password + num);
          } else {
            wrong.current = false;
            setRePassword(rePassword + num);
          }
        }}
      >
        <View
          style={{
            borderRadius: 999,
            backgroundColor: colors.white12,
            width: buttonSize,
            height: buttonSize,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: colors.white,
              fontWeight: "bold",
              fontSize: numberSize,
            }}
          >
            {num}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const field = (filled) => {
    return (
      <View
        style={{
          borderRadius: 999,
          borderWidth: 1,
          borderColor: colors.white,
          backgroundColor: filled ? colors.white : colors.white12,
          width: fieldSize,
          height: fieldSize,
          alignItems: "center",
          justifyContent: "center",
        }}
      />
    );
  };
  const fields = () => {
    if (password.length < 4)
      return (
        <Space>
          {field(password.length > 0)}
          {field(password.length > 1)}
          {field(password.length > 2)}
          {field(password.length > 3)}
        </Space>
      );
    else
      return (
        <Space>
          {field(rePassword.length > 0)}
          {field(rePassword.length > 1)}
          {field(rePassword.length > 2)}
          {field(rePassword.length > 3)}
        </Space>
      );
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#a4d1d6",
      }}
    >
      <Space loose>
        <Heading2
          style={{
            color: colors.white80,
          }}
        >
          {password.length < 4
            ? "Tạo mật khẩu mới"
            : wrong.current
            ? "Sai mật khẩu"
            : "Nhập lại mật khẩu"}
        </Heading2>
        <View style={{ flexDirection: "row", marginBottom: sizes.base }}>
          {fields()}
        </View>
        <Space>
          <View style={{ flexDirection: "row" }}>
            <Space>
              {button(1)}
              {button(2)}
              {button(3)}
            </Space>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Space>
              {button(4)}
              {button(5)}
              {button(6)}
            </Space>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Space>
              {button(7)}
              {button(8)}
              {button(9)}
            </Space>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Space>{button(0)}</Space>
          </View>
        </Space>
      </Space>
    </View>
  );
};

export default CreatePasswordScreen;
