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

export const FullHorizontalList = ({
  data,
  onPress,
  width,
  children,
  spaceScale,
}) => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      style={{ paddingLeft: 50 }}
    >
      {children}
      <View
        style={{
          flexDirection: "row",
          paddingLeft: 50,
          paddingRight: 200,
          alignItems: "center",
          // backgroundColor: "pink",
        }}
      >
        <Space scale={spaceScale || 1}>
          {data.map((d) =>
            d.image ? (
              <ImageButton
                source={d.image}
                height={sizes.short}
                onPress={() => onPress(d.key)}
              />
            ) : (
              <ImageButton
                source={ImageManager.games.instrument}
                height={sizes.short}
                onPress={() => onPress(d.key)}
              />
            )
          )}
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
