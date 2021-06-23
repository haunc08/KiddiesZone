import React, { useEffect, useState, useRef } from "react";
import { Button, Image, StyleSheet, View, ImageBackground } from "react-native";
import { Text } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import Carousel from "react-native-snap-carousel";
import { AutoIcon, ImageButton } from "../../components/Button";
import { Hearts } from "../../components/Indicator";
import { Heading2, Heading1 } from "../../components/Typography";
import { Row } from "../../components/Wrapper";
import { colors, sizes } from "../../constants";
import {
  autoSize,
  getRandomGameItem,
  IconManager,
  ImageManager,
} from "../../utils/image";
import { playSoundFile } from "../../utils/sound";

const GameCalculate = ({ route, navigation }) => {
  const carouselMode = useRef();
  const gameType = useRef("Add");
  const points = useRef(0);
  const lives = useRef(3);

  const [mode, setMode] = useState();

  const [question, setQuestion] = useState("Hãy tính");
  const [xItems, setXItems] = useState(0);
  const [yItems, setYItems] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [imagePath, setImagePath] = useState();

  const newType = () => {
    const playAdd = Math.floor(Math.random() * 2);
    gameType.current = playAdd ? "Add" : "Subtract";
  };

  useEffect(() => {
    newType();
    const randomX = Math.floor(Math.random() * 10) + 1;
    const randomY = Math.floor(Math.random() * 10) + 1;
    if (gameType.current === "Subtract" && randomX < randomY) {
      setXItems(randomY);
      setYItems(randomX);
    } else {
      setXItems(randomX);
      setYItems(randomY);
    }

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
    switch (gameType.current) {
      case "Add":
        return IconManager.add;
      case "Subtract":
        return IconManager.subtract;
      default:
        break;
    }
  };

  const calcAnswer = () => {
    switch (gameType.current) {
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
    console.log("fucking answer", answer);
    return answer;
  };

  const handleRightAnswer = () => {
    playSoundFile("yayy");
    points.current = points.current + 1;
    setQuestion("Đúng rồi!");
  };

  const handleWrongAnswer = () => {
    if (lives.current <= 1) {
      playSoundFile("ouch");
    } else {
      playSoundFile("lose");
    }

    lives.current = lives.current - 1;

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

  const sortPair = (num1, num2) => {
    return {
      big: num1 > num2 ? num1 : num2,
      small: num1 < num2 ? num1 : num2,
    };
  };

  const resetValue = (currentLives) => {
    if (!currentLives) {
      points.current = 0;
      lives.current = 3;
    }
    const ranX = Math.floor(Math.random() * 10) + 1;
    const ranY = Math.floor(Math.random() * 10) + 1;
    newType();
    if (gameType.current === "Subtract" && ranX < ranY) {
      setXItems(ranY);
      setYItems(ranX);
    } else {
      setXItems(ranX);
      setYItems(ranY);
    }

    setIsAnswered(false);
    setQuestion("Hãy tính");

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
          {numbers.map((number, index) => {
            const numPath = ImageManager.number[`${number}`];
            return (
              <Image
                style={{
                  resizeMode: "contain",
                  width: autoSize(numPath, 100, null).width,
                  height: autoSize(numPath, 100, null).height,
                  transform: [{ translateX: index === 1 ? -15 : 0 }],
                  // marginHorizontal: -16,
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
          {numbers.map((number, index) => {
            const numPath = ImageManager.number[`${number}`];
            return (
              <AutoIcon
                width={100}
                source={numPath}
                style={{
                  ...styles.imageButton,
                  transform: [{ translateX: index === 1 ? -7 : 0 }],
                }}
              />
            );
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
        {numbers.map((number, index) => {
          const numPath = ImageManager.number[`${number}`];
          return (
            <AutoIcon
              width={100}
              source={numPath}
              style={{ transform: [{ translateX: index === 1 ? -15 : 0 }] }}
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

  const carouselWidth = sizes.long / 1.5;

  const modes = ["easy", "hard"];

  const modePreview = ({ item }) => {
    return (
      <ImageButton
        width={carouselWidth}
        source={ImageManager.calc[item]}
        onPress={() => setMode(item)}
      />
    );
  };
  if (!mode) {
    return (
      <ImageBackground
        style={{ flex: 1, alignItems: "flex-start", padding: sizes.base }}
        source={ImageManager.calc.background}
      >
        <View style={{ position: "absolute", padding: sizes.base }}>
          <ImageButton
            small
            source={IconManager.buttons.blue.home}
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={{ flex: 1, alignSelf: "stretch", alignItems: "center" }}>
          <Heading1
            color={colors.darkBlue}
            style={{ marginBottom: sizes.base }}
          >
            Chọn chế độ
          </Heading1>
          <Carousel
            ref={(c) => {
              carouselMode.current = c;
            }}
            data={modes}
            renderItem={modePreview}
            sliderWidth={sizes.long}
            itemWidth={carouselWidth}
            onSnapToItem={() => {}}
          />
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground
      style={{
        width: "100%",
        height: "100%",
        flexDirection: "row",
        display: "flex",
      }}
      source={ImageManager.calc.background}
    >
      <View style={{ flex: 10 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: sizes.base,
          }}
        >
          <View style={{ marginLeft: 16 }}>
            <ImageButton
              small
              source={IconManager.buttons.blue.home}
              onPress={() => navigation.goBack()}
            />
          </View>
          <Hearts points={points.current} lives={lives.current} />

          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={styles.title}>{question}</Text>
          </View>
          <ImageButton
            source={
              lives.current > 0
                ? IconManager.buttons.blue.play
                : IconManager.buttons.blue.replay
            }
            height={sizes.base * 5}
            onPress={() => resetValue(lives.current)}
            style={{
              marginTop: sizes.base,
              marginRight: sizes.base / 2,
              opacity: question === "Hãy tính" ? 0 : 1,
            }}
            block={question === "Hãy tính"}
          />
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
                flex: 4,
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
                marginRight: sizes.base * 3,
              }}
            >
              {AnswerView()}
            </View>
          </View>
        </View>
      </View>
      {/* <View
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
      </View> */}
    </ImageBackground>
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
    // marginHorizontal: -4,
  },
  text: {
    fontSize: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.darkBlue,
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
