import React, { useContext, useRef, useState } from "react";

import { colors, sizes } from "../../constants";
import {
  ColoredDivider,
  Round,
  ScreenView,
  Space,
} from "../../components/Wrapper";
import {
  AutoIcon,
  Button,
  FilledButton,
  OutlinedButton,
} from "../../components/Button";
import {
  StatusBar,
  View,
  TextInput,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { LargeChildInfo } from "./TrackingScreen";
import { IconManager } from "../../utils/image";
import { Heading3 } from "../../components/Typography";
import { hexToRgba } from "../../utils/color";

// firebase
import firestore from "@react-native-firebase/firestore";
import { CollectionName, HandlingMode } from "../../utils/enum";
import { UserContext } from "../../App";

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
  secureTextEntry,
  placeholder,
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
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
    />
  );
};

export const AddRecordScreen = ({ route, navigation }) => {
  const user = useContext(UserContext);
  const { child, record, mode } = route.params;

  const [height, onChangeHeight] = useState(record?.height);
  const [weight, onChangeWeight] = useState(record?.weight);

  const curChild = firestore()
    .collection(CollectionName.USERS)
    .doc(user?.uid)
    .collection(CollectionName.CHILDREN)
    .doc(child?._id);

  const isValidInput = () => {
    if (!height || !weight) {
      Alert.alert("Thông báo", "Nhập thông tin vào ô trống.");
      return false;
    }
    if (height < 0 || weight < 0) {
      Alert.alert("Thông báo", "Các chỉ số không được nhỏ hơn 0.");
      return false;
    }
    return true;
  };

  const addHealthRecord = () => {
    if (!isValidInput()) return false;

    const newHealthRecord = {
      height: height,
      weight: weight,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };

    curChild
      .collection(CollectionName.HEALTH_RECORDS)
      .add(newHealthRecord)
      .then((res) => {
        console.log("Add a new health record successfully");
        curChild.update({
          healthRecordId: res.id,
        });
      })
      .catch((error) => console.log(error));
  };

  const editHealthRecord = () => {
    if (!isValidInput()) return false;

    curChild
      .collection(CollectionName.HEALTH_RECORDS)
      .doc(record?._id)
      .update({
        height: height,
        weight: weight,
      })
      .then(() => console.log("Edit a health record successfully"))
      .catch((error) => console.log(error));
  };

  const handleSubmit = () => {
    const result =
      mode === HandlingMode.ADD ? addHealthRecord() : editHealthRecord();

    result ?? navigation.goBack();
  };

  const deleteHealthRecord = async () => {
    await curChild
      .collection(CollectionName.HEALTH_RECORDS)
      .doc(record?._id)
      .delete()
      .then(() => console.log("Deleted health record"));

    // TODO: update healthRecordId field in child (unnecessary b/c not use this field)
  };

  const handleDeleteRecord = () => {
    Alert.alert("Thông báo", "Bạn có muốn xóa thông tin sức khỏe này không?", [
      {
        text: "OK",
        onPress: () => {
          deleteHealthRecord();
          navigation.goBack();
        },
      },
      { text: "Cancel", onPress: () => {} },
    ]);
  };

  return (
    <ScreenView
      navigation={navigation}
      title="Cập nhật thể trạng"
      bgColor={colors.primary}
      style={{
        alignItems: "center",
        marginTop: sizes.base,
      }}
      headerColor={colors.primary}
    >
      <Space>
        <LargeChildInfo item={child} />
        <ColoredDivider color={colors.white50} />
        <White12Icon iconSource={IconManager.height} title="Chiều cao (cm)" />
        <FlatInput
          style={{ marginHorizontal: sizes.base * 4 }}
          onChangeText={onChangeHeight}
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
        <FilledButton onPress={handleSubmit}>Hoàn tất</FilledButton>
        {mode === HandlingMode.EDIT ? (
          <OutlinedButton onPress={handleDeleteRecord}>Xóa</OutlinedButton>
        ) : (
          <View></View>
        )}
      </Space>
    </ScreenView>
  );
};

export default AddRecordScreen;
