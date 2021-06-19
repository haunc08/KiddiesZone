import React, { useContext, useState } from "react";

import { colors, sizes } from "../../constants";
import { Row, ScreenView, Space } from "../../components/Wrapper";
import {
  AutoIcon,
  Button,
  FilledButton,
  OutlinedButton,
} from "../../components/Button";
import { StatusBar, View, Alert } from "react-native";

import { IconManager } from "../../utils/image";
import { hexToRgba } from "../../utils/color";
import { White12Icon, FlatInput } from "./AddRecordScreen";
import { Body } from "../../components/Typography";
import { TouchableOpacity } from "react-native-gesture-handler";
import DatePicker from "react-native-date-picker";
import { CollectionName, Gender } from "../../utils/enum";

import firestore from "@react-native-firebase/firestore";
import { UserContext } from "../../App";

const GenderSelect = ({ selectedGender, setSelectedGender }) => {
  const getBackgroundColor = (gender) => {
    return selectedGender === gender ? "white" : hexToRgba(colors.white, 0.12);
  };

  const getIconColor = (gender) => {
    return selectedGender === gender ? colors.primary : colors.white;
  };

  const getBodyColor = (gender) => {
    return selectedGender === gender ? colors.primary : colors.white;
  };

  return (
    <Row>
      <Space>
        <TouchableOpacity onPress={() => setSelectedGender(Gender.MALE)}>
          <View
            style={{
              backgroundColor: getBackgroundColor(Gender.MALE),
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
                  color={getIconColor(Gender.MALE)}
                  height={16}
                />
                <Body
                  style={{
                    color: getBodyColor(Gender.MALE),
                  }}
                >
                  Nam
                </Body>
              </Space>
            </Row>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedGender(Gender.FEMALE)}>
          <View
            style={{
              backgroundColor: getBackgroundColor(Gender.FEMALE),

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
                  color={getIconColor(Gender.FEMALE)}
                  height={16}
                />
                <Body
                  style={{
                    color: getBodyColor(Gender.FEMALE),
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
  const user = useContext(UserContext);

  const [childName, setChildName] = useState("");
  const [selectedGender, setSelectedGender] = useState(Gender.MALE);
  const [date, setDate] = useState(new Date());

  const [height, onChangeHeight] = useState(null);
  const [weight, onChangeWeight] = useState(null);

  const addChild = () => {
    if (!childName || !childName.trim()) {
      Alert.alert("Thông báo", "Chưa nhập họ tên của bé.");
      return false;
    }

    if (date > Date.now()) {
      Alert.alert("Thông báo", "Không thể chọn ngày trong tương lai.");
      return false;
    }

    const newChild = {
      name: childName,
      birthday: date,
      gender: selectedGender,
    };

    firestore()
      .collection(CollectionName.USERS)
      .doc(user?.uid)
      .collection(CollectionName.CHILDREN)
      .add(newChild)
      .then((child) => {
        console.log("Add a new child successfully");

        // neu user ko nhap height, weight thi xu ly ntn?
        const healthRecord = {
          height: height ?? 0,
          weight: weight ?? 0,
          createdAt: firestore.FieldValue.serverTimestamp(),
        };

        child
          .collection(CollectionName.HEALTH_RECORDS)
          .add(healthRecord)
          .then(() => console.log("Add a new health record successfully"))
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  const handleSubmit = () => {
    // if added child successfully -> addChild is null/undefined, go back user screen
    addChild() ?? navigation.goBack();
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
          onChangeText={setChildName}
          value={height}
        />
        <White12Icon iconSource={IconManager.gender} title="Giới tính" />
        <GenderSelect
          selectedGender={selectedGender}
          setSelectedGender={setSelectedGender}
        />
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
          onChangeText={onChangeHeight}
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
        <FilledButton onPress={handleSubmit}>Hoàn tất</FilledButton>
        <OutlinedButton onPress={handleSubmit}>Xóa</OutlinedButton>
      </Space>
    </ScreenView>
  );
};

export default AddRecordScreen;
