import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, StatusBar, Text, ImageBackground, Image } from "react-native";
import { colors, sizes } from "../../constants";
import { Frame, NoScrollView, Space } from "../../components/Wrapper";
import { ImageButton, StoryObject } from "../../components/Button";
import { createSound } from "../../utils/sound";
import { ImageManager, IconManager, autoSize } from "../../utils/image";
import { Heading1 } from "../../components/Typography";
import Carousel from "react-native-snap-carousel";
import YoutubePlayer from "react-native-youtube-iframe";
import Orientation from "react-native-orientation-locker";

export const Shapes = () => {
  return (
    <NoScrollView
      style={{ padding: 0, alignItems: "stretch" }}
      imgSource={ImageManager.shapes.background}
    >
      <NoScrollView
        style={{
          padding: 0,
          position: "absolute",
          zIndex: 2,
          ...sizes.fulllandscape,
        }}
        imgSource={ImageManager.shapes.foreground}
      />
      <Frame></Frame>
    </NoScrollView>
  );
};

export default Shapes;
