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

let currentIndex;

const data = [
  ImageManager.shapes.round,
  ImageManager.shapes.square,
  ImageManager.shapes.triangle,
];

export const Shapes = () => {
  const createItem = () => {
    return {
      shape: Math.floor(Math.random() * 3),
      index: Math.floor(Math.random() * 5),
    };
  };
  const startPosition = 2.9;
  const stopPosition = -2.9;
  const duration = 9000;
  const anim0 = useRef(new Animated.Value(startPosition)).current;
  const anim1 = useRef(new Animated.Value(startPosition)).current;
  const anim2 = useRef(new Animated.Value(startPosition)).current;
  const [item0, setItem0] = useState(createItem());
  const [item1, setItem1] = useState(createItem());
  const [item2, setItem2] = useState(createItem());
  const [correct0, setCorrect0] = useState(false);
  const [correct1, setCorrect1] = useState(false);
  const [correct2, setCorrect2] = useState(false);
  const [end0, setEnd0] = useState(false);
  const [end1, setEnd1] = useState(false);
  const [end2, setEnd2] = useState(false);

  const getCorrect = (no) => {
    switch (no) {
      case 0:
        return correct0;
      case 1:
        return correct1;
      case 2:
        return correct2;
    }
  };
  const play0 = () => {
    anim0.setValue(startPosition);
    Animated.timing(anim0, {
      toValue: stopPosition,
      duration: duration,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start((event) => {
      if (event.finished) {
        setEnd0(true);
        setItem0(createItem());
        setCorrect0(false);
        play0();
      }
    });
  };

  useEffect(() => {
    if (end0 === true)
      if (getCorrect(0) === false) {
        currentIndex = (currentIndex + 1) % 3;
      }
  }, [end0]);

  const play1 = () => {
    anim1.setValue(startPosition);
    Animated.timing(anim1, {
      // delay: duration / 3,
      toValue: stopPosition,
      duration: duration,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start((event) => {
      if (event.finished) {
        if (correct1 === false) {
          currentIndex = (currentIndex + 1) % 3;
        }
        setEnd1(true);
        setCorrect1(false);
        play1();
        setItem1(createItem());
      }
    });
  };

  useEffect(() => {
    if (end1 === true)
      if (getCorrect(1) === false) {
        currentIndex = (currentIndex + 1) % 3;
      }
  }, [end1]);

  const play2 = () => {
    anim2.setValue(startPosition);

    Animated.timing(anim2, {
      // delay: (duration / 3) * 2,
      toValue: stopPosition,
      duration: duration,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start((event) => {
      if (event.finished) {
        if (correct2 === false) {
          currentIndex = (currentIndex + 1) % 3;
        }
        setEnd2(true);
        setCorrect2(false);
        play2();
        setItem2(createItem());
      }
    });
  };

  useEffect(() => {
    if (end2 === true)
      if (getCorrect(2) === false) {
        currentIndex = (currentIndex + 1) % 3;
      }
  }, [end2]);

  useEffect(() => {
    play0();
    setTimeout(play1, duration / 3);
    setTimeout(play2, (duration / 3) * 2);
    currentIndex = 0;
  }, []);

  function handleSelect(shape) {
    switch (currentIndex) {
      case 0:
        if (item0.shape === shape && correct0 === false) {
          setCorrect0(true);
          currentIndex = (currentIndex + 1) % 3;
        }
        break;
      case 1:
        if (item1.shape === shape && correct1 === false) {
          setCorrect1(true);
          currentIndex = (currentIndex + 1) % 3;
        }
        break;
      case 2:
        if (item2.shape === shape && correct2 === false) {
          setCorrect2(true);
          currentIndex = (currentIndex + 1) % 3;
        }
        break;
    }
  }

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
          image={data[item0.shape][item0.index]}
          height={0.9}
          transY={-0.96}
          transX={anim0}
          disable
          correct={correct0}
        />
        <GameObject
          image={data[item1.shape][item1.index]}
          height={0.9}
          transY={-0.96}
          transX={anim1}
          disable
          correct={correct1}
        />
        <GameObject
          image={data[item2.shape][item2.index]}
          height={0.9}
          transY={-0.96}
          transX={anim2}
          disable
          correct={correct2}
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
