import React, { useEffect, useRef, useState } from "react";
import { View, StatusBar, Text, ImageBackground } from "react-native";
import { colors, sizes } from "../../constants";
import { Frame, NoScrollView, Space } from "../../components/Wrapper";
import { ImageButton, StoryObject } from "../../components/Button";
import { createSound } from "../../utils/sound";
import { ImageManager, IconManager } from "../../utils/image";
import { Body, Heading1, Heading3 } from "../../components/Typography";

const gameImages = ImageManager.rabbitAndTurtle;

const pages = 11;

export const Story = ({ navigation }) => {
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

export default Story;
