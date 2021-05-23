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
import { Body, Heading1, Heading2 } from "../components/Typography";
import { Card, Row, ScreenView, Space } from "../components/Wrapper";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";

export const FullHorizontalList = ({ data, navigation }) => {
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      style={{ padding: sizes.base * 2 }}
    >
      <View
        style={{
          flexDirection: "row",
          paddingRight: 200,
        }}
      >
        <Space loose>
          {data.map((d) => (
            <Card
              key={d.key}
              touchable
              style={{ width: 320 }}
              title={d.name}
              onPress={() => navigation.navigate(d.key)}
            />
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
