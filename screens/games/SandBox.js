import React, { useEffect, useRef } from "react";

import { colors, sizes } from "../../constants";
import {
  Card,
  NoScrollView,
  Row,
  ScreenView,
  Space,
} from "../../components/Wrapper";
import { Button, ImageButton } from "../../components/Button";
import Orientation from "react-native-orientation-locker";
import ViewShot from "react-native-view-shot";
import CameraRoll from "@react-native-community/cameraroll";

import {
  Body,
  Heading1,
  Heading2,
  Heading3,
} from "../../components/Typography";
import {
  View,
  ScrollView,
  PermissionsAndroid,
  Platform,
  Image,
} from "react-native";
import { Avatar } from "react-native-elements";

import { SketchCanvas } from "@terrylinla/react-native-sketch-canvas";
import { TouchableOpacity } from "react-native-gesture-handler";

async function hasAndroidPermission() {
  const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

  const hasPermission = await PermissionsAndroid.check(permission);
  if (hasPermission) {
    return true;
  }

  const status = await PermissionsAndroid.request(permission);
  return status === "granted";
}

async function savePicture(uri) {
  if (Platform.OS === "android" && !(await hasAndroidPermission())) {
    return;
  }

  CameraRoll.save(uri)
    .then((u) => {
      alert("Đã lưu hình vào thư viện.");
    })
    .catch((error) => {
      console.log("Đã xảy ra lỗi trong quá trình lưu hình.", error);
    });
}

export const Sandbox = () => {
  useEffect(() => {
    Orientation.lockToLandscapeLeft();
  }, []);
  const viewShotRef = useRef();
  const screenShot = () => {
    viewShotRef.current.capture().then((uri) => {
      console.log("do something with ", uri);
      savePicture(uri);
    });
  };
  return (
    <View
      style={{ flex: 1, justifyContent: "space-between", alignItems: "center" }}
    >
      <ViewShot
        style={{
          position: "absolute",
          width: sizes.width,
          height: sizes.height,
        }}
        ref={viewShotRef}
        options={{ format: "jpg", quality: 1 }}
      >
        <View
          style={{
            backgroundColor: colors.yellow,
            position: "absolute",
            width: sizes.width,
            height: sizes.height,
          }}
        >
          <SketchCanvas
            style={{
              position: "absolute",
              width: sizes.width,
              height: sizes.height,
            }}
            strokeColor={colors.brown}
            strokeWidth={20}
          />
        </View>
      </ViewShot>
      <View
        style={{
          alignSelf: "stretch",
          flexDirection: "row-reverse",
          padding: sizes.base,
        }}
      >
        <Button onPress={screenShot}>Back</Button>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignSelf: "stretch",
          padding: sizes.base,
        }}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Space loose>
            <ImageButton
              onPress={screenShot}
              source={require("../../assets/icons/sandbox/screenshot.png")}
            />
            <ImageButton
              onPress={screenShot}
              source={require("../../assets/icons/sandbox/erase.png")}
            />
            <ImageButton
              onPress={screenShot}
              source={require("../../assets/icons/sandbox/undo.png")}
            />
          </Space>
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Space loose>
            <ImageButton
              onPress={screenShot}
              source={require("../../assets/icons/sandbox/finger.png")}
            />
            <ImageButton
              onPress={screenShot}
              source={require("../../assets/icons/sandbox/stick.png")}
            />
          </Space>
        </View>
      </View>
      {/* <View
          style={{
            alignSelf: "flex-end",
            flexDirection: "row-reverse",
            position: "absolute",
          }}
        >
          <Button onPress={screenShot}>Back</Button>
        </View>
        <View
          style={{
            alignSelf: "center",
            flexDirection: "row-reverse",
            position: "absolute",
          }}
        >
          <Button onPress={screenShot}>Back</Button>
        </View> */}
    </View>
  );
};

export default Sandbox;
