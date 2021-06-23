import React, { useEffect, useRef, useState } from "react";

import { colors, sizes, screen } from "../../constants";
import { Space } from "../../components/Wrapper";
import { ImageButton } from "../../components/Button";
import Orientation from "react-native-orientation-locker";
import ViewShot from "react-native-view-shot";
import CameraRoll from "@react-native-community/cameraroll";

import {
  View,
  PermissionsAndroid,
  Platform,
  Alert,
  ImageBackground,
} from "react-native";

import { SketchCanvas } from "@terrylinla/react-native-sketch-canvas";
import { IconManager } from "../../utils/image";
import { playSoundFile } from "../../utils/sound";

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

  const clear = () => {
    playSoundFile("waterclear");
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
        {
          text: "OK",
          onPress: () => {
            navigation.goBack();
            console.log("OK Pressed");
          },
        },
      ]
    );
  };
  return (
    <View
      style={{ flex: 1, justifyContent: "space-between", alignItems: "center" }}
    >
      <ViewShot
        style={{
          position: "absolute",
          width: sizes.long,
          height: sizes.short,
        }}
        ref={viewShotRef}
        options={{ format: "jpg", quality: 1 }}
      >
        <ImageBackground
          source={require("../../assets/images/beach.jpg")}
          style={{
            position: "absolute",
            width: sizes.long,
            height: sizes.short,
          }}
        >
          <SketchCanvas
            ref={canvasRef}
            style={{
              position: "absolute",
              width: sizes.long,
              height: sizes.short,
            }}
            strokeColor={colors.brown}
            strokeWidth={stroke.width}
          />
        </ImageBackground>
      </ViewShot>
      <View
        style={{
          alignSelf: "stretch",
          flexDirection: "row",
          padding: sizes.base,
        }}
      >
        <ImageButton
          width={sizes.base * 4.5}
          onPress={() => goHome()}
          source={IconManager.buttons.orange.back}
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
