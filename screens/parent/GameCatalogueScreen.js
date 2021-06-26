import React, { useContext, useEffect, useRef, useState } from "react";

import { colors, sizes } from "../../constants";
import {
  Card,
  Row,
  ScreenView,
  Space,
  Impress,
  RoundImpress,
} from "../../components/Wrapper";
import { AutoIcon, Button } from "../../components/Button";
import { HorizontalList } from "../../components/HorizontalList";
import { ImageManager } from "../../utils/image";
import { View, TouchableOpacity, Switch } from "react-native";
import {
  Heading2,
  Body,
  Heading3,
  Heading1,
} from "../../components/Typography";
import ProgressChart from "../../components/Chart/ProgressChart";
import { hexToRgba, genderToColor } from "../../utils/color";
import Carousel from "react-native-snap-carousel";
import { LargeChildInfo } from "./TrackingScreen";
import LineChart from "../../components/Chart/LineChart";
import { FlatInput } from "./AddRecordScreen";

import firestore from "@react-native-firebase/firestore";
import { ChildrenContext } from "../../navigation/ParentNavigator";
import { CollectionName, GameType } from "../../utils/enum";
import { UserContext } from "../../App";
import { calcAge } from "../../utils/string";
import { getLast7Days } from "../../utils/time";
import { calcPlayedTimeInDay } from "../main/KidsZone";
import { Alert } from "react-native";
import { set } from "react-native-reanimated";

const dataColors = [colors.pink, colors.orange, colors.yellow];

const usageData = [
  {
    color: colors.purple,
  },
  {
    color: colors.pink,
  },
  {
    color: colors.orange,
  },
  {
    color: colors.yellow,
  },
];

export const ChildCard = ({ item, index, cardColor, textColor }) => {
  const scheme = genderToColor(item.gender);
  const isWhite = cardColor === colors.white;
  const age = calcAge(item.birthday.toDate());

  return (
    <View
      style={{
        justifyContent: "center",
      }}
    >
      <View
        style={{
          borderRadius: sizes.base,
          backgroundColor: cardColor || scheme,
          padding: sizes.base,
          alignItems: "center",
          paddingVertical: sizes.base * 2,
        }}
      >
        <Space>
          <RoundImpress color={isWhite ? scheme : colors.white}>
            <Heading1 color={isWhite ? colors.white : colors.black}>
              {age}
            </Heading1>
          </RoundImpress>
          <LargeChildInfo
            item={item}
            color={isWhite ? colors.grass : colors.white}
          />
        </Space>
      </View>
    </View>
  );
};

const LimitRow = ({
  current,
  color,
  representation,
  child,
  onChangeText,
  limit,
  onChangeCurText,
  curLimit,
}) => {
  const fetchChildGameData = async () => {
    console.log("fetch ag");
    await firestore()
      .collection(CollectionName.GAMES)
      .doc(representation?._id)
      .collection(CollectionName.CHILD_GAME_DATA)
      .doc(child?._id)
      .get()
      .then((childData) => {
        const limit = childData.data()?.timeLimit / 60;
        onChangeCurText(limit.toString());
      });
  };

  useEffect(() => {
    fetchChildGameData();
  }, [child]);
  console.log(curLimit);
  return (
    <Row style={{ marginBottom: -sizes.base * 0.75 }}>
      <Heading2
        style={{
          color: color,
          marginBottom: sizes.base,
          marginRight: sizes.base / 2,
        }}
      >
        {`${current ?? 0} trên tổng `}
      </Heading2>

      <FlatInput
        color={color}
        style={{
          fontSize: sizes.h2,
          paddingHorizontal: sizes.base / 2,
          paddingVertical: 0,
          flex: 1,
          textAlign: "left",
          fontWeight: "bold",
          marginTop: sizes.base / 4,
        }}
        // defaultValue={isNaN(curLimit) ? "" : curLimit}
        value={isNaN(limit) ? (isNaN(curLimit) ? "" : curLimit) : limit}
        keyboardType="numeric"
        onChangeText={onChangeText}
      />
      <Heading2
        style={{
          color: color,
          marginBottom: sizes.base,
          marginLeft: sizes.base,
        }}
      >
        phút
      </Heading2>
    </Row>
  );
};

export const GameCatalogueScreen = ({ navigation }) => {
  const user = useContext(UserContext);
  const children = useContext(ChildrenContext);

  const [curChild, setCurChild] = useState(null);
  const [games, setGames] = useState(null);

  const carouselChild = useRef();
  const curChildIndex = carouselChild.current?.currentIndex;

  const [storyPlayedTime, setStoryPlayedTime] = useState();
  const [gamePlayedTime, setGamePlayedTime] = useState();
  const [moviePlayedTime, setMoviePlayedTime] = useState();
  const allPlayedTime = storyPlayedTime + gamePlayedTime + moviePlayedTime;

  const [storyLimit, setStoryLimit] = useState();
  const [gameLimit, setGameLimit] = useState();
  const [movieLimit, setMovieLimit] = useState();

  const [curStoryLimit, setCurStoryLimit] = useState();
  const [curGameLimit, setCurGameLimit] = useState();
  const [curMovieLimit, setCurMovieLimit] = useState();

  const storyProgress = storyPlayedTime / curStoryLimit;
  const gameProgress = gamePlayedTime / curGameLimit;
  const movieProgress = moviePlayedTime / curMovieLimit;
  const progressData = [
    isNaN(storyProgress) ? 0 : storyProgress,
    isNaN(gameProgress) ? 0 : gameProgress,
    isNaN(movieProgress) ? 0 : movieProgress,
  ];

  const story = games
    ? games.find((game) => game?.type === GameType.STORY)
    : null;
  const game = games
    ? games.find((game) => game?.type === GameType.GAME)
    : null;
  const movie = games
    ? games.find((game) => game?.type === GameType.MOVIE)
    : null;

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    console.log("change child");
    fetchPlayedTime();
  }, [curChildIndex]);

  const fetchPlayedTime = async () => {
    await calcPlayedTimeInDay(
      GameType.STORY,
      children[curChildIndex]?._id
    ).then((res) => setStoryPlayedTime(Math.floor(res / 60)));
    await calcPlayedTimeInDay(
      GameType.GAME,
      children[curChildIndex]?._id
    ).then((res) => setGamePlayedTime(Math.floor(res / 60)));
    await calcPlayedTimeInDay(
      GameType.MOVIE,
      children[curChildIndex]?._id
    ).then((res) => setMoviePlayedTime(Math.floor(res / 60)));
  };

  const fetchGames = async () => {
    let listGames = [];
    await firestore()
      .collection(CollectionName.GAMES)
      .get()
      .then((res) =>
        res.docs.forEach((doc) =>
          listGames.push({ ...doc.data(), _id: doc.id })
        )
      );
    setGames(listGames);
  };

  const createChildGameData = async () => {
    for (const game of games) {
      const childGameDataRef = await firestore()
        .collection(CollectionName.GAMES)
        .doc(game?._id)
        .collection(CollectionName.CHILD_GAME_DATA)
        .doc(children[curChildIndex]?._id)
        .get();

      if (!childGameDataRef.data()) {
        // create child data if not have
        await childGameDataRef.ref
          .set({
            name: children[curChildIndex]?.name,
            timeLimit: 1800, // store seconds
          })
          .then(() =>
            console.log(
              `Create new child data and updated time limit for ${game?.type}`
            )
          )
          .catch((error) => console.log(error));
      }
    }
  };

  const toggleSwitch = async () => {
    if (!children[curChildIndex]?.isLimited) await createChildGameData();

    await firestore()
      .collection(CollectionName.USERS)
      .doc(user?.uid)
      .collection(CollectionName.CHILDREN)
      .doc(children[curChildIndex]?._id)
      .update({
        isLimited: !children[curChildIndex]?.isLimited,
      })
      .then(() => console.log("Updated isLimited"));
  };

  const handleSelectChild = (index) => {
    setCurChild(children[index]);
  };

  // check trung ko update de sau
  const updateTimeLimit = async (gameType, newLimit) => {
    if (!isNaN(newLimit)) {
      const validGames = games.filter((game) => game.type === gameType);

      for (const game of validGames) {
        const childGameDataRef = await firestore()
          .collection(CollectionName.GAMES)
          .doc(game?._id)
          .collection(CollectionName.CHILD_GAME_DATA)
          .doc(children[curChildIndex]?._id)
          .get();

        if (childGameDataRef.data()) {
          await childGameDataRef.ref
            .update({
              timeLimit: newLimit * 60, // store seconds
            })
            .then(() => console.log(`Updated time limit for ${gameType}`))
            .catch((error) => console.log(error));
        } else {
          // create child data if not have
          await childGameDataRef.ref
            .set({
              name: children[curChildIndex]?.name,
              timeLimit: newLimit * 60, // store seconds
            })
            .then(() =>
              console.log(
                `Create new child data and updated time limit for ${gameType}`
              )
            )
            .catch((error) => console.log(error));
        }
      }
    }
  };

  const handleSubmitLimit = async () => {
    console.log(storyLimit, gameLimit, movieLimit);
    if (isNaN(storyLimit) || isNaN(gameLimit) || isNaN(movieLimit)) {
      Alert.alert("Thông báo", "Giới hạn thời gian sử dụng phải là số.");
    } else {
      await updateTimeLimit(GameType.STORY, storyLimit);
      await updateTimeLimit(GameType.GAME, gameLimit);
      await updateTimeLimit(GameType.MOVIE, movieLimit);
      setCurStoryLimit(storyLimit);
      setCurGameLimit(gameLimit);
      setCurMovieLimit(movieLimit);
      Alert.alert(
        "Thông báo",
        "Cập nhật giới hạn thời gian sử dụng thành công."
      );
    }
  };

  return (
    <ScreenView
      isMainScreen
      title="Giải trí"
      navigation={navigation}
      // bgColor={"white"}
    >
      <Space loose>
        <View style={{ alignItems: "flex-end" }}>
          <AutoIcon
            width={sizes.short - sizes.base * 2}
            source={ImageManager.gokidpng}
          />
          <View style={{ position: "absolute" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("SelectChildScreen")}
              style={{ marginRight: sizes.base * 2, marginTop: sizes.base * 3 }}
            >
              <Impress color={colors.grass}>
                <Heading3 white style={{ fontSize: sizes.base + 5 }}>
                  Góc cho bé
                </Heading3>
              </Impress>
            </TouchableOpacity>
          </View>
        </View>
        {/* <Space>
          <Heading2>Danh sách game</Heading2>
          <HorizontalList data={games} />
        </Space> */}
        <Carousel
          ref={(c) => {
            carouselChild.current = c;
          }}
          data={children}
          renderItem={ChildCard}
          sliderWidth={sizes.short - sizes.base * 2}
          itemWidth={sizes.short - sizes.base * 2}
          onSnapToItem={handleSelectChild}
        />
        <Space>
          <Row style={{ justifyContent: "space-between" }}>
            <Heading2>Giới hạn sử dụng</Heading2>
            <Switch
              trackColor={{
                false: "#767577",
                true: hexToRgba(colors.primary, 0.25),
              }}
              thumbColor={
                children[curChildIndex]?.isLimited ? colors.primary : "#f4f3f4"
              }
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={children[curChildIndex]?.isLimited}
            />
          </Row>
          {children[curChildIndex]?.isLimited ? (
            <Card title="Hôm nay" style={{ alignItems: "center" }}>
              <ProgressChart
                data={progressData}
                width={sizes.short - sizes.base * 8}
                height={220}
                chartConfig={{
                  backgroundGradientFrom: "white",
                  backgroundGradientTo: "white",
                  color: (opacity = 1) => hexToRgba(colors.primary, opacity),
                  strokeWidth: 2,
                }}
                colors={dataColors}
              />
              <Space loose>
                <View style={{ alignSelf: "stretch" }}>
                  <Space>
                    <Heading2>Đọc truyện</Heading2>
                    <LimitRow
                      current={storyPlayedTime}
                      color={colors.pink}
                      representation={story}
                      child={children[curChildIndex]}
                      onChangeText={setStoryLimit}
                      limit={storyLimit}
                      onChangeCurText={setCurStoryLimit}
                      curLimit={curStoryLimit}
                    />
                    <Heading2>Chơi game</Heading2>
                    <LimitRow
                      current={gamePlayedTime}
                      color={colors.orange}
                      representation={game}
                      child={children[curChildIndex]}
                      onChangeText={setGameLimit}
                      limit={gameLimit}
                      onChangeCurText={setCurGameLimit}
                      curLimit={curGameLimit}
                    />
                    <Heading2>Xem phim</Heading2>
                    <LimitRow
                      current={moviePlayedTime}
                      color={colors.yellow}
                      representation={movie}
                      child={children[curChildIndex]}
                      onChangeText={setMovieLimit}
                      limit={movieLimit}
                      onChangeCurText={setCurMovieLimit}
                      curLimit={curMovieLimit}
                    />
                  </Space>
                </View>

                <Button onPress={handleSubmitLimit}>Lưu thay đổi</Button>
              </Space>
            </Card>
          ) : (
            <Body>Bạn chưa bật giới hạn sử dụng.</Body>
          )}
        </Space>
        <Space>
          <Row style={{ justifyContent: "space-between" }}>
            <Heading2>Thống kê</Heading2>
            <Row style={{ marginRight: sizes.base / 2 }}>
              <Space>
                <TouchableOpacity>
                  <Heading3
                    style={{
                      fontSize: sizes.body,
                      color: colors.primary,
                    }}
                  >
                    NGÀY
                  </Heading3>
                </TouchableOpacity>
              </Space>
            </Row>
          </Row>
          <Card title="Hôm nay" style={{ alignItems: "center" }}>
            <Space>
              <View style={{ alignItems: "center" }}>
                <Heading3
                  style={{ fontSize: sizes.h1 * 2, color: colors.purple }}
                >
                  {`${isNaN(allPlayedTime) ? 0 : allPlayedTime}p`}
                </Heading3>
                <Body
                  style={{
                    marginBottom: sizes.base / 2,
                  }}
                >
                  tổng cộng
                </Body>
              </View>
              <Row
                style={{
                  justifyContent: "space-between",
                  alignSelf: "stretch",
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Heading3 style={{ fontSize: sizes.h1, color: colors.pink }}>
                    {`${storyPlayedTime ?? 0}p`}
                  </Heading3>
                  <Body
                    style={{
                      color: colors.fadeblack50,
                      marginBottom: sizes.base / 2,
                    }}
                  >
                    đọc truyện
                  </Body>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Heading3
                    style={{ fontSize: sizes.h1, color: colors.orange }}
                  >
                    {`${gamePlayedTime ?? 0}p`}
                  </Heading3>
                  <Body
                    style={{
                      color: colors.fadeblack50,
                      marginBottom: sizes.base / 2,
                    }}
                  >
                    chơi game
                  </Body>
                </View>
                <View style={{ alignItems: "center" }}>
                  <Heading3
                    style={{ fontSize: sizes.h1, color: colors.yellow }}
                  >
                    {`${moviePlayedTime ?? 0}p`}
                  </Heading3>
                  <Body
                    style={{
                      color: colors.fadeblack50,
                      marginBottom: sizes.base / 2,
                    }}
                  >
                    xem phim
                  </Body>
                </View>
              </Row>
            </Space>
          </Card>
        </Space>
      </Space>
    </ScreenView>
  );
};

export default GameCatalogueScreen;
