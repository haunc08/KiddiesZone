import React, { useRef, useState } from "react";

import { colors, sizes } from "../../constants";
import {
  Card,
  ColoredDivider,
  Round,
  Row,
  ScreenView,
  Space,
} from "../../components/Wrapper";
import { AutoIcon, Button, WhiteButton } from "../../components/Button";
import { HorizontalList } from "../../components/HorizontalList";
import { StatusBar, View, TextInput, KeyboardAvoidingView } from "react-native";
import { LargeChildInfo } from "./TrackingScreen";
import { Divider } from "react-native-elements/dist/divider/Divider";
import { IconManager } from "../../utils/image";
import { Heading3 } from "../../components/Typography";
import { hexToRgba } from "../../utils/color";
import { White12Icon, FlatInput } from "./AddRecordScreen";
import { Body } from "../../components/Typography";
import { TouchableOpacity } from "react-native-gesture-handler";
import DatePicker from "react-native-date-picker";

const GenderSelect = () => {
  const [selected, setSelected] = useState(0);
  return (
    <Row>
      <Space>
        <TouchableOpacity>
          <View
            style={{
              backgroundColor:
                selected === 0 ? "white" : hexToRgba(colors.white, 0.12),
              paddingHorizontal: sizes.base * 1.25,
              borderRadius: sizes.base,
              fontSize: sizes.body,
              alignSelf: "stretch",
              marginBottom: sizes.base,
              textAlign: "center",
              padding: sizes.base * 0.75,
            }}
          >
            <Row>
              <Space tight>
                <AutoIcon
                  source={IconManager.male}
                  color={selected === 0 ? colors.primary : colors.white}
                  height={16}
                />
                <Body
                  style={{
                    color: selected === 0 ? colors.primary : colors.white,
                  }}
                >
                  Nam
                </Body>
              </Space>
            </Row>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={{
              backgroundColor:
                selected === 1 ? "white" : hexToRgba(colors.white, 0.12),

              paddingHorizontal: sizes.base * 1.25,
              borderRadius: sizes.base,
              fontSize: sizes.body,
              alignSelf: "stretch",
              marginBottom: sizes.base,
              textAlign: "center",
              padding: sizes.base * 0.75,
            }}
          >
            <Row>
              <Space tight>
                <AutoIcon
                  source={IconManager.male}
                  color={selected === 1 ? colors.primary : colors.white}
                  height={16}
                />
                <Body
                  style={{
                    color: selected === 1 ? colors.primary : colors.white,
                  }}
                >
                  Nữ
                </Body>
              </Space>
            </Row>
          </View>
        </TouchableOpacity>
      </Space>
    </Row>
  );
};

export const AddRecordScreen = ({ navigation }) => {
  const [height, opChangeHeight] = useState(null);
  const [weight, onChangeWeight] = useState(null);
  const [date, setDate] = useState(new Date());
  const handleSubmit = () => {
    console.log(height);
    navigation.goBack();
  };

  return (
    <ScreenView
      navigation={navigation}
      title="Thêm con"
      style={{ alignItems: "center" }}
      bgColor={colors.primary}
      headerColor={colors.primary}
    >
      <View style={{ height: sizes.base }} />
      <Space>
        <White12Icon iconSource={IconManager.name} title="Họ và tên" />
        <FlatInput
          style={{ marginHorizontal: sizes.base * 2 }}
          onChangeText={opChangeHeight}
          value={height}
        />
        <White12Icon iconSource={IconManager.gender} title="Giới tính" />
        <GenderSelect />
        <White12Icon iconSource={IconManager.cake} title="Ngày sinh" />
        <DatePicker
          date={date}
          onDateChange={setDate}
          androidVariant="iosClone"
          fadeToColor="none"
          textColor="white"
          mode="date"
        />
        <White12Icon iconSource={IconManager.height} title="Chiều cao (cm)" />
        <FlatInput
          style={{ marginHorizontal: sizes.base * 6 }}
          onChangeText={opChangeHeight}
          value={height}
          keyboardType="numeric"
        />
        <White12Icon iconSource={IconManager.weight} title="Cân nặng (kg)" />
        <FlatInput
          style={{ marginHorizontal: sizes.base * 6 }}
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
