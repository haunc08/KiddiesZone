import React, { Component } from "react";
import { Image, Text, PermissionsAndroid, Platform, View } from "react-native";
import ViewShot from "react-native-view-shot";
import CameraRoll from "@react-native-community/cameraroll";

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

class TestViewShot extends Component {
  componentDidMount() {
    this.refs.viewShot.capture().then((uri) => {
      console.log("do something with ", uri);
      savePicture(uri);
    });
  }
  render() {
    return (
      <ViewShot ref="viewShot" options={{ format: "jpg", quality: 1 }}>
        <View style={{ backgroundColor: "pink", width: 100, height: 500 }}>
          <Text>...Something to rasterize...</Text>
        </View>
      </ViewShot>
    );
  }
}

export default TestViewShot;
