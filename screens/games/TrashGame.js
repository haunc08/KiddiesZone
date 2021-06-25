import React, { useEffect, useRef, useState } from "react";
import { Alert, View } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { AutoIcon, ImageButton } from "../../components/Button";
import { Frame } from "../../components/Wrapper";
import { colors, sizes } from "../../constants";
import {
  cleanTrashItem,
  clearAllTrashItems,
  createTrashItem,
} from "../../redux/actions/trashItems";
import { IconManager, ImageManager } from "../../utils/image";
import * as Progress from "react-native-progress";
import { hexToRgba } from "../../utils/color";
import { Heading2, Heading1, Heading3 } from "../../components/Typography";
import { playSoundFile } from "../../utils/sound";

import firestore from "@react-native-firebase/firestore";
import { CollectionName } from "../../utils/enum";
import BackgroundTimer from "react-native-background-timer";

const calcMarginVertical = (flex) => {
  return (sizes.short * flex) / 5;
};

const calcMarginHorizontal = (flex) => {
  return (sizes.long * flex) / 5;
};

const Trash = ({
  trashKey,
  onPress,
  onChangeStateLanding,
  left,
  stopBottom,
  image,
}) => {
  const initialBottom = 5;
  const bottomAnim = useRef(
    new Animated.Value(calcMarginVertical(initialBottom))
  ).current;

  let isLanding = false;

  useEffect(() => {
    animate();
  }, [bottomAnim]);

  const animate = () => {
    bottomAnim.setValue(calcMarginVertical(initialBottom));
    Animated.timing(bottomAnim, {
      toValue: calcMarginVertical(stopBottom),
      duration: 3000,
      easing: Easing.linear,
    }).start(() => {
      // console.log(bottomAnim);
      isLanding = true;
      onChangeStateLanding(isLanding);
    });
  };

  return (
    <Animated.View
      style={{ position: "absolute", bottom: bottomAnim, left: left }}
    >
      <ImageButton
        small
        source={image}
        onPress={() => {
          onPress(trashKey);
          playSoundFile("clean");
          isLanding = false;
          onChangeStateLanding(isLanding);
        }}
      />
    </Animated.View>
  );
};

const limitLandingItems = 10;

const TrashRain = ({ countLandingItems, setCountLandingItems, setPoints }) => {
  const dispatch = useDispatch();
  // const [trashItems, setTrashItems] = useState([]);
  const trashItems = useSelector((state) => state.trashItems);

  const [count, setCount] = useState(0);

  // const trashItemsRef = useRef();
  // trashItemsRef.current = trashItems;

  const countLandingRef = useRef();
  countLandingRef.current = countLandingItems;

  useEffect(() => {
    // if (countLandingItems == limitLandingItems) {
    //   Alert.alert("Thong bao", "Game over!");
    //   return;
    // }

    const interval = setInterval(() => {
      console.log(countLandingItems);
      if (countLandingItems < limitLandingItems) createItems();
      else return;
    }, 500);

    return () => clearInterval(interval);
  }, [trashItems]);

  useEffect(() => {}, []);

  const cleanTrash = (index) => {
    // const newTrashItems = trashItemsRef.current.filter(
    //   (item) => item.key != index
    // );
    // console.log(newTrashItems);

    dispatch(cleanTrashItem(index));
  };

  const handleChangeStateLanding = (isLanding) => {
    if (countLandingItems < limitLandingItems) {
      // why 0 0 0 0 1 2 ... ???
      // console.log(countLandingItems);
      if (isLanding) {
        setCountLandingItems(countLandingRef.current + 1);
      } else setCountLandingItems(countLandingRef.current - 1);
    }
  };

  const getRandomTrashIcon = () => {
    var keys = Object.keys(IconManager.trash);
    return IconManager.trash[keys[(keys.length * Math.random()) << 0]];
  };

  const createItems = () => {
    setCount(count + 1);
    const imagePath = getRandomTrashIcon();

    const randomHorizontal = Math.random() * 4.5;
    const trashLeft = calcMarginHorizontal(randomHorizontal);

    const minPos = 0;
    const maxPos = 2;
    const stopBottom = Math.random() * (maxPos - minPos) + minPos;

    const newTrashItem = {
      component: (
        <Trash
          key={count}
          trashKey={count}
          onPress={(trashKey) => {
            cleanTrash(trashKey), setPoints((prev) => prev + 1);
          }}
          onChangeStateLanding={(isLanding) =>
            handleChangeStateLanding(isLanding)
          }
          left={trashLeft}
          stopBottom={stopBottom}
          image={imagePath}
        />
      ),
      key: count,
    };

    dispatch(createTrashItem(newTrashItem));
    // setTrashItems([...trashItems, newTrashItem]);
  };

  return (
    <View style={{ width: "100%", height: "100%" }}>
      {trashItems.map((item) => item.component)}
    </View>
  );
};

const TrashGame = ({ navigation }) => {
  const [countLandingItems, setCountLandingItems] = useState(0);
  const [points, setPoints] = useState(0);

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

  const dispatch = useDispatch();

  useEffect(() => {
    fetchCurrentGame();
  }, []);

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

  const handleBackBtn = () => {
    // setCurPlayingTime(tempPlayingTime);
    createGameRecord();
    if (child?.isLimited) BackgroundTimer.stopBackgroundTimer();
    navigation.goBack();
    dispatch(clearAllTrashItems());
  };

  return (
    <Frame background={ImageManager.ground}>
      <View
        style={{
          position: "absolute",
          top: calcMarginVertical(0),
          left: calcMarginHorizontal(0),
          margin: 16,
          zIndex: 6,
        }}
      >
        <ImageButton
          small
          source={IconManager.buttons.orange.back}
          onPress={handleBackBtn}
        />
      </View>
      {countLandingItems < limitLandingItems ? (
        <View
          style={{
            position: "absolute",
            top: calcMarginVertical(0.2),
            right: calcMarginHorizontal(0.05),
            marginRight: 16,
            flexDirection: "row",
            alignItems: "center",
            zIndex: 3,
          }}
        >
          {/* <Text
          style={{ fontSize: 48, fontWeight: "bold" }}
        >{`${countLandingItems}/10`}</Text> */}
          <Progress.Bar
            progress={countLandingItems / limitLandingItems}
            width={sizes.long / 3}
            color={colors.yellow}
            borderWidth={4}
            height={sizes.base * 1.5}
            borderRadius={999}
            borderColor={colors.white}
            unfilledColor={hexToRgba(colors.black, 0.33)}
          />
          <AutoIcon
            source={IconManager.radioactive}
            width={38}
            style={{ transform: [{ translateX: -15 }] }}
          />

          <Heading2
            white
            style={{
              marginLeft: sizes.base,
              fontSize: 30,
              transform: [{ translateX: -8 }],
              // minWidth: 35,
            }}
          >
            {points}
          </Heading2>
        </View>
      ) : (
        <View
          style={{
            alignItems: "center",
            backgroundColor: colors.white,
            padding: sizes.base * 2,
            borderRadius: sizes.base * 2,
            elevation: 30,
          }}
        >
          <ImageButton
            source={IconManager.buttons.orange.replay}
            height={sizes.base * 4.5}
            onPress={() => {
              // setLives(3);
              // setPoints(0);
              // play();
              dispatch(clearAllTrashItems());
              navigation.goBack();
              navigation.navigate("TrashGame");
            }}
          />
          <Heading3>Điểm của bạn</Heading3>
          <Heading1>{points}</Heading1>
        </View>
      )}
      {/* {TrashRain()} */}
      {countLandingItems < limitLandingItems ? (
        <TrashRain
          countLandingItems={countLandingItems}
          setCountLandingItems={setCountLandingItems}
          setPoints={setPoints}
        />
      ) : null}
    </Frame>
  );
};

export default TrashGame;
