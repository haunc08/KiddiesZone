import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, ImageBackground } from "react-native";
import { sizes } from "../../constants";
import { NoScrollView, Space } from "../../components/Wrapper";
import { ImageButton } from "../../components/Button";
import { ImageManager, IconManager } from "../../utils/image";
import { Heading1 } from "../../components/Typography";
import YoutubePlayer from "react-native-youtube-iframe";
import Orientation from "react-native-orientation-locker";
import firestore from "@react-native-firebase/firestore";
import { CollectionName } from "../../utils/enum";
import { subtractArray } from "../../utils/string";

// const theaterSize = autoSize(ImageManager.movies, null, sizes.short);
const screenHeight = sizes.short * 0.695;
const screenWidth = screenHeight * 1.76;

export const Movies = ({ navigation, route }) => {
  const { child, gameKey, playedTime } = route.params;

  const [playing, setPlaying] = useState(false);
  const [currentList, setCurrentList] = useState([]);
  const [filter, setFilter] = useState("new");
  const [index, setIndex] = useState(0);

  // firebase
  const childDataRef = useRef();

  const gameData = useRef();
  const childData = useRef();
  const currentURL = useRef(); //to handle finish callback

  const fetchMovies = () => {
    firestore()
      .collection(CollectionName.GAMES)
      .where("key", "==", gameKey)
      .get()
      .then((querySnapshot) => {
        const doc = querySnapshot.docs[0];
        const res = { ...doc.data(), _id: doc.id };
        // console.log("game44444444444", temp.videos);
        gameData.current = res;
        // setCurrentList(gameData.current.videos);
        fetchChildGameData();
      });
  };

  const fetchChildGameData = () => {
    console.log("gamedata666666666666666666666666", gameData);
    console.log("child7777777777777777777777777777", child);
    childDataRef.current = firestore()
      .collection(CollectionName.GAMES)
      .doc(gameData.current._id)
      .collection(CollectionName.CHILD_GAME_DATA)
      .doc(child?._id);

    childDataRef.current.get().then((doc) => {
      const res = { ...doc.data(), _id: doc.id };
      console.log("child dataaaaaaaaaaaaaaa", res);
      childData.current = res;
    });
    filterAndSetCurrentList();
  };

  const updateWatched = () => {
    console.log("update watched 99999", currentURL.current);
    childDataRef.current.get().then((doc) => {
      const watched = doc.data().watched;
      if (watched) {
        // console.log("watchedddddd", watched);
        if (watched.some((v) => v === currentURL.current)) {
          // console.log("existtttttttttttttt");
          return;
        }
      }

      childDataRef.current.set(
        {
          watched: [],
        },
        { merge: true }
      );

      childDataRef.current.update({
        watched: [...watched, currentURL.current],
      });
    });
    // firestore().collection(CollectionName);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const filterAndSetCurrentList = () => {
    childDataRef.current.get().then((doc) => {
      const watched = doc.data().watched;
      switch (filter) {
        case "new":
          setCurrentList(subtractArray(watched, gameData?.current?.videos));
          break;
        case "watched":
          setCurrentList(watched?.reverse());
      }
    });
  };

  useEffect(() => {
    if (currentList) {
      currentURL.current = currentList[index];
      console.log("curentUELLLLLLLLL", currentURL.current);
    }
  }, [currentList, index]);

  useEffect(() => {
    if (!childDataRef.current) return;
    filterAndSetCurrentList();
    // console.log("watched...........", watched);

    // setCurrentList(gameData?.current?.videos);
    // switch (filter) {
    //   case "new":
    //     setCurrentList(
    //       videos?.current?.filter((video) => video.watched === false)
    //     );
    //     // carouselRef.current.snapToItem(0, false);
    //     break;
    //   case "watched":
    //     setCurrentList(
    //       videos?.current?.filter((video) => video.watched === true)
    //     );
    //     // carouselRef.current.snapToItem(0, false);
    //     break;
    // }
    setIndex(0);
  }, [filter]);

  const onStateChange = useCallback(
    (state) => {
      if (state === "ended") {
        console.log("index................", index);

        setPlaying(false);
        updateWatched();
      }
      if (state === "playing") {
        // const currentVideo = gameData?.current?.videos.findIndex(
        //   (vid) => vid === currentList[index]
        // );
        // console.log("playing", data[temp]);
        // if (data[temp].watched === false) data[temp].watched = true;
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
            source={IconManager.whitestar}
          />
          <ImageButton
            width={45}
            onPress={() => setFilter("watched")}
            disable={filter !== "watched"}
            source={IconManager.history}
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
              source={IconManager.movies.previousgold}
            />
            <Heading1 white>{`${index + 1}/${
              currentList?.length || 1
            }`}</Heading1>
            <ImageButton
              width={45}
              block={index >= currentList?.length - 1}
              onPress={() => setIndex(index + 1)}
              source={IconManager.movies.nextgold}
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
          source={IconManager.home}
        />
      </View>

      <ImageBackground
        source={ImageManager.movies}
        style={{
          // resizeMode: "cover",
          position: "absolute",
          // width: theaterSize.width,
          // height: theaterSize.height,
          width: sizes.long,
          height: sizes.short,
          backgroundColor: "transparent",
          zIndex: 0,
          alignSelf: "stretch",
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
        {currentList ? (
          <YoutubePlayer
            height={screenHeight}
            width={screenWidth}
            play={playing}
            videoId={currentList[index]}
            onChangeState={onStateChange}
            onFullScreenChange={onFullScreenChange}
            webViewProps={{
              // allowsInlineMediaPlayback: false,
              allowsFullscreenVideo: true,
              androidLayerType: "hardware", // <- SOLUTION
              // androidHardwareAccelerationDisabled: true, // <-- PROBLEM
            }}
          />
        ) : (
          <Heading1
            white
            style={{ alignSelf: "center", marginTop: sizes.short / 4 }}
          >
            Trống
          </Heading1>
        )}
      </View>
    </NoScrollView>
  );
};

export default Movies;
