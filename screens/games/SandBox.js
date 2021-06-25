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

import firestore from "@react-native-firebase/firestore";
import { CollectionName } from "../../utils/enum";
import BackgroundTimer from "react-native-background-timer";

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

export const Sandbox = ({ route, navigation }) => {
  const { child, gameKey, playedTime, startTime } = route.params;

  const [currentGame, setCurrentGame] = useState();
  const [childGameData, setChildGameData] = useState();

  let tempPlayingTime = 0;

  const remainingTime = playedTime
    ? childGameData?.timeLimit - playedTime
    : childGameData?.timeLimit;

  if (remainingTime <= 0 && child?.isLimited) {
    Alert.alert(
      "Thông báo",
      "Bạn không thể chơi do đã vượt quá thời gian giới hạn.",
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  }

  const [stroke, setStroke] = useState({ type: "finger", width: 20 });

  useEffect(() => {
    Orientation.lockToLandscapeLeft();
    fetchCurrentGame();
  }, []);

  const viewShotRef = useRef();
  const canvasRef = useRef();

  useEffect(() => {
    fetchChildGameData();
  }, [currentGame]);

  useEffect(() => {
    if (childGameData?.timeLimit && child?.isLimited) {
      if (remainingTime > 0) {
        BackgroundTimer.runBackgroundTimer(() => {
          tempPlayingTime++;
          console.log(tempPlayingTime);
          if (tempPlayingTime == remainingTime) {
            createGameRecord();

            Alert.alert(
              "Thông báo",
              "Bạn không thể chơi do đã vượt quá thời gian giới hạn.",
              [
                {
                  text: "OK",
                  onPress: () => {
                    BackgroundTimer.stopBackgroundTimer();
                    navigation.goBack();
                  },
                },
              ]
            );
          }
        }, 1000);
      }
    }
  }, [childGameData]);

  const createGameRecord = async () => {
    const endTime = new Date().getTime();
    const playedTime = Math.floor((endTime - startTime) / 1000);

    await firestore()
      .collection(CollectionName.GAMES)
      .doc(currentGame?._id)
      .collection(CollectionName.CHILD_GAME_DATA)
      .doc(child?._id)
      .collection(CollectionName.GAME_RECORDS)
      .add({
        playedTime: playedTime,
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => console.log("Add game record successfully"))
      .catch((error) => console.log(error));
  };

  const fetchCurrentGame = async () => {
    await firestore()
      .collection(CollectionName.GAMES)
      .where("key", "==", gameKey)
      .get()
      .then((querySnapshot) => {
        const doc = querySnapshot.docs[0];
        const game = { ...doc.data(), _id: doc.id };
        setCurrentGame(game);
      });
  };

  const fetchChildGameData = async () => {
    await firestore()
      .collection(CollectionName.GAMES)
      .doc(currentGame?._id)
      .collection(CollectionName.CHILD_GAME_DATA)
      .doc(child?._id)
      .get()
      .then((doc) => {
        const childData = { ...doc.data(), _id: doc.id };
        setChildGameData(childData);
      });
  };

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
            createGameRecord();
            if (child?.isLimited) BackgroundTimer.stopBackgroundTimer();
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
