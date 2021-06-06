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
import { Heading1 } from "../../components/Typography";
import Carousel from "react-native-snap-carousel";
import YoutubePlayer from "react-native-youtube-iframe";
import Orientation from "react-native-orientation-locker";

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
      clear: false,
    };
  }
  const startPosition = 2.9;
  const stopPosition = -2.9;
  const duration = 3000;
  const anim = new Animated.Value(startPosition);
  // const anim2 = new Animated.Value(startPosition);
  const [item, setItem] = useState(createItem());
  // const [item2, setItem2] = useState(createItem());
  // const [item3, setItem3] = useState(createItem());
  // const [loop1, setLoop1] = useState(0);
  // const [loop2, setLoop2] = useState(0);
  // const [loop3, setLoop3] = useState(0);
  // let index = 0;

  // const changeIndex1 = () => {
  //   setIndex1(1);
  // };

  // const changeIndex2 = () => {
  //   setIndex2(1);
  // };

  const play = () => {
    // setLoop1(1 - loop1);
    Animated.timing(anim1, {
      toValue: stopPosition,
      duration: duration,
      useNativeDriver: true,
      easing: Easing.linear,
    }).start(() => {
      anim1.setValue(startPosition);

      // changeIndex1();
      // setItem1(createItem());
    });
  };

  const play2 = () => {
    Animated.timing(anim2, {
      toValue: stopPosition,
      duration: duration,
      useNativeDriver: true,
      easing: Easing.linear,
      delay: duration / 2,
    }).start(() => {
      index = 2;
      anim2.setValue(startPosition);
      play2();
      setLoop2(1 - loop2);

      // anim2.setValue(startPosition);
      // changeIndex2();
      // setItem2(createItem());
    });
  };
  // const play3 = () => {
  //   Animated.timing(anim3, {
  //     toValue: stopPosition,
  //     duration: duration,
  //     useNativeDriver: true,
  //     easing: Easing.linear,
  //     delay: (duration / 3) * 2,
  //   }).start(() => {
  //     anim3.setValue(startPosition);
  //     setItem3(createItem());
  //   });
  //   setLoop3(1 - loop3);
  // };

  useEffect(() => {
    play1();
    play2();
  }, []);
  // useEffect(() => {
  //   play1();
  // }, [loop1]);
  // useEffect(() => {
  //   play2();
  // }, [loop2]);
  // useEffect(() => {
  //   play3();
  // }, [loop3]);

  // useEffect(() => {
  //   play1();
  // }, [index1]);

  // useEffect(() => {
  //   play2();
  // }, [index2]);
  // useEffect(() => {
  //   play3();
  // }, [item3]);

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
            // setIndex(1);
          }}
        />
        <GameObject
          image={ImageManager.shapes.squareShape}
          height={1.1}
          transY={1.6}
        />
        <GameObject
          image={ImageManager.shapes.triangleShape}
          height={1.1}
          transY={1.6}
          transX={1}
        />
        <GameObject
          image={ImageManager.shapes.beltback}
          width={5}
          transY={-0.9}
          disable
        />
        <GameObject
          image={data[item.shape][item.shape]}
          height={0.9}
          transY={-0.96}
          transX={anim}
        />
        {/* <GameObject
          image={data[item2.shape][index]}
          height={0.9}
          transY={-0.96}
          transX={anim2}
        /> */}
        {/* <GameObject
          image={data[item3.shape][item3.index]}
          height={0.9}
          transY={-0.96}
          transX={anim3} 
        /> */}
        <GameObject
          image={ImageManager.shapes.beltfront}
          width={5}
          transY={-0.9}
        />
      </Frame>
    </NoScrollView>
  );
};

export default Shapes;
