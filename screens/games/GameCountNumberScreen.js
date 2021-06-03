import React, { useEffect, useState } from "react";
import { Image, View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import Orientation from "react-native-orientation-locker";
import { ImageButton } from "../../components/Button";
import ImageManager, { IconManager } from "../../utils/image";
import { playSoundFile } from "../../utils/sound";

const GameCountNumberScreen = ({ navigation }) => {
  // const [lifePoint, setLifePoint] = useState(3);
  const [question, setQuestion] = useState("Có mấy cái bánh?");
  const [isAnswered, setIsAnswered] = useState(false);

  // random from 1 to 9
  const randomNum = Math.floor(Math.random() * 9) + 1;
  const [numberOfItems, setNumberOfItems] = useState(randomNum);

  useEffect(() => {
    Orientation.lockToLandscapeLeft();
  }, []);

  // const LifePoints = () => {
  //   let lifePoints = [];
  //   for (let i = 0; i < lifePoint; i++) {
  //     lifePoints.push(
  //       <Image
  //         key={i}
  //         source={require("../../assets/icons/salad.png")}
  //         style={styles.imageIcon}
  //       />
  //     );
  //   }
  //   return lifePoints;
  // };

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

  const convertNumToImage = (num) => {
    switch (num) {
      case 1:
        return ImageManager.number.one;
      case 2:
        return ImageManager.number.two;
      case 3:
        return ImageManager.number.three;
      case 4:
        return ImageManager.number.four;
      case 5:
        return ImageManager.number.five;
      case 6:
        return ImageManager.number.six;
      case 7:
        return ImageManager.number.seven;
      case 8:
        return ImageManager.number.eight;
      case 9:
        return ImageManager.number.nine;
      default:
        break;
    }
  };

  const handleRightAnswer = () => {
    playSoundFile("yayy");
    setQuestion("Đúng rồi!");
  };

  const handleWrongAnswer = () => {
    playSoundFile("lose");
    setQuestion("Sai rồi!");

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
      const path = convertNumToImage(answer);
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
    const imagePath = convertNumToImage(numberOfItems);
    return (
      <TouchableOpacity
        style={{ alignItems: "center" }}
        onPress={() => playSoundFile(`no${numberOfItems}`)}
      >
        <Image
          style={{
            width: 150,
            height: 150,
            opacity: 1,
          }}
          source={imagePath}
        />
      </TouchableOpacity>
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
    setNumberOfItems(ranNum);
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
        <View style={{ marginLeft: 16 }}>
          <ImageButton
            small
            source={IconManager.back}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={styles.title}>{question}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <ImageButton
            small
            style={{ marginRight: 16 }}
            onPress={() => resetValue()}
            source={require("../../assets/icons/play-button.png")}
          ></ImageButton>
        </View>
      </View>
      <View style={{ flex: 4 }}>
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
