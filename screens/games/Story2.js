import React, { useEffect, useRef, useState } from "react";
import { View, StatusBar, Text, ImageBackground } from "react-native";
import { colors, sizes } from "../../constants";
import { Frame, NoScrollView, Space } from "../../components/Wrapper";
import { ImageButton, StoryObject } from "../../components/Button";
import { createSound } from "../../utils/sound";
import { ImageManager, IconManager } from "../../utils/image";
import { Heading1, Heading3 } from "../../components/Typography";

const gameImages = ImageManager.threeHamers;

const pages = 13;

export const Story2 = ({ navigation }) => {
  let script = useRef(null);
  let backgroundMusic = useRef(null);

  const media = {
    background: {
      audio: "story2",
    },
    story: gameImages.story,
  };

  const keys = Object.keys(media);

  const [page, setPage] = useState(-1);

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
    </NoScrollView>
  );
};

export default Story2;
