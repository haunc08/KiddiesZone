import React from "react";
import { Animated, View } from "react-native";
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native";
import { Tooltip } from "react-native-elements/dist/tooltip/Tooltip";

import { icons, images, sizes, colors, fonts } from "../constants";
import { autoSize, IconManager, ImageManager } from "../utils/image";
import { playSoundFile } from "../utils/sound";
import { Body, Heading3 } from "./Typography";

export const Button = ({ children, type, onPress, style, small }) => {
  var matchType;
  switch (type) {
    default:
      matchType = {
        background: colors.primary,
        foreground: colors.white,
      };
      break;
    case "secondary":
      matchType = {
        background: colors.smoke,
        foreground: colors.black,
      };
      break;
    case "outlined":
      matchType = {
        background: colors.transparent,
        fore: colors.primary,
        outline: colors.primary,
      };
      break;
  }

  return (
    <TouchableOpacity
      style={{
        padding: sizes.base - 2,
        paddingVertical: small ? sizes.base - 8 : sizes.base - 2,
        backgroundColor: matchType.background,
        alignItems: "center",
        borderRadius: 999,
        borderWidth: matchType.outline && 2,
        borderColor: matchType.outline,
        ...style,
      }}
      onPress={onPress}
    >
      <Text
        style={{
          color: matchType.foreground,
          ...fonts.h3,
          fontSize: 14,
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export const ImageButton = ({
  style,
  source,
  onPress,
  disable,
  block,
  title,
  containerStyle,
  width,
  height,
  color,
}) => {
  const size = autoSize(source, width, height);
  return (
    <TouchableOpacity
      disabled={block}
      onPress={onPress}
      style={{ alignItems: "center", ...containerStyle }}
    >
      {color ? (
        <Image
          style={{
            ...size,
            resizeMode: "contain",
            opacity: disable || block ? 0.25 : 1,
            tintColor: color,
            ...style,
          }}
          source={source}
        />
      ) : (
        <Image
          style={{
            ...size,
            resizeMode: "contain",
            opacity: disable || block ? 0.25 : 1,
            ...style,
          }}
          source={source}
        />
      )}
      {title ? (
        <Heading3 style={{ marginTop: sizes.base }} white>
          {title}
        </Heading3>
      ) : null}
    </TouchableOpacity>
  );
};

export const AutoIcon = ({
  style,
  source,
  disable,
  width,
  height,
  white,
  color,
}) => {
  const size = autoSize(source, width, height);
  if (white || color) {
    return (
      <Image
        style={{
          ...size,
          resizeMode: "contain",
          opacity: disable ? 0.25 : 1,
          tintColor: white ? "white" : color,
          ...style,
        }}
        source={source}
      />
    );
  } else {
    return (
      <Image
        style={{
          ...size,
          resizeMode: "contain",
          opacity: disable ? 0.25 : 1,
          ...style,
        }}
        source={source}
      />
    );
  }
};

// media: [source1, source2, source]
// index: [1]
// width (1/5 cua chieu ngang/rong cua buc hinh)
// height  (1/5 cua chieu ngang/rong cua buc hinh)
// top, right, left, bottom (dich sang ben ... n lan 1/5 cua chieu ngang/rong cua buc hinh)
export const StoryObject = ({
  media,
  index,
  width,
  height,
  top,
  right,
  left,
  bottom,
  background,
}) => {
  const { sprites, name, audio } = media;
  const calcWidth = (flex) => {
    return (sizes.long * flex) / 5;
  };
  const calcHeight = (flex) => {
    return (sizes.short * flex) / 5;
  };
  let size;
  if (sprites)
    size = autoSize(sprites[index], calcWidth(width), calcHeight(height));
  else {
    size = { width: calcWidth(width), height: calcHeight(height) };
  }
  return (
    <View
      style={{
        position: "absolute",
      }}
    >
      <View
        style={{
          marginTop: top ? calcHeight(top) : 0,
          marginBottom: bottom ? calcHeight(bottom) : 0,
          marginRight: right ? calcWidth(right) : 0,
          marginLeft: left ? calcWidth(left) : 0,
        }}
      >
        {!name ? (
          <TouchableOpacity
            onPress={() => {
              playSoundFile(audio);
            }}
          >
            <Image
              style={{
                ...size,
                resizeMode: "contain",
              }}
              source={sprites[index]}
            />
          </TouchableOpacity>
        ) : (
          <Tooltip
            skipAndroidStatusBar={true}
            backgroundColor="white"
            popover={<Text>{name}</Text>}
            width={100}
            withOverlay={false}
            onOpen={() => {
              playSoundFile(audio);
            }}
          >
            {background && (
              <View
                style={{
                  width: size.width,
                  height: size.height,
                }}
              />
            )}
            {!background && (
              <Image
                style={{
                  ...size,
                  resizeMode: "contain",
                }}
                source={sprites[index]}
              />
            )}
          </Tooltip>
        )}
      </View>
    </View>
  );
};

// neu can dung transy animated thi tu them vo
export const GameObject = ({
  image,
  width,
  height,
  transX,
  transY,
  onPress,
  disable,
  correct,
}) => {
  transX = transX || 0;
  transY = transY || 0;
  const calcWidth = (flex) => {
    return (sizes.long * flex) / 5;
  };
  const calcHeight = (flex) => {
    return (sizes.short * flex) / 5;
  };
  let size;
  if (image) size = autoSize(image, calcWidth(width), calcHeight(height));
  else {
    size = { width: calcWidth(width), height: calcHeight(height) };
  }
  return (
    <View
      style={{
        position: "absolute",
      }}
    >
      <Animated.View
        style={{
          transform: [
            {
              translateX:
                typeof transX === "object"
                  ? transX.interpolate({
                      inputRange: [-5, 5],
                      outputRange: [-sizes.long, sizes.long],
                    })
                  : calcWidth(transX),
            },
            {
              translateY: calcHeight(transY),
            },
          ],
        }}
      >
        {disable ? (
          <Image
            style={{
              ...size,
              resizeMode: "contain",
            }}
            source={correct ? IconManager.correct : image}
          />
        ) : (
          <TouchableOpacity onPress={() => onPress()}>
            <Image
              style={{
                ...size,
                resizeMode: "contain",
              }}
              source={correct ? IconManager.correct : image}
            />
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );
};

export const WhiteButton = ({ onPress, color, children }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderRadius: 999,
        backgroundColor: colors.white,
        padding: sizes.base,
        paddingHorizontal: sizes.base * 2,
      }}
    >
      <Heading3
        style={{ color: color || colors.primary, fontSize: sizes.body }}
      >
        {children}
      </Heading3>
    </TouchableOpacity>
  );
};
