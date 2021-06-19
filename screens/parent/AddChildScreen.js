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
import { CollectionName, Gender, HandlingMode } from "../../utils/enum";

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

export const AddRecordScreen = ({ route, navigation }) => {
  const user = useContext(UserContext);
  const { mode, child } = route.params;
  console.log(mode, child);

  const [childName, setChildName] = useState(child?.name ?? "");
  const [selectedGender, setSelectedGender] = useState(
    child?.gender ?? Gender.MALE
  );

  const birthday = child?.birthday?.toDate();
  const [date, setDate] = useState(birthday ?? new Date());

  const [height, onChangeHeight] = useState(null);
  const [weight, onChangeWeight] = useState(null);

  const isValidInput = () => {
    if (!childName || !childName.trim()) {
      Alert.alert("Thông báo", "Chưa nhập họ tên của bé.");
      return false;
    }

    if (date > Date.now()) {
      Alert.alert("Thông báo", "Không thể chọn ngày trong tương lai.");
      return false;
    }

    if (!height || !weight) {
      Alert.alert("Thông báo", "Chưa nhập chiều cao hoặc cân nặng.");
      return false;
    }

    if (isNaN(height) || isNaN(weight)) {
      Alert.alert("Thông báo", "Chiều cao và cân nặng phải là số.");
      return false;
    }

    if (height <= 0 || weight <= 0) {
      console.log(weight);
      Alert.alert(
        "Thông báo",
        "Chiều cao và cân nặng không thể nhỏ hơn hoặc bằng 0."
      );
      return false;
    }

    return true;
  };

  const addChild = () => {
    if (!isValidInput()) return false;

    const newChild = {
      name: childName,
      birthday: date,
      gender: selectedGender,
    };

    // add new child
    firestore()
      .collection(CollectionName.USERS)
      .doc(user?.uid)
      .collection(CollectionName.CHILDREN)
      .add(newChild)
      .then((child) => {
        console.log("Add a new child successfully");

        const healthRecord = {
          height: height,
          weight: weight,
          createdAt: firestore.FieldValue.serverTimestamp(),
        };

        // add new health record
        child
          .collection(CollectionName.HEALTH_RECORDS)
          .add(healthRecord)
          .then((res) => {
            console.log("Add a new health record successfully"),
              child.update({
                healthRecordId: res.id,
              });
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  };

  const updateChild = () => {
    if (!isValidInput()) return false;

    firestore()
      .collection(CollectionName.USERS)
      .doc(user?.uid)
      .collection(CollectionName.CHILDREN)
      .doc(child?._id)
      .update({
        name: childName,
        gender: selectedGender,
        birthday: date,
      })
      .then(() => "Update child successfully");
  };

  const handleSubmit = () => {
    const result = mode === HandlingMode.ADD ? addChild() : updateChild();
    result ?? navigation.goBack();
  };

  const HeightAndWeight = () => {
    if (mode === HandlingMode.ADD) {
      return (
        <View style={{ width: "100%" }}>
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
        </View>
      );
    }
    return <View></View>;
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
          value={childName}
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
        {HeightAndWeight()}
        <FilledButton onPress={handleSubmit}>Hoàn tất</FilledButton>
        {mode === HandlingMode.EDIT ? (
          <OutlinedButton onPress={handleSubmit}>Xóa</OutlinedButton>
        ) : (
          <View></View>
        )}
      </Space>
    </ScreenView>
  );
};

export default AddRecordScreen;
