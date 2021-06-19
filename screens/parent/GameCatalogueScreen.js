import React, { useRef, useState } from "react";

import { colors, sizes } from "../../constants";
import {
  Card,
  Row,
  ScreenView,
  Space,
  Impress,
  RoundImpress,
} from "../../components/Wrapper";
import { AutoIcon, Button, ImageButton } from "../../components/Button";
import { HorizontalList } from "../../components/HorizontalList";
import { ImageManager, IconManager } from "../../utils/image";
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

const games = [
  {
    key: "Instruments",
    name: "Âm nhạc",
  },
  {
    key: "Shapes",
    name: "Hình khối",
  },
  {
    key: "Movies",
    name: "Xem hoạt hình",
  },
  {
    key: "Sandbox",
    name: "Vẽ trên cát",
  },
  {
    key: "Stories",
    name: "Đọc truyện",
  },
  {
    key: "GameCountNumberScreen",
    name: "Đếm số",
  },
  {
    key: "GameAlphabet",
    name: "Đánh vần",
  },
  {
    key: "GameAdd",
    name: "Phép cộng",
  },
  {
    key: "TrashGame",
    name: "Dọn rác",
  },
];

const children = [
  {
    age: 5,
    gender: "male",
    name: "Ngô Công Hậu",
  },
  {
    age: 3,
    gender: "female",
    name: "Phan Huy Tiến",
  },
];

const data = [0.4, 0.6, 0.8];
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
              {item.age}
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

const UsageChart = ({ item }) => {
  return (
    <LineChart
      data={{
        labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [
          {
            data: [
              Math.random() * 50,
              Math.random() * 50,
              Math.random() * 50,
              Math.random() * 50,
              Math.random() * 50,
              Math.random() * 50,
            ],
          },
        ],
      }}
      width={sizes.short - sizes.base * 4} // from react-native
      height={220}
      chartConfig={{
        backgroundGradientFrom: colors.white,
        backgroundGradientTo: colors.white,
        decimalPlaces: 0, // optional, defaults to 2dp
        color: () => hexToRgba(item.color, 1),
        style: {
          borderRadius: 16,
        },
      }}
      bezier
      style={{
        marginLeft: -sizes.base / 2,
        borderRadius: 16,
      }}
    />
  );
};

const LimitRow = ({ current, color }) => {
  return (
    <Row style={{ marginBottom: -sizes.base * 0.75 }}>
      <Heading2
        style={{
          color: color,
          marginBottom: sizes.base,
          marginRight: sizes.base / 2,
        }}
      >
        {`${current} trên tổng `}
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
  const [isLimit, setIsLimit] = useState(false);
  const carouselChild = useRef();
  const carouselUsage = useRef();
  const toggleSwitch = () => setIsLimit((previousState) => !previousState);
  const handleSelectChild = (index) => {};
  return (
    <ScreenView isMainScreen title="Giải trí" navigation={navigation}>
      <Space loose>
        <View style={{ alignItems: "flex-end" }}>
          <AutoIcon
            width={sizes.short - sizes.base * 2}
            source={ImageManager.gokidpng}
          />
          <View style={{ position: "absolute" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("SelectChildScreen")}
              style={{ marginRight: sizes.base, marginTop: sizes.base * 3 }}
            >
              <Impress color={colors.grass}>
                <Heading3 white style={{ fontSize: sizes.base + 5 }}>
                  Góc cho bé
                </Heading3>
              </Impress>
            </TouchableOpacity>
          </View>
        </View>
        <Space>
          <Heading2>Danh sách game</Heading2>
          <HorizontalList data={games} />
        </Space>
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
              thumbColor={isLimit ? colors.primary : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isLimit}
            />
          </Row>
          {isLimit ? (
            <Card title="Hôm nay" style={{ alignItems: "center" }}>
              <ProgressChart
                data={data}
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
                    <LimitRow current={30} color={colors.pink} />
                    <Heading2>Chơi game</Heading2>
                    <LimitRow current={45} color={colors.orange} />
                    <Heading2>Xem phim</Heading2>
                    <LimitRow current={120} color={colors.yellow} />
                  </Space>
                </View>

                <Button>Lưu thay đổi</Button>
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
                      opacity: 0.25,
                    }}
                  >
                    NGÀY
                  </Heading3>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Heading3
                    style={{ fontSize: sizes.body, color: colors.primary }}
                  >
                    TUẦN
                  </Heading3>
                </TouchableOpacity>
              </Space>
            </Row>
          </Row>
          <Card title="Tuần này" style={{ alignItems: "center" }}>
            <Space>
              <View style={{ alignItems: "center" }}>
                <Heading3
                  style={{ fontSize: sizes.h1 * 2, color: colors.purple }}
                >
                  30p
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
                    30p
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
                    1,5h
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
                    30p
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
              <Carousel
                ref={(c) => {
                  carouselUsage.current = c;
                }}
                data={usageData}
                renderItem={UsageChart}
                sliderWidth={sizes.short - sizes.base * 4}
                itemWidth={sizes.short - sizes.base * 4}
              />
            </Space>
          </Card>
        </Space>
      </Space>
    </ScreenView>
  );
};

export default GameCatalogueScreen;
