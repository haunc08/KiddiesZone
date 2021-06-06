import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  StatusBar,
  Text,
  ImageBackground,
  Image,
  Animated,
  Easing,
} from "react-native";
import { colors, sizes } from "../../constants";
import { Frame, NoScrollView, Space } from "../../components/Wrapper";
import { GameObject, ImageButton, StoryObject } from "../../components/Button";
import { createSound } from "../../utils/sound";
import { ImageManager, IconManager, autoSize } from "../../utils/image";

export const Shapes = () => {
  const data = [
    ImageManager.shapes.round,
    ImageManager.shapes.square,
    ImageManager.shapes.triangle,
  ];
  function createItem() {
    return {
      shape: Math.floor(Math.random() * 3),
      index: Math.floor(Math.random() * 5),
      correct: false,
    };
  }
  const startPosition = 2.9;
  const stopPosition = -2.9;
  const duration = 3000;
  const anim1 = useRef(new Animated.Value(startPosition)).current;
  const anim2 = useRef(new Animated.Value(startPosition)).current;
  const anim3 = useRef(new Animated.Value(startPosition)).current;
  const [item1, setItem1] = useState(createItem());
  const [item2, setItem2] = useState(createItem());
  const [item3, setItem3] = useState(createItem());

  const play1 = () => {
    anim1.setValue(startPosition);

    Animated.timing(anim1, {
      toValue: stopPosition,
      duration: duration,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => {
      play1();
      setItem1(createItem());
    });
  };
  const play2 = () => {
    anim2.setValue(startPosition);
    Animated.timing(anim2, {
      // delay: duration / 3,
      toValue: stopPosition,
      duration: duration,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => {
      play2();
      setItem2(createItem());
    });
  };

  const play3 = () => {
    anim3.setValue(startPosition);

    Animated.timing(anim3, {
      // delay: (duration / 3) * 2,
      toValue: stopPosition,
      duration: duration,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => {
      play3();
      setItem3(createItem());
    });
  };

  useEffect(() => {
    play1();
    setTimeout(play2, duration / 3);
    setTimeout(play3, (duration / 3) * 2);
  }, []);

  function handleSelect(shape) {}

  return (
    <NoScrollView
      style={{ padding: 0, alignItems: "stretch" }}
      imgSource={ImageManager.shapes.floor}
    >
      <Frame>
        <GameObject
          image={ImageManager.shapes.roundShape}
          height={1.1}
          transY={1.6}
          transX={-1}
          onPress={() => {
            handleSelect(0);
          }}
        />
        <GameObject
          image={ImageManager.shapes.squareShape}
          height={1.1}
          transY={1.6}
          onPress={() => {
            handleSelect(1);
          }}
        />
        <GameObject
          image={ImageManager.shapes.triangleShape}
          height={1.1}
          transY={1.6}
          transX={1}
          onPress={() => {
            handleSelect(2);
          }}
        />
        <GameObject
          image={ImageManager.shapes.beltback}
          width={5}
          transY={-0.9}
          disable
        />
        <GameObject
          image={data[item1.shape][item1.index]}
          height={0.9}
          transY={-0.96}
          transX={anim1}
          disable
          correct={item1.correct}
        />
        <GameObject
          image={data[item2.shape][item2.index]}
          height={0.9}
          transY={-0.96}
          transX={anim2}
          disable
          correct={item2.correct}
        />
        <GameObject
          image={data[item3.shape][item3.index]}
          height={0.9}
          transY={-0.96}
          transX={anim3}
          disable
          correct={item3.correct}
        />
        <GameObject
          image={ImageManager.shapes.beltfront}
          width={5}
          transY={-0.9}
          disable
        />
      </Frame>
    </NoScrollView>
  );
};

export default Shapes;
