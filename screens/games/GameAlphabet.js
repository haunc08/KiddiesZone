import React, { useEffect, useState } from "react";
import { ImageBackground } from "react-native";
import { Image } from "react-native";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import Orientation from "react-native-orientation-locker";
import { ImageButton } from "../../components/Button";
import { colors, sizes } from "../../constants";
import {
  IconManager,
  getImage,
  ImageManager,
  autoSize,
} from "../../utils/image";
import { playSoundFile } from "../../utils/sound";

const GameAlphabet = ({ navigation }) => {
  const [question, setQuestion] = useState("Chữ này là chữ gì?");
  const [isAnswered, setIsAnswered] = useState(false);

  const lowercaseLetters = [
    "a",
    "aw",
    "aa",
    // "b",
    // "c",
    // "d",
    // "dd",
    // "e",
    // "ee",
    // "g",
    // "h",
    // "i",
    // "k",
    // "l",
    // "m",
    // "n",
    // "o",
    // "oo",
    // "ow",
    // "p",
    // "q",
    // "r",
    // "s",
    // "t",
    // "u",
    // "uw",
    // "v",
    // "x",
    // "y",
  ];
  const uppercaseLetters = lowercaseLetters.map((letter) =>
    letter.toUpperCase()
  );

  const randomLetterIndex = Math.floor(Math.random() * lowercaseLetters.length);
  const [chosenLetterIndex, setChosenLetterIndex] = useState(randomLetterIndex);

  useEffect(() => {
    Orientation.lockToLandscapeLeft();
  }, []);

  // return image on the left
  const getAlphabetImage = (index) => {
    return ImageManager.alphabet[`letter${uppercaseLetters[index]}`];
  };

  // return letters on the right
  const getAlphabet = (index) => {
    return ImageManager.alphabet[`${lowercaseLetters[index]}`];
  };

  const getAnswerIndexes = () => {
    let letters = [chosenLetterIndex];

    while (letters.length < 3) {
      const ranIndex = Math.floor(Math.random() * lowercaseLetters.length);
      if (!letters.includes(ranIndex)) {
        letters.push(ranIndex);
      }
    }

    // shuffle array
    letters = letters.sort(() => Math.random() - 0.5);

    return letters;
  };

  const handleRightAnswer = () => {
    playSoundFile("yayy");
    setQuestion("Đúng rồi!");
  };

  const handleWrongAnswer = () => {
    playSoundFile("lose");
    setQuestion("Sai rồi!");
  };

  const handleChooseAnswer = (answerIndex) => {
    if (answerIndex === chosenLetterIndex) {
      handleRightAnswer();
    } else {
      handleWrongAnswer();
    }
    setIsAnswered(true);
  };

  const AnswerButtons = () => {
    const buttons = [];
    const answerIndexes = getAnswerIndexes();

    answerIndexes.map((index) => {
      const path = getAlphabet(index);
      buttons.push(
        <View
          style={{
            width: "30%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <ImageButton
            style={{ marginBottom: 16 }}
            onPress={() => handleChooseAnswer(index)}
            source={path}
          ></ImageButton>
          {/* <Text>{lowercaseLetters[index]}</Text>
          <Text>{uppercaseLetters[index]}</Text> */}
        </View>
      );
    });
    return buttons;
  };

  const AnswerImage = () => {
    const imagePath = getAlphabet(chosenLetterIndex);
    return (
      <TouchableOpacity style={{ alignItems: "center" }} onPress={() => {}}>
        <Image
          style={{
            width: 150,
            height: 150,
            opacity: 1,
          }}
          source={imagePath}
        />
        {/* <Text>{lowercaseLetters[chosenLetterIndex]}</Text>
        <Text>{uppercaseLetters[chosenLetterIndex]}</Text> */}
      </TouchableOpacity>
    );
  };

  const AnswerView = () => {
    if (isAnswered) {
      return AnswerImage();
    }
    return AnswerButtons();
  };

  const resetValue = () => {
    const randomLetterIndex = Math.floor(
      Math.random() * lowercaseLetters.length
    );
    setChosenLetterIndex(randomLetterIndex);
    setIsAnswered(false);
    setQuestion("Chữ này là chữ gì?");
  };

  return (
    <ImageBackground
      style={{ backgroundColor: "white", width: "100%", height: "100%" }}
      source={ImageManager.alphabet.grid}
    >
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
            source={IconManager.playButton}
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
            <Image
              source={getAlphabetImage(chosenLetterIndex)}
              style={{
                ...styles.alphabetImage,
                resizeMode: "contain",
                height: autoSize(
                  getAlphabetImage(chosenLetterIndex),

                  null,
                  sizes.short / 1.5
                ).height,
              }}
            />
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
    </ImageBackground>
  );
};

export default GameAlphabet;

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
  alphabetImage: {
    // width: "60%",
    // height: "90%",
    marginTop: -32,
    marginLeft: 16,
  },
  // mediumCountingItem: {
  //   width: 60,
  //   height: 60,
  //   marginLeft: 16,
  // },
  // smallCountingItem: {
  //   width: 45,
  //   height: 45,
  //   marginLeft: 16,
  // },
  // numberButton: {
  //   //width: "50%",
  //   marginBottom: 16,
  // },
});
