import React, { useEffect, useState } from "react";
import { Image, View, StyleSheet } from "react-native";
import { Button, Icon, Text } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
//import Orientation from "react-native-orientation-locker";
import Sound from "react-native-sound";

const GameCountNumberScreen = () => {
  const [lifePoint, setLifePoint] = useState(3);
  const [question, setQuestion] = useState("Có mấy cái bánh?");
  const [isAnswered, setIsAnswered] = useState(false);

  const mySound = new Sound("catrunning.mp3", Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log("Error loading sound: ", error);
      return;
    }
  });

  mySound.setVolume(0.9);
  mySound.release();

  // random from 1 to 9
  const randomNum = Math.floor(Math.random() * 9) + 1;
  const [numberOfItems, setNumberOfItems] = useState(randomNum);

  useEffect(() => {
    //Orientation.lockToLandscapeLeft();
    setNumberOfItems(randomNum);
  }, []);

  const PlayLocalSoundFile = () => {
    Sound.setCategory("Playback");
    mySound.play((success) => {
      if (success) {
        console.log("Sound playing");
      } else {
        console.log("Issue playing file");
      }
    });
  };

  if (lifePoint <= 0) {
    console.log("Game over");
  }

  const LifePoints = () => {
    let lifePoints = [];
    for (let i = 0; i < lifePoint; i++) {
      lifePoints.push(
        <Image
          key={i}
          source={require("../../assets/icons/salad.png")}
          style={styles.imageIcon}
        />
      );
    }
    return lifePoints;
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
              source={require("../../assets/icons/donut.png")}
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
          source={require("../../assets/icons/donut.png")}
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

  const convertNumToText = (num) => {
    switch (num) {
      case 1:
        return "1 (Một)";
      case 2:
        return "2 (Hai)";
      case 3:
        return "3 (Ba)";
      case 4:
        return "4 (Bốn)";
      case 5:
        return "5 (Năm)";
      case 6:
        return "6 (Sáu)";
      case 7:
        return "7 (Bảy)";
      case 8:
        return "8 (Tám)";
      case 9:
        return "9 (Chín)";
      default:
        break;
    }
  };

  const handleRightAnswer = () => {
    setQuestion("Đúng rồi!");
  };

  const handleWrongAnswer = () => {
    setQuestion("Sai rồi!");

    const newLifePoint = lifePoint - 1;
    setLifePoint(newLifePoint);
    console.log("LP", lifePoint);
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
      const text = convertNumToText(answer);
      buttons.push(
        <View style={{ width: "30%" }}>
          <Button
            title={text}
            buttonStyle={styles.numberButton}
            onPress={() => handleChooseAnswer(answer)}
          ></Button>
        </View>
      );
    });
    return buttons;
  };

  const AnswerText = () => {
    const text = convertNumToText(numberOfItems);
    return <Text h1={true}>{text}</Text>;
  };

  const AnswerView = () => {
    if (isAnswered) {
      return AnswerText();
    }
    return AnswerButton();
  };

  const resetValue = () => {
    setNumberOfItems(randomNum);
    setIsAnswered(false);
    setQuestion("Có mấy cái bánh?");
  };

  return (
    <View style={{ backgroundColor: "#34A853", width: "100%", height: "100%" }}>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row" }}>{LifePoints()}</View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => PlayLocalSoundFile()}>
            <Image
              source={require("../../assets/icons/sushi.png")}
              style={styles.imageButton}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => resetValue()}>
            <Image
              source={require("../../assets/icons/location.png")}
              style={styles.imageButton}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 4 }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.title}>{question}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 4,
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
    fontSize: 30,
    fontWeight: "bold",
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
