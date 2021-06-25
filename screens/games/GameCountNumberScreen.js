import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Image,
  View,
  StyleSheet,
  ImageBackground,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Text } from "react-native-elements";
import Orientation from "react-native-orientation-locker";
import { ImageButton } from "../../components/Button";
import { colors, sizes } from "../../constants";
import { IconManager, ImageManager } from "../../utils/image";
import { playSoundFile } from "../../utils/sound";
import { Hearts } from "../../components/Indicator";
import { Row } from "../../components/Wrapper";

import firestore from "@react-native-firebase/firestore";
import { CollectionName } from "../../utils/enum";
import BackgroundTimer from "react-native-background-timer";
import { UserContext } from "../../App";

const food = ImageManager.count.food;

const GameCountNumberScreen = ({ route, navigation }) => {
  const { child, gameKey, playedTime, startTime } = route.params;

  const [currentGame, setCurrentGame] = useState();
  const [childGameData, setChildGameData] = useState();

  const user = useContext(UserContext);

  let tempPlayingTime = 0;

  const remainingTime = playedTime
    ? childGameData?.timeLimit - playedTime
    : childGameData?.timeLimit;

  if (remainingTime <= 0 && child?.isLimited) {
    Alert.alert(
      "Thông báo",
      "Bạn không thể chơi do đã vượt quá thời gian giới hạn.",
      [
        {
          text: "Xin thêm thời gian",
          onPress: () => {
            firestore()
              .collection(CollectionName.USERS)
              .doc(user?.uid)
              .collection(CollectionName.CHILDREN)
              .doc(child?._id)
              .update({ moreTime: 0 });
            navigation.goBack();
          },
        },
        { text: "OK", onPress: () => navigation.goBack() },
      ]
    );
  }
  // const [lifePoint, setLifePoint] = useState(3);
  const [isAnswered, setIsAnswered] = useState(false);

  const points = useRef(0);
  const lives = useRef(3);

  // random from 1 to 9
  const randomNum = Math.floor(Math.random() * 9) + 1;
  const [numberOfItems, setNumberOfItems] = useState(randomNum);

  const randomFood = () => Math.floor(Math.random() * food.length);

  const foodIndex = useRef(randomFood());

  const [question, setQuestion] = useState(
    "Có mấy " + food[foodIndex.current].name + "?"
  );

  useEffect(() => {
    Orientation.lockToLandscapeLeft();
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
  };

  const getItemStyle = () => {
    if (numberOfItems <= 3) {
      return styles.largeCountingItem;
    } else if (numberOfItems <= 6) {
      return styles.mediumCountingItem;
    }
    return styles.smallCountingItem;
  };

  const CountingItems = () => {
    let items = [];
    let itemStyle = getItemStyle();

    const itemInRow = 3;
    const numberOfRows = Math.floor(numberOfItems / itemInRow);
    const remainItems = numberOfItems % 3;
    if (numberOfRows > 0) {
      for (let i = 0; i < numberOfRows; i++) {
        let itemRow = [];
        for (let j = 0; j < itemInRow; j++) {
          itemRow.push(
            <Image
              key={i * itemInRow + j}
              source={food[foodIndex.current].img}
              style={itemStyle}
            />
          );
        }
        items.push(
          <View
            style={{
              flexDirection: "row",
              marginBottom: 16,
            }}
          >
            {itemRow}
          </View>
        );
      }
    }

    let itemRow = [];
    for (let j = 0; j < remainItems; j++) {
      itemRow.push(
        <Image
          key={numberOfRows * 3 + j}
          source={food[foodIndex.current].img}
          style={itemStyle}
        />
      );
    }
    items.push(
      <View style={{ flexDirection: "row", marginBottom: 16 }}>{itemRow}</View>
    );
    return <View style={{ flexDirection: "column" }}>{items}</View>;
  };

  const getAnswers = () => {
    let answer = [0, 0, 0];

    const rightAnswerIndex = Math.floor(Math.random() * 3);
    // ko can 3 nhung phai chay random tu 0 den 3 de xac suat ra 2 nhieu hon
    // random ra tu 0 den 1 nen chi ra 3 khi random = 1
    if (rightAnswerIndex === 3) {
      rightAnswerIndex--;
    }
    answer[rightAnswerIndex] = numberOfItems;

    while (answer.includes(0)) {
      const index = answer.indexOf(0);
      const ranNum = Math.floor(Math.random() * 9) + 1;

      if (!answer.includes(ranNum)) {
        answer[index] = ranNum;
      }
    }
    return answer;
  };

  const handleRightAnswer = () => {
    playSoundFile("yayy");
    setQuestion("Đúng rồi!");
    points.current = points.current + 1;
  };

  const handleWrongAnswer = () => {
    if (lives.current <= 1) {
      playSoundFile("ouch");
    } else {
      playSoundFile("lose");
    }
    setQuestion("Sai rồi!");
    lives.current = lives.current - 1;
    // const newLifePoint = lifePoint - 1;
    // setLifePoint(newLifePoint);
    // console.log("LP", lifePoint);
  };

  const handleChooseAnswer = (answer) => {
    if (answer === numberOfItems) {
      handleRightAnswer();
    } else {
      handleWrongAnswer();
    }
    setIsAnswered(true);
  };

  const AnswerButton = () => {
    const buttons = [];
    const answers = getAnswers();

    answers.map((answer) => {
      const path = ImageManager.number[`${answer}`];
      buttons.push(
        <View style={{ width: "30%" }}>
          <ImageButton
            style={{ marginBottom: 16 }}
            onPress={() => handleChooseAnswer(answer)}
            source={path}
          ></ImageButton>
        </View>
      );
    });
    return buttons;
  };

  const AnswerImage = () => {
    const imagePath = ImageManager.number[`${numberOfItems}`];
    return (
      <Row style={{ marginBottom: sizes.base * 2 }}>
        <TouchableOpacity
          style={{ alignItems: "center" }}
          onPress={() => playSoundFile(`no${numberOfItems}`)}
        >
          <Image
            style={{
              width: 150,
              height: 150,
              opacity: 1,
              marginRight: sizes.base * 3,
            }}
            source={imagePath}
          />
        </TouchableOpacity>
        <ImageButton
          source={
            lives.current > 0
              ? IconManager.buttons.orange.play
              : IconManager.buttons.orange.replay
          }
          height={sizes.base * 5}
          onPress={() => resetValue()}
        />
      </Row>
    );
  };

  const AnswerView = () => {
    if (isAnswered) {
      return AnswerImage();
    }
    return AnswerButton();
  };

  const resetValue = () => {
    const ranNum = Math.floor(Math.random() * 9) + 1;
    if (lives.current <= 0) {
      lives.current = 3;
      points.current = 0;
    }
    setNumberOfItems(ranNum);
    setIsAnswered(false);
    foodIndex.current = randomFood();
    setQuestion("Có mấy " + food[foodIndex.current].name + "?");
  };

  return (
    <ImageBackground
      source={ImageManager.count.bg}
      style={{
        backgroundColor: "pink",
        width: "100%",
        height: "100%",
        flexDirection: "row",
        display: "flex",
      }}
    >
      <View style={{ flex: 10 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            // justifyContent: "",
            alignItems: "center",
            // position: "absolute",
            padding: sizes.base,
            marginBottom: -sizes.base * 3,
          }}
        >
          <View style={{ marginLeft: 16 }}>
            <ImageButton
              // small
              source={IconManager.buttons.orange.back}
              onPress={handleBackBtn}
              height={sizes.base * 4.5}
              // color={colors.red}
            />
          </View>
          <View style={{ alignItems: "center", marginLeft: sizes.base * 2 }}>
            <Text style={styles.title}>{question}</Text>
          </View>
          <View style={{ flex: 1, marginRight: sizes.base * 2 }}>
            <Hearts
              lives={lives.current}
              points={points.current}
              reverse
              pointColor={colors.black}
              noPadding
            />
          </View>
        </View>
        <View style={{ flex: 4 }}>
          <View
            style={{
              flexDirection: "row",
              flex: 4,
              marginTop: sizes.base * 2,
            }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {CountingItems()}
            </View>

            <View
              style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {AnswerView()}
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default GameCountNumberScreen;

const styles = StyleSheet.create({
  imageIcon: {
    width: 45,
    height: 45,
    marginLeft: 16,
  },
  imageButton: {
    width: 45,
    height: 45,
    marginRight: 16,
  },
  text: {
    fontSize: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: colors.darkRed,
  },
  largeCountingItem: {
    width: 90,
    height: 90,
    marginLeft: 16,
  },
  mediumCountingItem: {
    width: 60,
    height: 60,
    marginLeft: 16,
  },
  smallCountingItem: {
    width: 45,
    height: 45,
    marginLeft: 16,
  },
  numberButton: {
    //width: "50%",
    marginBottom: 16,
  },
});
