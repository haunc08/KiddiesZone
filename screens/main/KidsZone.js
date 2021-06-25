import React, { useContext, useEffect } from "react";

import { sizes } from "../../constants";
import { NoScrollView, Space, RoundImpress } from "../../components/Wrapper";
import Orientation from "react-native-orientation-locker";

import { View, StatusBar } from "react-native";
import { FullHorizontalList } from "../../components/HorizontalList";
import { ImageManager } from "../../utils/image";
import { Heading2 } from "../../components/Typography";
import { IconManager } from "../../utils/image";
import { ImageButton } from "../../components/Button";

import firestore from "@react-native-firebase/firestore";
import { CollectionName } from "../../utils/enum";
import { calcAge } from "../../utils/string";
import { UserContext } from "../../App";

export const calcPlayedTimeInDay = async (gameType, childId, date) => {
  let allPlayedTime = 0;
  const d = date ?? new Date();

  try {
    const gamesRef = await firestore()
      .collection(CollectionName.GAMES)
      .where("type", "==", gameType)
      .get();

    for (const gameDoc of gamesRef.docs) {
      const childGameData = await gameDoc.ref
        .collection(CollectionName.CHILD_GAME_DATA)
        .doc(childId)
        .get();

      if (childGameData) {
        const gameRecords = await childGameData.ref
          .collection(CollectionName.GAME_RECORDS)
          .get();

        gameRecords.docs.filter((doc) => {
          if (
            doc.data().createdAt.toDate().toDateString() === d.toDateString()
          ) {
            allPlayedTime += doc.data()?.playedTime;
          }
        });
      }
    }
    return allPlayedTime;
  } catch (error) {
    console.log(error);
  }
};

const KidsZone = ({ route, navigation }) => {
  const user = useContext(UserContext);
  const { child } = route.params;
  const age = calcAge(child?.birthday.toDate());

  // TODO: timeLimit - playedTime = remainingTime
  let playedTime = 0;

  useEffect(() => {
    Orientation.lockToLandscapeLeft();
  }, []);

  const handleChildGameData = async (gameKey) => {
    const gameRef = await firestore()
      .collection(CollectionName.GAMES)
      .where("key", "==", gameKey)
      .get();

    // get the current game from games collection
    // return array with 1 element => use gamesRef.docs[0]
    const childGameDataRef = await gameRef.docs[0].ref
      .collection(CollectionName.CHILD_GAME_DATA)
      .doc(child?._id)
      .get();

    if (!childGameDataRef.data()) {
      await gameRef.docs[0].ref
        .collection(CollectionName.CHILD_GAME_DATA)
        .doc(child?._id)
        .set({
          name: child?.name,
          timeLimit: 1800,
        })
        .then(() => console.log(`Add child data for ${gameKey}`))
        .catch((error) => console.log(error));

      await firestore()
        .collection(CollectionName.USERS)
        .doc(user?.uid)
        .collection(CollectionName.CHILDREN)
        .doc(child?._id)
        .update({
          isLimited: false,
        })
        .then(() => console.log("updated isLimited"))
        .catch((error) => console.log(error));
    }
    // too dirty
    return gameRef.docs[0]?.data().type;
  };

  const handleChooseGame = async (screenName) => {
    const gameType = await handleChildGameData(screenName);
    const playedTime = await calcPlayedTimeInDay(gameType, child?._id);
    // console.log(playedTime);

    const startTime = new Date().getTime();
    navigation.navigate(screenName, {
      child,
      gameKey: screenName,
      playedTime,
      startTime,
    });
  };

  const games = [
    {
      key: "GameAlphabet",
      name: "Đánh vần",
      image: ImageManager.games.letters,
    },
    {
      key: "GameCountNumberScreen",
      name: "Đếm số",
      image: ImageManager.games.numbers2,
    },
    {
      key: "GameAdd",
      name: "Phép cộng",
      image: ImageManager.games.calc,
    },
    {
      key: "Shapes",
      name: "Hình khối",
      image: ImageManager.games.shapes,
    },
    {
      key: "TrashGame",
      name: "Dọn rác",
      image: ImageManager.games.trash,
    },
    {
      key: "Sandbox",
      name: "Vẽ trên cát",
      image: ImageManager.games.sandbox,
    },

    {
      key: "Instruments",
      name: "Âm nhạc",
      image: ImageManager.games.instrument,
    },

    {
      key: "Movies",
      name: "Xem hoạt hình",
      image: ImageManager.games.movies,
    },

    {
      key: "Stories",
      name: "Đọc truyện",
      image: ImageManager.games.stories,
    },
  ];
  return (
    <NoScrollView style={{ padding: 0 }} imgSource={ImageManager.kidszonebg}>
      <StatusBar hidden />
      {/* <KidsZoneNavbar navigation={navigation} /> */}
      <FullHorizontalList
        data={games}
        onPress={handleChooseGame}
        spaceScale={3}
      >
        <View
          style={{
            alignItems: "center",
            alignSelf: "center",
            marginRight: sizes.base * 2,
            marginLeft: sizes.base * 2,
          }}
        >
          <Space tight>
            <View style={{ height: sizes.base * 0 }} />
            <RoundImpress size={3}>
              <Heading2 style={{ fontSize: sizes.h2 + 6 }}>{age}</Heading2>
            </RoundImpress>
            <Heading2 white>{child?.name}</Heading2>

            <ImageButton
              onPress={() => navigation.navigate("ParentPasswordScreen")}
              source={IconManager.buttons.orange.back}
              height={sizes.base * 4}
              style={{ marginTop: sizes.base }}
            />
          </Space>
        </View>
      </FullHorizontalList>
    </NoScrollView>
  );
};

export default KidsZone;
