import React, { useRef, useState } from "react";

import { colors, sizes } from "../../constants";
import {
  ColoredDivider,
  Round,
  ScreenView,
  Space,
} from "../../components/Wrapper";
import { AutoIcon, Button, WhiteButton } from "../../components/Button";
import { StatusBar, View, TextInput, KeyboardAvoidingView } from "react-native";
import { LargeChildInfo } from "./TrackingScreen";
import { IconManager } from "../../utils/image";
import { Heading3 } from "../../components/Typography";
import { hexToRgba } from "../../utils/color";

const children = [
  {
    age: 5,
    gender: "male",
    name: "Ngô Công Hậu",
    height: "120",
    weight: "35",
  },
  {
    age: 3,
    gender: "female",
    name: "Phan Huy Tiến",
    height: "110",
    weight: "53",
  },
];

export const White12Icon = ({ iconSource, title }) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Space tight>
        <Round color={colors.white12} size={sizes.base * 5}>
          <AutoIcon
            source={iconSource}
            color={colors.white}
            height={sizes.base * 2}
          />
        </Round>

        {title && <Heading3 white>{title}</Heading3>}
      </Space>
    </View>
  );
};

export const FlatInput = ({
  onChangeText,
  value,
  keyboardType,
  style,
  color,
}) => {
  if (!color) color = colors.white;
  return (
    <TextInput
      style={{
        backgroundColor: hexToRgba(color, 0.12),
        paddingHorizontal: sizes.base * 1.25,
        borderRadius: sizes.base,
        color: color,
        fontSize: sizes.body,
        alignSelf: "stretch",
        marginBottom: sizes.base,
        textAlign: "center",
        ...style,
      }}
      onChangeText={onChangeText}
      value={value}
      keyboardType={keyboardType || "default"}
    />
  );
};

export const AddRecordScreen = ({ navigation }) => {
  const [height, opChangeHeight] = useState(null);
  const [weight, onChangeWeight] = useState(null);
  const handleSubmit = () => {
    console.log(height);
    navigation.goBack();
  };
  return (
    <ScreenView
      navigation={navigation}
      title="Cập nhật thể trạng"
      bgColor={colors.primary}
      style={{
        alignItems: "center",
        height: sizes.long,
        marginTop: sizes.base,
      }}
      headerColor={colors.primary}
    >
      <Space>
        <LargeChildInfo item={children[0]} />
        <ColoredDivider color={colors.white50} />
        <White12Icon iconSource={IconManager.height} title="Chiều cao (cm)" />
        <FlatInput
          style={{ marginHorizontal: sizes.base * 4 }}
          onChangeText={opChangeHeight}
          value={height}
          keyboardType="numeric"
        />
        <White12Icon iconSource={IconManager.weight} title="Cân nặng (kg)" />
        <FlatInput
          style={{ marginHorizontal: sizes.base * 4 }}
          onChangeText={onChangeWeight}
          value={weight}
          keyboardType="numeric"
        />
        <WhiteButton onPress={handleSubmit}>Hoàn tất</WhiteButton>
      </Space>
    </ScreenView>
  );
};

export default AddRecordScreen;
