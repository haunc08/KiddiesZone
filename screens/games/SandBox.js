import React, { useEffect, useRef, useState } from "react";

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
  Alert,
  ImageBackground,
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
      Alert.alert("Hoan hô!", "Đã lưu hình vào thư viện.");
    })
    .catch((error) => {
      console.log("Đã xảy ra lỗi trong quá trình lưu hình.", error);
    });
}

export const Sandbox = ({ navigation }) => {
  const [stroke, setStroke] = useState({ type: "finger", width: 20 });
  useEffect(() => {
    Orientation.lockToLandscapeLeft();
  }, []);
  const viewShotRef = useRef();
  const canvasRef = useRef();
  const screenShot = () => {
    viewShotRef.current.capture().then((uri) => {
      console.log("do something with ", uri);
      savePicture(uri);
    });
  };
  const confirmination = () =>
    Alert.alert("Alert Title", "My Alert Msg", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: () => console.log("OK Pressed") },
    ]);
  const clear = () => {
    canvasRef.current.clear();
  };
  const undo = () => {
    canvasRef.current.undo(1);
  };
  const selectStroke = (type) => {
    setStroke(type);
  };
  const goHome = () => {
    Alert.alert(
      "Lưu ý",
      "Bé có muốn thoát không? Hình vẽ chưa lưu sẽ bị mất.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]
    );
    // navigation.navigate("kidszone")
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
        <ImageBackground
          source={require("../../assets/images/beach.jpg")}
          style={{
            position: "absolute",
            width: sizes.width,
            height: sizes.height,
          }}
        >
          <SketchCanvas
            ref={canvasRef}
            style={{
              position: "absolute",
              width: sizes.width,
              height: sizes.height,
            }}
            strokeColor={colors.brown}
            strokeWidth={stroke.width}
          />
        </ImageBackground>
      </ViewShot>
      <View
        style={{
          alignSelf: "stretch",
          flexDirection: "row-reverse",
          padding: sizes.base,
        }}
      >
        <ImageButton
          small
          onPress={() => goHome()}
          source={require("../../assets/icons/home.png")}
        />
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
              onPress={clear}
              source={require("../../assets/icons/sandbox/clear.png")}
            />
            <ImageButton
              onPress={undo}
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
              disable={stroke.type !== "finger"}
              onPress={() => selectStroke({ type: "finger", width: 15 })}
              source={require("../../assets/icons/sandbox/finger.png")}
            />
            <ImageButton
              disable={stroke.type !== "stick"}
              onPress={() => selectStroke({ type: "stick", width: 5 })}
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
