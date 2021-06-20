import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";

import { icons, images, sizes, colors, fonts } from "../constants";
import { Body, Heading1, Heading2, Heading3 } from "../components/Typography";
import {
  Card,
  RoundImpress,
  Row,
  ScreenView,
  Space,
} from "../components/Wrapper";
import { TextInput } from "../components/TextInput";
import {
  AutoIcon,
  Button,
  FilledButton,
  ImageButton,
} from "../components/Button";
import { IconManager, ImageManager } from "../utils/image";
import { hexToRgba } from "../utils/color";

export const FullHorizontalList = ({ data, onPress, width, children }) => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      style={{ padding: 0 }}
    >
      {children}
      <View
        style={{
          flexDirection: "row",
          paddingLeft: 50,
          paddingRight: 200,
          // backgroundColor: "pink",
        }}
      >
        <View
          style={{
            alignItems: "center",
            alignSelf: "center",
            marginRight: 100,
          }}
        >
          <Space tight>
            <View style={{ height: sizes.base * 0 }} />
            <RoundImpress size={3}>
              <Heading2 style={{ fontSize: sizes.h2 + 6 }}>5</Heading2>
            </RoundImpress>
            <Heading2 white>Ngô Công Hậu</Heading2>

            <ImageButton
              onPress={() => navigation.goBack()}
              source={IconManager.back}
              height={sizes.base * 3}
              style={{ marginTop: sizes.base }}
            />
          </Space>
        </View>

        <Space scale={10}>
          {data.map((d) => (
            <Card
              key={d.key}
              touchable
              style={{ width: width || 320, alignItems: "center" }}
              title={d.image ? null : d.name}
              onPress={() => onPress(d.key)}
              bgColor={d.image ? colors.transparent : colors.pink}
              noShadow
            >
              {d.image ? (
                <Image
                  source={d.image}
                  style={{
                    flex: 1,
                    resizeMode: "contain",
                    alignSelf: "center",
                  }}
                />
              ) : null}
            </Card>
          ))}
        </Space>
      </View>
    </ScrollView>
  );
};

export const HorizontalList = ({ title, data }) => {
  return (
    <View>
      {title && (
        <Heading2 style={{ marginBottom: sizes.base }}>{title}</Heading2>
      )}
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        {data.map((d) => (
          <HorizontalListItem name={d.name} key={d.key} />
        ))}
      </ScrollView>
    </View>
  );
};

export const HorizontalListItem = ({ name }) => {
  return (
    <View
      style={{
        alignItems: "center",
        width: 150,
        marginRight: sizes.base,
      }}
    >
      <View
        style={{
          backgroundColor: colors.white,
          borderWidth: 0,
          borderRadius: sizes.base,
          width: 150,
          height: 200,
          marginBottom: sizes.base,
        }}
      />
      <Body style={{ textAlign: "center" }}>{name}</Body>
    </View>
  );
};
