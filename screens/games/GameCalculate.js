import React, { useEffect, useState } from "react";
import { Button, Image, StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ImageButton } from "../../components/Button";
import { colors } from "../../constants";
import {
  autoSize,
  getRandomGameItem,
  IconManager,
  ImageManager,
} from "../../utils/image";
import { playSoundFile } from "../../utils/sound";

const GameCalculate = ({ route, navigation }) => {
  const { gameType } = route.params;

  const [mode, setMode] = useState("easy");

  const [question, setQuestion] = useState("Phép tính này ra bao nhiêu?");
  const [xItems, setXItems] = useState(0);
  const [yItems, setYItems] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [imagePath, setImagePath] = useState();

  useEffect(() => {
    const randomX = Math.floor(Math.random() * 10) + 1;
    setXItems(randomX);

    const randomY = Math.floor(Math.random() * 10) + 1;
    setYItems(randomY);

    const path = getRandomGameItem();
    setImagePath(path);
  }, []);

  const getItemStyle = (number) => {
    if (number <= 6) {
      return styles.mediumCountingItem;
    }
    return styles.smallCountingItem;
  };

  const getCalculatingSign = () => {
    switch (gameType) {
      case "Add":
        return IconManager.add;
      case "Substract":
        return IconManager.substract;
      default:
        break;
    }
  };

  const calcAnswer = () => {
    switch (gameType) {
      case "Add":
        return xItems + yItems;
      case "Subtract":
        return xItems - yItems;
      default:
        break;
    }
  };

  const getAnswers = () => {
    let answer = [0, 0, 0];

    const rightAnswer = calcAnswer();
    const rightAnswerIndex = Math.floor(Math.random() * 3);
    // ko can 3 nhung phai chay random tu 0 den 3 de xac suat ra 2 nhieu hon
    // random ra tu 0 den 1 nen chi ra 3 khi random = 1
    if (rightAnswerIndex === 3) {
      rightAnswerIndex--;
    }
    answer[rightAnswerIndex] = rightAnswer;

    while (answer.includes(0)) {
      const index = answer.indexOf(0);
      const ranNum = Math.floor(Math.random() * 20) + 1;

      if (!answer.includes(ranNum)) {
        answer[index] = ranNum;
      }
    }
    return answer;
  };

  const handleRightAnswer = () => {
    playSoundFile("yayy");
    setQuestion("Đúng rồi!");
  };

  const handleWrongAnswer = () => {
    playSoundFile("lose");
    setQuestion("Sai rồi!");
  };

  const handleChooseAnswer = (answer) => {
    if (answer === calcAnswer()) {
      handleRightAnswer();
    } else {
      handleWrongAnswer();
    }
    setIsAnswered(true);
  };

  const resetValue = () => {
    const ranX = Math.floor(Math.random() * 10) + 1;
    setXItems(ranX);
    const ranY = Math.floor(Math.random() * 10) + 1;
    setYItems(ranY);

    setIsAnswered(false);
    setQuestion("Phép tính này ra bao nhiêu?");

    const path = getRandomGameItem();
    setImagePath(path);
  };

  const Number = ({ numberOfItems }) => {
    const numbers = numberOfItems.toString().split("");

    return (
      <View style={{ flex: 5, alignItems: "center" }}>
        <TouchableOpacity
          style={{ alignItems: "center", flexDirection: "row" }}
          onPress={() => playSoundFile(`no${numberOfItems}`)}
        >
          {numbers.map((number) => {
            const numPath = ImageManager.number[`${number}`];
            return (
              <Image
                style={{
                  resizeMode: "contain",
                  width: autoSize(numPath, 100, null).width,
                  height: autoSize(numPath, 100, null).height,
                  marginHorizontal: -16,
                }}
                source={numPath}
              />
            );
          })}
        </TouchableOpacity>
      </View>
    );
  };

  const CountingItems = ({ numberOfItems, imagePath }) => {
    let items = [];
    let itemStyle = getItemStyle(numberOfItems);

    // neu lam vay thi khi chon dap an xong no render lai se ra cac item khac
    const itemPath = getRandomGameItem();

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
              source={imagePath}
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
          source={imagePath}
          style={itemStyle}
        />
      );
    }
    items.push(
      <View style={{ flexDirection: "row", marginBottom: 16 }}>{itemRow}</View>
    );
    return (
      <View
        style={{
          flexDirection: "column",
          flex: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {items}
      </View>
    );
  };
  const CalculationView = ({ imagePath }) => {
    const signPath = getCalculatingSign();

    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          padding: 16,
        }}
      >
        {mode === "easy" ? (
          <CountingItems numberOfItems={xItems} imagePath={imagePath} />
        ) : (
          <Number numberOfItems={xItems} />
        )}
        <Image
          source={signPath}
          style={{
            flex: 1,
            resizeMode: "contain",
            width: autoSize(signPath, 60, null).width,
            height: autoSize(signPath, 60, null).height,
            marginHorizontal: 16,
          }}
        />
        {mode === "easy" ? (
          <CountingItems numberOfItems={yItems} imagePath={imagePath} />
        ) : (
          <Number numberOfItems={yItems} />
        )}
        <Image
          source={IconManager.equal}
          style={{
            flex: 1,
            resizeMode: "contain",
            width: autoSize(signPath, 60, null).width,
            height: autoSize(signPath, 60, null).height,
            marginHorizontal: 16,
          }}
        />
      </View>
    );
  };

  const AnswerButton = () => {
    const buttons = [];
    const answers = getAnswers();

    answers.map((answer) => {
      const numbers = answer.toString().split("");

      buttons.push(
        <TouchableOpacity
          style={{
            flexDirection: "row",
            marginVertical: 16,
          }}
          onPress={() => handleChooseAnswer(answer)}
        >
          {numbers.map((number) => {
            const numPath = ImageManager.number[`${number}`];
            return <Image style={styles.imageButton} source={numPath} />;
          })}
        </TouchableOpacity>
      );
    });
    return buttons;
  };

  const AnswerImage = () => {
    const rightAnswer = calcAnswer();
    const numbers = rightAnswer.toString().split("");

    return (
      <TouchableOpacity
        style={{ alignItems: "center", flexDirection: "row" }}
        onPress={() => playSoundFile(`no${rightAnswer}`)}
      >
        {numbers.map((number) => {
          const numPath = ImageManager.number[`${number}`];
          return (
            <Image
              style={{
                resizeMode: "contain",
                width: autoSize(numPath, 100, null).width,
                height: autoSize(numPath, 100, null).height,
                marginHorizontal: -16,
              }}
              source={numPath}
            />
          );
        })}
      </TouchableOpacity>
    );
  };

  const AnswerView = () => {
    if (isAnswered) {
      return AnswerImage();
    }
    return AnswerButton();
  };

  return (
    <View
      style={{
        backgroundColor: "#34A853",
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
            <TouchableOpacity
              style={{
                marginRight: 16,
                width: 80,
                alignItems: "center",
                borderRadius: 12,
                backgroundColor: mode === "easy" ? colors.green : "green",
              }}
              onPress={() => setMode("easy")}
            >
              <Text style={{ fontSize: 24, fontWeight: "400" }}>Dễ</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginRight: 16,
                width: 80,
                alignItems: "center",
                borderRadius: 12,
                backgroundColor: mode === "hard" ? colors.green : "green",
              }}
              onPress={() => setMode("hard")}
            >
              <Text style={{ fontSize: 24, fontWeight: "400" }}>Khó</Text>
            </TouchableOpacity>
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
                flex: 3,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* {CalculationView()} */}
              <CalculationView imagePath={imagePath} />
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
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <View>
          <ImageButton
            small
            style={{ marginRight: 16 }}
            onPress={() => resetValue()}
            source={require("../../assets/icons/play-button.png")}
          ></ImageButton>
        </View>
      </View>
    </View>
  );
};

export default GameCalculate;

const styles = StyleSheet.create({
  imageIcon: {
    width: 45,
    height: 45,
    marginLeft: 16,
  },
  imageButton: {
    width: 45,
    height: 45,
    marginHorizontal: -4,
  },
  text: {
    fontSize: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  imageView: {
    width: 100,
    height: 100,
    marginHorizontal: -16,
  },
  mediumCountingItem: {
    width: 60,
    height: 60,
    marginHorizontal: 8,
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
  modeButton: {
    marginRight: 16,
    width: 80,
    alignItems: "center",
  },
});
