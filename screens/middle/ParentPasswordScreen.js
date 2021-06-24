import React, { useEffect, useRef, useState, useContext } from "react";

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
import { ImageManager } from "../../utils/image";
import { ImageButton } from "../../components/Button";
import { Heading1, Heading2 } from "../../components/Typography";
import { TouchableOpacity } from "react-native-gesture-handler";
import firestore from "@react-native-firebase/firestore";
import { UserContext } from "../../App";
import { CollectionName } from "../../utils/enum";

const buttonSize = 54;
const fieldSize = 12;
const numberSize = 32;

export const ParentPasswordScreen = ({ navigation }) => {
  const [password, setPassword] = useState("");
  const wrong = useRef(false);
  const correctPassword = useRef();

  const user = useContext(UserContext);

  useEffect(() => {
    firestore()
      .collection(CollectionName.USERS)
      .doc(user?.uid)
      .get()
      .then((doc) => (correctPassword.current = doc.data().passcode))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (password.length >= 4) {
      if (password.toString() !== correctPassword.current.toString()) {
        wrong.current = true;
        setPassword("");
      } else {
        Orientation.lockToPortrait();
        navigation.navigate("Tabs");
      }
    }
  }, [password]);

  const button = (num) => {
    return (
      <TouchableOpacity
        onPress={() => {
          wrong.current = false;
          setPassword(password + num);
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
    console.log("password", password);
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
      ></View>
    );
  };
  const fields = () => {
    return (
      <Space>
        {field(password.length > 0)}
        {field(password.length > 1)}
        {field(password.length > 2)}
        {field(password.length > 3)}
      </Space>
    );
  };
  return (
    <ImageBackground
      source={ImageManager.passwordParent.background}
      style={{
        padding: 0,
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        backgroundColor: "white",
      }}
    >
      <View
        style={{
          position: "absolute",
          alignSelf: "stretch",
          padding: sizes.base,
        }}
      >
        <ImageButton
          width={45}
          onPress={() => navigation.goBack()}
          source={require("../../assets/icons/back.png")}
        />
      </View>
      <View
        style={{ flex: 0.5, alignItems: "center", justifyContent: "center" }}
      >
        <View style={{ marginLeft: sizes.long / 8, alignItems: "center" }}>
          <ImageButton
            source={ImageManager.passwordParent.animals}
            height={sizes.short / 1.3}
          />
          <Heading1
            style={{
              marginTop: -sizes.base * 2,
              marginBottom: sizes.base,
              color: colors.white80,
            }}
          >
            {wrong.current ? `Sai mật khẩu!` : `Nhập mật khẩu`}
          </Heading1>
        </View>
      </View>
      <View style={{ flex: 0.6, alignItems: "center" }}>
        <View
          style={{
            padding: sizes.base * 3,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{ flexDirection: "row", marginBottom: sizes.base * 2.5 }}
          >
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
        </View>
      </View>
    </ImageBackground>
  );
};

export default ParentPasswordScreen;
