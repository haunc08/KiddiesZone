import React, { useEffect, useRef, useState } from "react";
import { View, StatusBar, Text, Alert } from "react-native";
import { colors, sizes } from "../../constants";
import { Frame, NoScrollView, Space } from "../../components/Wrapper";
import { ImageButton, StoryObject } from "../../components/Button";
import { createSound } from "../../utils/sound";
import { ImageManager, IconManager } from "../../utils/image";
import { Heading1, Heading3 } from "../../components/Typography";

import firestore from "@react-native-firebase/firestore";
import { CollectionName } from "../../utils/enum";
import BackgroundTimer from "react-native-background-timer";

const gameImages = ImageManager.rabbitAndTurtle;

const pages = 11;

export const Story = ({ route, navigation }) => {
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
      audio: "story",
    },
    forest: {
      sprites: gameImages.forest,
    },
    turtle: {
      sprites: gameImages.turtle,
      name: "Con rùa",
      audio: "turtle",
    },
    rabbit: {
      sprites: gameImages.rabbit,
      name: "Con thỏ",
      audio: "rabbit",
    },
    snail: {
      sprites: gameImages.snail,
      name: "Ốc sên",
      audio: "snail",
    },
    lake: {
      name: "Hồ nước",
      audio: "lake",
    },
  };

  const keys = Object.keys(media);

  const scriptText = [
    "Một buổi sáng trời mát mẻ bên bờ hồ trong xanh, rùa đang hì hục tập chạy",
    `Thỏ đi qua, nhìn thấy vậy thì cười lớn, nhạo báng: "Cậu nên thôi cái việc vô ích ấy đi, khắp cả khu rừng này, ai chẳng biết họ nhà cậu là giống loài chậm chạp nhất"`,
    `Rùa ngẩng lên đáp: "Tôi tập chạy cho khỏe"`,
    `Thỏ nói: "Tôi nói thật đấy, dù cậu có dành cả đời tập chạy cũng không bao giờ theo kịp được tôi"`,
    `Rùa bực mình vì vẻ ngạo mạn của thỏ, trả lời lại: "Nếu vậy tôi với anh thử chạy thi xem ai trong chúng ta sẽ về đích trước"`,
    `Thỏ cười to bảo rằng: "Sao cậu không rủ sên thi cùng ấy? Chắc chắc cậu sẽ thắng"`,
    `Rùa nói chắc nịch: "Anh đừng có chế giễu tôi, chúng ta cứ thử thi xem sao, chưa biết ai thua cuộc đâu"`,
    `Thỏ nhíu mày, vểnh đôi tai lên tự đắc: "Được thôi, tôi sẽ cho cậu thấy`,
    `Rùa và thỏ quy ước lấy gốc cây cổ thụ bên kia hồ làm đích rồi cả vào vạch xuất phát, thỏ vẫn ngạo nghễ: "Tôi chấp cậu cả nửa đường luôn đấy"`,
    `Biết mình chậm chạp, rùa không nói gì, chỉ tập trung dồn sức chạy thật nhanh. Thỏ nhìn theo mỉm cười, vỗ tay cổ vũ rùa, thỏ nghĩ: "Giờ mà chạy có thắng cậu ta cũng chẳng vẻ vang gì, để lúc nào rùa gần tới nơi, mình phóng lên cán đích trước càng khiến cậu ta nể phục. `,
    `Thế là thủ nhởn nhơ nằm ngủ một giấc thật say, mải ngủ, thỏ quên mất cả cuộc thi. Thỏ đang nằm khoan thai ngắm bầu trời trong xanh, mây trôi nhè nhẹ, bỗng bật dậy nhớ tới cuộc thi, nhấc đầu lên thì rùa đã gần tới đích`,
    `Thỏ cắm đầu cắm cổ chạy miết nhưng không kịp nữa, rùa đã cán đích trước thỏ một đoạn đường dài.`,
  ];

  const frames = [
    {
      page: 1,
      frame: (
        <Frame background={media.forest.sprites[1]}>
          <StoryObject
            background
            media={media.lake}
            width={1.5}
            height={1}
            top={4}
            right={3.5}
          />
          <StoryObject
            media={media.turtle}
            index={3}
            height={2}
            top={1}
            disableTooltip
          />
        </Frame>
      ),
    },
    {
      page: 2,
      frame: (
        <Frame background={media.forest.sprites[1]}>
          <StoryObject
            background
            media={media.lake}
            width={1.5}
            height={1}
            top={4}
            right={3.5}
          />
          <StoryObject
            media={media.turtle}
            index={0}
            height={2}
            top={1}
            right={1.5}
          />
          <StoryObject
            media={media.rabbit}
            index={0}
            height={2.5}
            top={0.75}
            left={1}
          />
        </Frame>
      ),
    },
    {
      page: 3,
      frame: (
        <Frame background={media.forest.sprites[1]}>
          <StoryObject
            background
            media={media.lake}
            width={1.5}
            height={1}
            top={4}
            right={3.5}
          />
          <StoryObject
            media={media.turtle}
            index={5}
            height={2.25}
            top={1}
            right={1.5}
          />
          <StoryObject
            media={media.rabbit}
            index={0}
            height={2.5}
            top={0.75}
            left={1}
          />
        </Frame>
      ),
    },
    {
      page: 4,
      frame: (
        <Frame background={media.forest.sprites[1]}>
          <StoryObject
            background
            media={media.lake}
            width={1.5}
            height={1}
            top={4}
            right={3.5}
          />
          <StoryObject
            media={media.turtle}
            index={5}
            height={2.25}
            top={1}
            right={1.5}
          />
          <StoryObject
            media={media.rabbit}
            index={5}
            height={2.75}
            top={0.75}
            left={1}
          />
        </Frame>
      ),
    },
    {
      page: 5,
      frame: (
        <Frame background={media.forest.sprites[1]}>
          <StoryObject
            background
            media={media.lake}
            width={1.5}
            height={1}
            top={4}
            right={3.5}
          />
          <StoryObject
            media={media.turtle}
            index={6}
            height={2.25}
            top={1}
            right={1}
          />
          <StoryObject
            media={media.rabbit}
            index={5}
            height={2.75}
            top={0.75}
            left={1}
          />
          <StoryObject
            media={media.snail}
            index={0}
            height={0.75}
            left={3.5}
            top={3.25}
          />
        </Frame>
      ),
    },
    {
      page: 6,
      frame: (
        <Frame background={media.forest.sprites[1]}>
          <StoryObject
            background
            media={media.lake}
            width={1.5}
            height={1}
            top={4}
            right={3.5}
          />
          <StoryObject
            media={media.turtle}
            index={6}
            height={2.25}
            top={1}
            right={1}
          />
          <StoryObject
            media={media.rabbit}
            index={0}
            height={2.5}
            top={0.75}
            left={1}
          />
          <StoryObject media={media.snail} index={0} height={0.75} top={3.25} />
        </Frame>
      ),
    },
    {
      page: 7,
      frame: (
        <Frame background={media.forest.sprites[1]}>
          <StoryObject
            background
            media={media.lake}
            width={1.5}
            height={1}
            top={4}
            right={3.5}
          />
          <StoryObject
            media={media.turtle}
            index={7}
            height={2.25}
            top={1}
            right={1}
          />
          <StoryObject
            media={media.rabbit}
            index={0}
            height={2.5}
            top={0.75}
            left={1}
          />
          <StoryObject media={media.snail} index={0} height={0.75} top={3.25} />
        </Frame>
      ),
    },
    {
      page: 8,
      frame: (
        <Frame background={media.forest.sprites[1]}>
          <StoryObject
            background
            media={media.lake}
            width={1.5}
            height={1}
            top={4}
            right={3.5}
          />
          <StoryObject media={media.turtle} index={7} height={2.25} top={1} />
          <StoryObject
            media={media.rabbit}
            index={6}
            height={1.75}
            top={1.5}
            left={2}
          />
          <StoryObject
            media={media.snail}
            index={0}
            height={0.75}
            top={3.25}
            right={1}
          />
        </Frame>
      ),
    },
    {
      page: 9,
      frame: (
        <Frame background={media.forest.sprites[0]}>
          <StoryObject
            media={media.turtle}
            index={6}
            height={2}
            top={1}
            right={0.5}
          />
          <StoryObject
            media={media.rabbit}
            index={5}
            height={2.5}
            top={0}
            left={1}
          />
        </Frame>
      ),
    },
    {
      page: 10,
      frame: (
        <Frame background={media.forest.sprites[0]}>
          <StoryObject
            media={media.turtle}
            index={8}
            height={2.25}
            top={2}
            right={1.75}
          />
          <StoryObject
            media={media.rabbit}
            index={5}
            height={2.5}
            top={0}
            left={1}
          />
        </Frame>
      ),
    },
    {
      page: 11,
      frame: (
        <Frame background={media.forest.sprites[2]}>
          <StoryObject
            media={media.rabbit}
            index={4}
            height={2}
            top={1}
            left={1.5}
          />
        </Frame>
      ),
    },
    {
      page: 12,
      frame: (
        <Frame background={media.forest.sprites[1]}>
          <StoryObject
            media={media.rabbit}
            index={6}
            height={1.25}
            top={1}
            right={3.5}
          />
          <StoryObject
            media={media.turtle}
            index={4}
            height={2.25}
            top={1.5}
            left={2.25}
          />
        </Frame>
      ),
    },
    {
      page: 13,
      frame: (
        <Frame>
          <Heading1 white>Hết</Heading1>
        </Frame>
      ),
    },
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
                  onPress: async () => {
                    BackgroundTimer.stopBackgroundTimer();
                    await stopScript();
                    await backgroundMusic.current.stop(() => {
                      backgroundMusic.current.release();
                    });
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
    script.current = createSound(`st1_${no + 1}`);
  };

  const StartFrame = () => {
    return (
      <Frame background={ImageManager.rabbitAndTurtle.blur}>
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
          <Heading1 white>Rùa Và Thỏ</Heading1>
          <Heading3
            white
            style={{ marginTop: sizes.base / 2, marginBottom: sizes.base * 3 }}
          >
            Số trang: 12
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
    navigation.navigate("Stories");
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
      {page > -1 && frames[page]?.frame}
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
              onPress={goBack}
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
            alignSelf: "flex-start",
            flex: 1,
            marginHorizontal: sizes.base * 5,
          }}
        >
          <View
            style={{
              backgroundColor: colors.darkGrass,
              // flex: 1,
              borderRadius: sizes.base,
              padding: sizes.base,
              paddingVertical: sizes.base / 2,
              marginBottom: sizes.base / 3,
              alignSelf: "center",
            }}
          >
            <Text style={{ color: colors.white }}>{scriptText[page]}</Text>
          </View>
        </View>
      )}
    </NoScrollView>
  );
};

export default Story;
