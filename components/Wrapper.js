import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";

import { icons, images, sizes, colors, fonts } from "../constants";
import { hexToRgba } from "../utils/color";
import { IconManager } from "../utils/image";
import { Button, ImageButton } from "./Button";
import { Heading1, Heading2, Heading3 } from "./Typography";

const headerHeight = 50;

export const ScreenView = ({
  children,
  bgColor,
  horizontal,
  isMainScreen,
  navigation,
  title,
}) => {
  const [showHeader, setShowHeader] = useState(false);
  const handleScroll = (e) => {
    if (e.nativeEvent.contentOffset.y > headerHeight) {
      setShowHeader(true);
      return;
    }
    if (e.nativeEvent.contentOffset.y < headerHeight) {
      setShowHeader(false);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {(!isMainScreen || showHeader) && (
        <View
          style={{
            backgroundColor: colors.white98,
            alignSelf: "stretch",
            width: sizes.short,
            justifyContent: "space-between",
            alignItems: "center",
            padding: sizes.base,
            paddingHorizontal: sizes.base * 1.5,
            elevation: sizes.base * 2,
            position: "absolute",
            zIndex: 2,
            flexDirection: "row",
            height: headerHeight,
          }}
        >
          {!isMainScreen && (
            <ImageButton
              onPress={() => {
                navigation.goBack();
              }}
              source={IconManager.backline}
              height={sizes.h3}
            />
          )}
          <View
            style={{
              position: "absolute",
              width: sizes.short,
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Heading3>{title}</Heading3>
          </View>
        </View>
      )}
      {isMainScreen && !showHeader && (
        <View
          style={{
            height: headerHeight,
            width: sizes.short,
            backgroundColor: colors.smoke,
            zIndex: 2,
            position: "absolute",
          }}
        />
      )}
      <ScrollView
        onScroll={handleScroll}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal={horizontal}
        style={{
          backgroundColor: bgColor || colors.smoke,
        }}
      >
        <View
          style={
            horizontal
              ? {
                  alignContent: "stretch",
                  padding: sizes.base,
                  paddingRight: 100,
                  flexDirection: "row",
                }
              : { padding: sizes.base, paddingBottom: 100 }
          }
        >
          <View
            style={{
              marginTop: headerHeight - sizes.base * 1.25,
              alignSelf: "stretch",
              justifyContent: "space-between",
              marginBottom: sizes.base * 1.5,
            }}
          >
            {/* <ImageButton /> */}
            {isMainScreen && <Heading1>{title}</Heading1>}
          </View>
          {children}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export const NoScrollView = ({ children, bgColor, imgSource, style }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {imgSource ? (
        <ImageBackground
          source={imgSource}
          style={{
            flex: 1,
            resizeMode: "cover",
            justifyContent: "center",
            padding: sizes.base * 2,
            ...style,
          }}
        >
          {children}
        </ImageBackground>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            padding: sizes.base * 2,
            backgroundColor: bgColor || colors.darkprimary,
            ...style,
          }}
        >
          {children}
        </View>
      )}
    </SafeAreaView>
  );
};

export const Card = ({
  children,
  bgColor,
  title,
  style,
  touchable,
  onPress,
}) => {
  const containerStyle = {
    backgroundColor: bgColor || "white",
    padding: sizes.base * 2,
    borderWidth: 0,
    borderRadius: sizes.base,
    alignItems: "stretch",
    elevation: sizes.base / 4,
    shadowOpacity: 0,
    ...style,
  };
  return touchable ? (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      {title && (
        <Heading2
          style={{
            alignSelf: "center",
            marginBottom: sizes.base * 1.25,
            color: bgColor ? "white" : colors.black,
          }}
        >
          {title}
        </Heading2>
      )}
      {children}
    </TouchableOpacity>
  ) : (
    <View style={containerStyle}>
      {title && (
        <Heading2
          style={{
            alignSelf: "center",
            marginBottom: sizes.base * 1.25,
            color: bgColor ? "white" : colors.black,
          }}
        >
          {title}
        </Heading2>
      )}
      {children}
    </View>
  );
};

export const Row = ({ children, style }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        ...style,
      }}
    >
      {children}
    </View>
  );
};

export const Space = ({ children, loose, tight, center }) => {
  const spaceStyle = loose
    ? {
        width: sizes.base * 2,
        height: sizes.base * 2,
      }
    : tight
    ? {
        width: sizes.base / 2,
        height: sizes.base / 2,
      }
    : {
        width: sizes.base,
        height: sizes.base,
      };
  return React.Children.map(children, (c, index) => {
    return index !== children.length - 1 && children.length > 1
      ? [
          c,
          <View
            style={{ ...spaceStyle, alignItems: center ? "center" : null }}
          />,
        ]
      : c;
  });
};

export const Frame = ({ background, children }) => {
  return (
    <ImageBackground
      style={{
        position: "absolute",
        height: sizes.short,
        width: sizes.long,
        alignItems: "center",
        justifyContent: "center",
      }}
      source={background}
    >
      {children}
    </ImageBackground>
  );
};

export const Impress = ({ color, children }) => {
  return (
    <View
      style={{
        backgroundColor: color,
        borderRadius: 999,
        padding: sizes.base,
        paddingHorizontal: sizes.base * 2,
        borderWidth: 8,
        borderColor: hexToRgba(color, 0.12),
        marginBottom: sizes.base / 2,
        alignItems: "center",
      }}
    >
      {children}
    </View>
  );
};
