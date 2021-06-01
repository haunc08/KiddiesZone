import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, StatusBar, Text, ImageBackground, Image } from "react-native";
import { colors, sizes } from "../../constants";
import { Frame, NoScrollView, Space } from "../../components/Wrapper";
import { ImageButton, StoryObject } from "../../components/Button";
import { createSound } from "../../utils/sound";
import { ImageManager, appIcon, autoSize } from "../../utils/image";
import { Heading1 } from "../../components/Typography";
import Carousel from "react-native-snap-carousel";
import YoutubePlayer from "react-native-youtube-iframe";
import Orientation from "react-native-orientation-locker";

const theaterSize = autoSize(ImageManager.movies, null, sizes.short);
const screenHeight = sizes.short * 0.64;
const screenWidth = screenHeight * 1.76;

var data = [
  {
    url: "3M4tJcWXQQE",
    watched: false,
  },
  {
    url: "JOhZ9UwXN5I",
    watched: false,
  },
  {
    url: "A_lfg_A8HBo",
    watched: false,
  },
  {
    url: "SQj4L97HPwI",
    watched: false,
  },
  {
    url: "bFQxhUewke8",
    watched: false,
  },
  {
    url: "JLduNG-6UKg",
    watched: true,
  },
  {
    url: "nvBi2lFs4bo",
    watched: true,
  },
  {
    url: "AFeNKKsk-tI",
    watched: true,
  },
  {
    url: "j1n5tPkAaQc",
    watched: true,
  },
];

export const Movies = ({ navigation }) => {
  const [playing, setPlaying] = useState(false);
  const [currentList, setCurrentList] = useState(data);
  const [filter, setFilter] = useState("new");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    switch (filter) {
      case "new":
        setCurrentList(data.filter((video) => video.watched === false));
        // carouselRef.current.snapToItem(0, false);
        break;
      case "watched":
        setCurrentList(data.filter((video) => video.watched === true));
        // carouselRef.current.snapToItem(0, false);
        break;
    }
    setIndex(0);
  }, [filter]);

  const onStateChange = useCallback(
    (state) => {
      if (state === "ended") {
        setPlaying(false);
      }
      if (state === "playing") {
        const temp = data.findIndex(
          (movie) => movie.url === currentList[index].url
        );
        console.log("playing", data[temp]);
        if (data[temp].watched === false) data[temp].watched = true;
      }
    },
    [index]
  );

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const onFullScreenChange = () => {
    Orientation.lockToLandscapeLeft();
  };

  useEffect(() => {
    Orientation.lockToLandscapeLeft();
  }, []);

  const goHome = () => {
    navigation.goBack();
  };

  return (
    <NoScrollView
      bgColor="black"
      style={{
        padding: 0,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <View
        style={{
          // alignSelf: "stretch",
          // flexDirection: "row-reverse",
          padding: sizes.base * 2,
          zIndex: 3,
          alignSelf: "flex-start",
          position: "absolute",
        }}
      >
        <Space loose>
          <ImageButton
            width={45}
            onPress={() => setFilter("new")}
            disable={filter !== "new"}
            source={appIcon.whitestar}
          />
          <ImageButton
            width={45}
            onPress={() => setFilter("watched")}
            disable={filter !== "watched"}
            source={appIcon.history}
          />
        </Space>
      </View>
      <View
        style={{
          // alignSelf: "stretch",
          // flexDirection: "row-reverse",
          padding: sizes.base,
          zIndex: 32,
          height: sizes.short,
          justifyContent: "flex-end",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Space loose>
            <ImageButton
              width={45}
              block={index <= 0}
              onPress={() => setIndex(index - 1)}
              source={appIcon.movies.previousgold}
            />
            <Heading1 white>{`${index + 1}/${currentList.length}`}</Heading1>
            <ImageButton
              width={45}
              block={index >= currentList.length - 1}
              onPress={() => setIndex(index + 1)}
              source={appIcon.movies.nextgold}
            />
          </Space>
        </View>
      </View>
      <View
        style={{
          // alignSelf: "stretch",
          // flexDirection: "row-reverse",
          padding: sizes.base * 2,
          zIndex: 3,
          alignSelf: "flex-end",
          position: "absolute",
        }}
      >
        <ImageButton
          width={45}
          onPress={() => goHome()}
          source={appIcon.home}
        />
      </View>

      <ImageBackground
        source={ImageManager.movies}
        style={{
          position: "absolute",
          width: theaterSize.width,
          height: theaterSize.height,
          backgroundColor: "transparent",
          zIndex: 0,
          alignSelf: "center",
        }}
      />

      <View
        style={{
          ...sizes.fulllandscape,
          position: "absolute",
          zIndex: 32,
          height: screenHeight,
          width: screenWidth,
        }}
      >
        <YoutubePlayer
          height={screenHeight}
          width={screenWidth}
          play={playing}
          videoId={currentList[index].url}
          onChangeState={onStateChange}
          onFullScreenChange={onFullScreenChange}
          webViewProps={{
            // allowsInlineMediaPlayback: false,
            allowsFullscreenVideo: true,
            androidLayerType: "hardware", // <- SOLUTION
            // androidHardwareAccelerationDisabled: true, // <-- PROBLEM
          }}
        />
      </View>
    </NoScrollView>
  );
};

export default Movies;
