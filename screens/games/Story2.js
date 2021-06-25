import React, { useEffect, useRef, useState } from "react";
import { View, StatusBar, Text, Alert } from "react-native";
import { colors, sizes } from "../../constants";
import { Frame, NoScrollView, Space } from "../../components/Wrapper";
import { ImageButton } from "../../components/Button";
import { createSound } from "../../utils/sound";
import { ImageManager, IconManager } from "../../utils/image";
import { Heading1, Heading3 } from "../../components/Typography";

import firestore from "@react-native-firebase/firestore";
import { CollectionName } from "../../utils/enum";
import BackgroundTimer from "react-native-background-timer";

const gameImages = ImageManager.threeHamers;

const pages = 13;

export const Story2 = ({ route, navigation }) => {
  const { child, gameKey, playedTime, startTime } = route.params;

  const [currentGame, setCurrentGame] = useState();
  const [childGameData, setChildGameData] = useState();

  let tempPlayingTime = 0;

  const remainingTime = playedTime
    ? childGameData?.timeLimit - playedTime
    : childGameData?.timeLimit;

  if (remainingTime <= 0 && child?.isLimited) {
    Alert.alert(
      "Thông báo",
      "Bạn không thể chơi do đã vượt quá thời gian giới hạn.",
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  }

  let script = useRef(null);
  let backgroundMusic = useRef(null);

  const media = {
    background: {
      audio: "story2",
    },
    story: gameImages.story,
  };

  const keys = Object.keys(media);

  const scriptText = [
    "Xưa, có một anh chàng tiều phu nghèo, cha mẹ anh bệnh nên mất sớm, để lại tài sản cho anh chỉ có một chiếc rìu, hằng ngày, anh vào rừng đốn củi để kiếm sống",
    `Ở cạnh bìa rừng gần đó, có một con sông nước chảy xiết, ai mà lỡ chân rơi xuống đó thì khó mà bơi vào bờ`,
    `Một hôm, như thường ngày, anh chàng tiều phu vác rìu vào rừng đốn củi. Trong lúc đang chặt củi ở bờ sông thì chẳng may cây rìu bị gảy cán, rơi xuống sông`,
    `Vì dòng nước chảy xiết quá, nên mặc dù biết bơi, anh chàng vẫn không thể nhảy xuống sông để tìm lưỡi rìu`,
    `Buồn quá, anh chàng tiều phu ngồi khóc than thở`,
    `Bỗng nhiên, có một ông cụ tóc trắng bạc phơ, đôi mắt hiền từ, xuất hiện, nhìn chàng tiều phu và hỏi: "Này con, con có chuyện gì mà buồn bã vậy?"`,
    `"Thưa ông, nhà cháu nghèo lắm, chỉ có một cái rìu để cháu lấy củi kiếm sống qua ngày, vậy mà cháu đã sơ ý để lưỡi rìu văng xuống sông, giờ đây chẳng biết lấy gì để kiếm sống, vì thế cháu buồn lắm ông ạ". Ông cụ đáp lời chàng tiều phu: "Tưởng chuyện gì, cháu đừng buồn nữa, để ông giúp cháu lấy lưỡi rìu lên"`,
    `Nói rồi, ông lão lao mình xuống dòng sông nước chảy xiết. Một lát sau, ông lão ngoi lên mặt nước cùng với một lưỡi rìu bằng vàng sáng chói. Ông lão hỏi: "Có phải lưỡi rìu của cháu đây không?"`,
    `Nhìn lưỡi rìu bằng vàng, chàng tiều phu vội vã lắc đầu: "Dạ không phải lưỡi rìu của cháu"`,
    `Lần thứ hai, ông lão lao mình xuống dòng sông nước chảy xiết, một lát sau, ông lão ngoi lên mặt nước cùng với một lưỡi rìu bằng bạc sáng chói. Ông lão lại hỏi: "Có phải lưỡi rìu của cháu đây không?"`,
    `Nhìn lưỡi rìu bằng bạc, chàng tiều phu vội lắc đầu trả lời: "Không phải của cháu ạ"`,
    `Lần thứ ba, ông lão ngoi lên mặt nước cùng với một lưỡi rìu bằng sắt, ông lão tiếp tục hỏi: "Vậy đây có phải lưỡi rìu của con không?". Thấy đúng là lưỡi rìu của mình rồi, anh chàng reo lên sung sướng: "Đúng là rìu của cháu đây ạ". Chàng tiều phu cảm ơn ông cụ ríu rít, ông cụ đưa cho anh lưỡi rìu bằng sắt và khen anh: "Con quả là một người trung thực, thật thà, ta tặng cho con cả 2 lưỡi rìu bằng vàng và bạc này"`,
    `"Đây là quà ta tặng con, con cứ vui vẻ nhận lấy đi". Anh chàng tiều phu cúi xuống cảm ơn và đỡ lấy 2 lưỡi rìu mà ông cụ tặng. Ông cụ hóa phép biến mất.`,
    `Một lúc sau khi ngẫm nghĩ lại anh mới biết mình vừa mới được ông bụt giúp đỡ. Anh vô cùng vui, suốt đường đi về nhà anh cứ cười mãi.`,
  ];

  const [page, setPage] = useState(-1);

  useEffect(() => {
    fetchCurrentGame();
  }, []);

  useEffect(() => {
    fetchChildGameData();
  }, [currentGame]);

  useEffect(() => {
    if (childGameData?.timeLimit && child?.isLimited) {
      if (remainingTime > 0) {
        BackgroundTimer.runBackgroundTimer(() => {
          tempPlayingTime++;
          console.log(tempPlayingTime);
          if (tempPlayingTime == remainingTime) {
            createGameRecord();

            Alert.alert(
              "Thông báo",
              "Bạn không thể chơi do đã vượt quá thời gian giới hạn.",
              [
                {
                  text: "OK",
                  onPress: () => {
                    BackgroundTimer.stopBackgroundTimer();
                    navigation.goBack();
                  },
                },
              ]
            );
          }
        }, 1000);
      }
    }
  }, [childGameData]);

  const createGameRecord = async () => {
    const endTime = new Date().getTime();
    const playedTime = Math.floor((endTime - startTime) / 1000);

    await firestore()
      .collection(CollectionName.GAMES)
      .doc(currentGame?._id)
      .collection(CollectionName.CHILD_GAME_DATA)
      .doc(child?._id)
      .collection(CollectionName.GAME_RECORDS)
      .add({
        playedTime: playedTime,
        createdAt: firestore.FieldValue.serverTimestamp(),
      })
      .then(() => console.log("Add game record successfully"))
      .catch((error) => console.log(error));
  };

  const fetchCurrentGame = async () => {
    await firestore()
      .collection(CollectionName.GAMES)
      .where("key", "==", gameKey)
      .get()
      .then((querySnapshot) => {
        const doc = querySnapshot.docs[0];
        const game = { ...doc.data(), _id: doc.id };
        setCurrentGame(game);
      });
  };

  const fetchChildGameData = async () => {
    await firestore()
      .collection(CollectionName.GAMES)
      .doc(currentGame?._id)
      .collection(CollectionName.CHILD_GAME_DATA)
      .doc(child?._id)
      .get()
      .then((doc) => {
        const childData = { ...doc.data(), _id: doc.id };
        setChildGameData(childData);
      });
  };

  const handleStart = () => {
    console.log("handle start");
    backgroundMusic.current = createSound(media.background.audio, -1, 0.3);
    playScript(0);
    setPage(page + 1);

    // media.background.audio.play();
    // media.background.audio.setNumberOfLoops(-1);
    // media.background.audio.setVolume(0.25);
  };

  const playScript = (no) => {
    script.current = createSound(`riu_${no + 1}`);
  };

  const StartFrame = () => {
    return (
      <Frame background={ImageManager.threeHamers.blur}>
        <View
          style={{
            position: "absolute",
            alignSelf: "flex-start",
            height: sizes.short,
            padding: sizes.base,
          }}
        >
          <ImageButton
            onPress={() => navigation.goBack()}
            source={IconManager.buttons.orange.back}
            height={sizes.base * 4}
          />
        </View>
        <View style={{ marginBottom: sizes.base * 2, alignItems: "center" }}>
          <Heading1 white>3 Chiếc Rìu</Heading1>
          <Heading3
            white
            style={{ marginTop: sizes.base / 2, marginBottom: sizes.base * 3 }}
          >
            Số trang: 14
          </Heading3>
          <ImageButton
            source={IconManager.buttons.orange.play}
            height={sizes.base * 7}
            // title="Bắt đầu"
            onPress={() => handleStart()}
          />
        </View>
      </Frame>
    );
  };

  const stopScript = async () => {
    await script.current.stop(() => {
      script.current.release();
    });
  };

  const goBack = async () => {
    createGameRecord();
    if (child?.isLimited) BackgroundTimer.stopBackgroundTimer();

    await stopScript();
    await backgroundMusic.current.stop(() => {
      backgroundMusic.current.release();
    });
    navigation.goBack();
  };

  const handleNext = async () => {
    await stopScript();
    playScript(page + 1);
    setPage(page + 1);
  };

  const handlePrevious = async () => {
    await stopScript();
    playScript(page - 1);
    setPage(page - 1);
  };

  const handleReplay = async () => {
    await stopScript();
    playScript(page);
  };

  return (
    <NoScrollView
      style={{
        flexDirection: "row-reverse",
        justifyContent: "flex-start",
        padding: 0,
      }}
    >
      <StatusBar hidden />
      {page < 0 && <StartFrame />}
      {page > -1 && <Frame background={media.story[page]}></Frame>}
      {page > -1 && (
        <View
          style={{
            alignSelf: "stretch",
            justifyContent: "center",
            backgroundColor: colors.fadeblack,
            padding: sizes.base,
            alignItems: "center",
          }}
        >
          <Space row>
            <ImageButton
              height={45}
              onPress={() => goBack()}
              source={IconManager.home}
            />
            <ImageButton
              height={45}
              onPress={() => handleReplay()}
              source={IconManager.replay}
            />
            <ImageButton
              block={page < 1}
              height={45}
              onPress={() => handlePrevious()}
              source={IconManager.back}
            />
            <ImageButton
              block={page >= pages}
              height={45}
              onPress={() => handleNext()}
              source={IconManager.next}
            />
            <Heading1 white>{page + 1}</Heading1>
          </Space>
        </View>
      )}
      {page > -1 && (
        <View
          pointerEvents="none"
          style={{
            margin: sizes.base,
            alignSelf: "flex-end",
            flex: 1,
            marginHorizontal: sizes.base * 5,
          }}
        >
          <View
            style={{
              backgroundColor: colors.darkBlue,
              // flex: 1,
              borderRadius: sizes.base,
              padding: sizes.base,
              paddingVertical: sizes.base / 2,
              marginBottom: sizes.base / 3,
              alignSelf: "center",
            }}
          >
            <Text style={{ color: colors.white }}>
              {scriptText[page].toString()}
            </Text>
          </View>
        </View>
      )}
    </NoScrollView>
  );
};

export default Story2;
