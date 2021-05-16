import React from "react";
import { SafeAreaView, View, ScrollView } from "react-native";

import { icons, images, sizes, colors, fonts } from "../constants";
import { Heading2 } from "./Typography";

export const ScreenView = ({ children, bgColor }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={{
          backgroundColor: bgColor || colors.smoke,
        }}
      >
        <View style={{ padding: sizes.base, marginBottom: 100 }}>
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export const Card = ({ children, bgColor, title }) => {
  return (
    <View
      style={{
        backgroundColor: bgColor || "white",
        padding: sizes.base,
        paddingBottom: sizes.base * 2,
        borderWidth: 0,
        borderRadius: sizes.base,
        alignItems: "stretch",
        elevation: sizes.base,
        shadowOpacity: 0,
      }}
    >
      {title && (
        <Heading2 style={{ alignSelf: "center", marginBottom: sizes.base }}>
          {title}
        </Heading2>
      )}
      {children}
    </View>
  );
};

export const Row = ({ children }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        flex: 1,
      }}
    >
      {children}
    </View>
  );
};

export const Space = ({ children, row }) => {
  const renderChildren = () => {
    const list = [];
    React.Children.forEach(children, function (child) {
      list.push(child);
      list.push(
        <View
          style={{
            width: sizes.base,
            height: sizes.base,
          }}
        />
      );
    });
    list.pop();
    return list;
  };
  return (
    <View style={{ flexDirection: row ? "row" : "column" }}>
      {renderChildren()}
    </View>
  );
};
