import React, { useEffect, useRef, useState } from "react";

import { colors, sizes } from "../../constants";
import {
  Card,
  Row,
  ScreenView,
  Space,
  Impress,
  RoundImpress,
  NoScrollView,
} from "../../components/Wrapper";
import { TextInput } from "../../components/TextInput";
import { AutoIcon, Button, ImageButton } from "../../components/Button";
import { HorizontalList } from "../../components/HorizontalList";
import { ImageManager, IconManager } from "../../utils/image";
import { View, TouchableOpacity, Switch, FlatList } from "react-native";
import {
  Heading2,
  Body,
  Heading3,
  Heading1,
} from "../../components/Typography";
import ProgressChart from "../../components/Chart/ProgressChart";
import { hexToRgba } from "../../utils/color";
import Carousel from "react-native-snap-carousel";
import { LargeChildInfo } from "./TrackingScreen";
import LineChart from "../../components/Chart/LineChart";
import { PieChart } from "react-native-chart-kit";
import { FlatInput } from "./AddRecordScreen";
import { shortenName } from "../../utils/string";
import LinkPreview from "../../components/LinkPreview/LinkPreview";
import { WebView } from "react-native-webview";

export const PostScreen = ({ route, navigation }) => {
  const { hearted, url } = route.params;
  const Heart = () => {
    return (
      <TouchableOpacity
        // pointerEvents="box-none"
        style={{
          backgroundColor: colors.white98,
          width: 56,
          height: 56,
          borderRadius: 999,
          alignItems: "center",
          justifyContent: "center",
          marginTop: sizes.long - sizes.base * 6,
          marginLeft: sizes.base * 2,
          elevation: 25,
        }}
      >
        <AutoIcon
          source={hearted ? IconManager.heart : IconManager.heartempty}
          color={hearted ? colors.pink : colors.black}
          height={26}
        />
      </TouchableOpacity>
    );
  };
  return (
    <ScreenView
      title="Bài viết"
      navigation={navigation}
      style={{ padding: 0, height: sizes.height, paddingBottom: 0 }}
      absoluteChildren={Heart()}
    >
      <WebView
        source={{
          uri: url,
        }}
        style={{ height: sizes.height, margin: 0, padding: 0 }}
      />
    </ScreenView>
  );
};

export default PostScreen;
