import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import Animated, { Easing } from "react-native-reanimated";
import { ImageButton } from "../../components/Button";
import { Frame } from "../../components/Wrapper";
import { sizes } from "../../constants";
import { IconManager, ImageManager } from "../../utils/image";

const calcMarginVertical = (flex) => {
  return (sizes.short * flex) / 5;
};

const calcMarginHorizontal = (flex) => {
  return (sizes.long * flex) / 5;
};

const Trash = ({ onPress }) => {
  const [isCleaned, setIsCleaned] = useState(false);

  const randomHorizontal = Math.random() * 4.5;
  const trashLeft = calcMarginHorizontal(randomHorizontal);

  const initialBottom = 4;
  const bottomAnim = useRef(
    new Animated.Value(calcMarginVertical(initialBottom))
  ).current;

  const minPos = 0;
  const maxPos = 2;
  const stopBottom = Math.random() * (maxPos - minPos) + minPos;

  useEffect(() => {
    animate();
  }, [bottomAnim]);

  const animate = () => {
    bottomAnim.setValue(calcMarginVertical(initialBottom));
    Animated.timing(bottomAnim, {
      toValue: calcMarginVertical(stopBottom),
      duration: 3000,
      easing: Easing.linear,
    }).start();
  };

  return (
    <Animated.View
      style={{ position: "absolute", bottom: bottomAnim, left: trashLeft }}
    >
      <ImageButton small source={ImageManager.alphabet.a} onPress={onPress} />
    </Animated.View>
  );
};

const TrashRain = ({ numberOfItems }) => {
  const [trashItems, setTrashItems] = useState([]);

  let items = [];

  const createItems = () => {
    for (let i = 0; i < numberOfItems; i++) {
      items.push(<Trash />);
    }
    return items;
  };

  createItems();

  return <View style={{ width: "100%", height: "100%" }}>{items}</View>;
};

const TrashGame = ({ navigation }) => {
  return (
    <Frame background={ImageManager.ground}>
      <View
        style={{
          position: "absolute",
          top: calcMarginVertical(0),
          left: calcMarginHorizontal(0),
          margin: 16,
        }}
      >
        <ImageButton
          small
          source={IconManager.back}
          onPress={() => navigation.goBack()}
        />
      </View>
      {/* {TrashRain()} */}
      <TrashRain numberOfItems={5} />
    </Frame>
  );
};

export default TrashGame;
