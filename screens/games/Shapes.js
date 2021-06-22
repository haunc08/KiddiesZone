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
import { Hearts } from "../../components/Indicator";
import { Heading1, Heading3 } from "../../components/Typography";

const data = [
  ImageManager.shapes.round,
  ImageManager.shapes.square,
  ImageManager.shapes.triangle,
];

export const Shapes = ({ navigation }) => {
  const createItem = () => {
    const temp = {
      shape: Math.floor(Math.random() * 3),
      index: Math.floor(Math.random() * 5),
      correct: false,
    };
    return temp;
  };
  const startPosition = 2.9;
  const stopPosition = -2.9;
  const duration = 6000;

  const anim0 = useRef(new Animated.Value(startPosition)).current;
  const anim1 = useRef(new Animated.Value(startPosition)).current;
  const anim2 = useRef(new Animated.Value(startPosition)).current;

  const [item0, setItem0] = useState(createItem());
  const item0ref = useRef();
  const [item1, setItem1] = useState(createItem());
  const item1ref = useRef();
  const [item2, setItem2] = useState(createItem());
  const item2ref = useRef();
  const currentItem = useRef(0);
  const [points, setPoints] = useState(0);
  const [lives, setLives] = useState(3);

  const increaseCurrentItem = () => {
    currentItem.current = (currentItem.current + 1) % 3;
  };

  useEffect(() => {
    item0ref.current = item0;
  }, [item0]);

  useEffect(() => {
    item1ref.current = item1;
  }, [item1]);

  useEffect(() => {
    item2ref.current = item2;
  }, [item2]);

  const play0 = () => {
    anim0.setValue(startPosition);
    Animated.timing(anim0, {
      toValue: stopPosition,
      duration: duration,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => {
      if (item0ref.current.correct === false) {
        setLives((prevlives) => prevlives - 1);
        increaseCurrentItem();
      }
      play0();
      setItem0(createItem());
    });
  };

  const play1 = () => {
    anim1.setValue(startPosition);
    Animated.timing(anim1, {
      toValue: stopPosition,
      duration: duration,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => {
      if (item1ref.current.correct === false) {
        setLives((prevlives) => prevlives - 1);
        increaseCurrentItem();
      }
      play1();
      setItem1(createItem());
    });
  };

  const play2 = () => {
    anim2.setValue(startPosition);
    Animated.timing(anim2, {
      toValue: stopPosition,
      duration: duration,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => {
      if (item2ref.current.correct === false) {
        setLives((prevlives) => prevlives - 1);
        increaseCurrentItem();
      }
      play2();
      setItem2(createItem());
    });
  };

  const play = () => {
    play0();
    setTimeout(play1, duration / 3);
    setTimeout(play2, (duration / 3) * 2);
  };

  useEffect(() => {
    play();
  }, []);

  function handleSelect(shape) {
    switch (currentItem.current) {
      case 0:
        if (shape === item0.shape) {
          setItem0((prevItem) => {
            const temp = { ...prevItem, correct: true };
            increaseCurrentItem();
            setPoints((prev) => prev + 1);
            return temp;
          });
        } else setLives((prev) => prev - 1);
        break;
      case 1:
        if (shape === item1.shape) {
          setItem1((prevItem) => {
            const temp = { ...prevItem, correct: true };
            increaseCurrentItem();
            setPoints((prev) => prev + 1);
            return temp;
          });
        } else setLives((prev) => prev - 1);

        break;
      case 2:
        if (shape === item2.shape) {
          setItem2((prevItem) => {
            const temp = { ...prevItem, correct: true };
            increaseCurrentItem();
            setPoints((prev) => prev + 1);
            return temp;
          });
        } else setLives((prev) => prev - 1);

        break;
    }
  }
  if (lives > 0)
    return (
      <NoScrollView
        style={{
          padding: 0,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
        imgSource={ImageManager.shapes.floor}
      >
        <Hearts lives={lives} points={points} />
        <View
          style={{
            flexDirection: "row-reverse",
            padding: sizes.base,
            zIndex: 32,
          }}
        >
          <ImageButton
            width={sizes.base * 4}
            onPress={() => navigation.goBack()}
            source={IconManager.buttons.orange.back}
          />
        </View>

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
            correct={item0.correct}
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
            image={ImageManager.shapes.beltfront}
            width={5}
            transY={-0.9}
            disable
          />
        </Frame>
      </NoScrollView>
    );
  return (
    <NoScrollView
      style={{
        padding: 0,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
      imgSource={ImageManager.shapes.blur}
    >
      <Frame>
        <ImageButton
          source={IconManager.buttons.orange.replay}
          height={sizes.base * 4.5}
          title="Điểm của bạn"
          onPress={() => {
            // setLives(3);
            // setPoints(0);
            // play();
            navigation.goBack();
            navigation.navigate("Shapes");
          }}
        />
        <Heading1 white>{points}</Heading1>
      </Frame>
    </NoScrollView>
  );
};

export default Shapes;
