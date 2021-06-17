import React, { useEffect, useRef, useState } from "react";

import { colors, sizes } from "../../constants";
import {
  Card,
  Row,
  ScreenView,
  Space,
  Impress,
  RoundImpress,
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

const userId = "6921420";

const posts = [
  {
    url:
      "https://www.webtretho.com/p/2-cach-bao-quan-sau-rieng-trong-tu-lanh-khong-bi-am-mui-de-an-dan-bao-thich",
    hearts: ["6921420"],
  },
  {
    url:
      "https://vnexpress.net/bi-quyet-tang-cuong-suc-khoe-thoi-dich-4292295.html",
    hearts: [],
  },
  {
    url:
      "https://vnexpress.net/5-15-tuoi-la-giai-doan-vang-de-tre-phat-trien-4290882.html",
    hearts: [],
  },
  {
    url:
      "https://vnexpress.net/an-uong-giup-tre-tang-de-khang-chong-ncov-4289089.html",
    hearts: [],
  },
  {
    url:
      "https://vnexpress.net/giai-phap-cho-van-de-khong-hop-sua-4288357.html",
    hearts: [],
  },
  {
    url:
      "https://vnexpress.net/bi-quyet-giup-tre-an-ngon-mieng-trong-giai-doan-an-dam-4283998.html",
    hearts: [],
  },
  {
    url: "https://vnexpress.net/bi-quyet-tang-de-khang-de-dang-4276111.html",
    hearts: [],
  },
  {
    url: "https://vnexpress.net/boi-bo-dinh-duong-chong-covid-19-4280248.html",
    hearts: [],
  },
];

export const FeedScreen = ({ navigation }) => {
  const [currentTab, setCurrentTab] = useState(0);
  const scrollRef = useRef();

  const Post = ({ item }) => {
    const hearted = item.hearts.includes(userId);
    return (
      <Card style={{ padding: sizes.base / 2, marginTop: sizes.base }}>
        <LinkPreview
          text={item.url}
          titleNumberOfLines={5}
          descriptionNumberOfLines={10}
          onPress={() =>
            navigation.navigate("PostScreen", {
              hearted: hearted,
              url: item.url,
            })
          }
        />
        <Row style={{ justifyContent: "space-between", padding: sizes.base }}>
          <Row>
            <ImageButton
              source={hearted ? IconManager.heart : IconManager.heartempty}
              color={hearted ? colors.pink : colors.black}
              height={26}
            />
            <Heading3
              style={{
                marginLeft: sizes.base,
                fontSize: sizes.body + 6,
                marginBottom: 2,
              }}
            >
              12
            </Heading3>
          </Row>
          <Body
            style={{
              marginLeft: sizes.base,
              color: colors.fadeblack50,
            }}
          >
            2 ngày trước
          </Body>
        </Row>
      </Card>
    );
  };

  const FeedTabs = () => {
    return (
      <Row style={{ marginBottom: sizes.base }}>
        <TouchableOpacity
          onPress={() => setCurrentTab(0)}
          style={{
            borderRadius: 999,
            flex: 1,
            backgroundColor: hexToRgba(
              colors.blue,
              currentTab === 0 ? 1 : 0.25
            ),
            padding: sizes.base * 0.75,
            paddingHorizontal: sizes.base * 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Space tight>
            <AutoIcon source={IconManager.star} white height={sizes.body} />
            <Body white>Bài mới</Body>
          </Space>
        </TouchableOpacity>
        <View style={{ width: sizes.base / 2 }} />
        <TouchableOpacity
          onPress={() => setCurrentTab(1)}
          style={{
            borderRadius: 999,
            flex: 1,
            backgroundColor: hexToRgba(
              colors.yellow,
              currentTab === 1 ? 1 : 0.25
            ),
            padding: sizes.base * 0.75,
            paddingHorizontal: sizes.base * 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Space tight>
            <AutoIcon source={IconManager.flame} white height={sizes.body} />
            <Body white>Phổ biến</Body>
          </Space>
        </TouchableOpacity>
        <View style={{ width: sizes.base / 2 }} />
        <TouchableOpacity
          onPress={() => setCurrentTab(2)}
          style={{
            borderRadius: 999,
            flex: 1,
            backgroundColor: hexToRgba(
              colors.pink,
              currentTab === 2 ? 1 : 0.25
            ),
            padding: sizes.base * 0.75,
            paddingHorizontal: sizes.base * 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Space tight>
            <AutoIcon source={IconManager.heart} white height={sizes.body} />
            <Body white>Đã thích</Body>
          </Space>
        </TouchableOpacity>
      </Row>
    );
  };

  return (
    <ScreenView
      isMainScreen
      title="Bài viết"
      scrollToTop
      navigation={navigation}
    >
      <FeedTabs />
      <FlatList
        data={posts}
        renderItem={Post}
        keyExtractor={(item) => item.id}
      />
    </ScreenView>
  );
};

export default FeedScreen;
