import React, { useContext, useRef, useState } from "react";

import { colors, sizes } from "../../constants";
import {
  ColoredDivider,
  Round,
  ScreenView,
  Space,
} from "../../components/Wrapper";
import { AutoIcon, Button, WhiteButton } from "../../components/Button";
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

export const AddRecordScreen = ({ route, navigation }) => {
  const user = useContext(UserContext);
  const { child, record, mode } = route.params;

  const [height, onChangeHeight] = useState(record?.height);
  const [weight, onChangeWeight] = useState(record?.weight);

  const healthRecordsRef = firestore()
    .collection(CollectionName.USERS)
    .doc(user?.uid)
    .collection(CollectionName.CHILDREN)
    .doc(child?._id)
    .collection(CollectionName.HEALTH_RECORDS);

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
    console.log(heightRef);
    const newHealthRecord = {
      height: height,
      weight: weight,
      createdAt: firestore.FieldValue.serverTimestamp(),
    };

    healthRecordsRef
      .add(newHealthRecord)
      .then(() => console.log("Add a new health record successfully"))
      .catch((error) => console.log(error));
  };

  const editHealthRecord = () => {
    if (!isValidInput()) return false;

    healthRecordsRef
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
        <WhiteButton onPress={handleSubmit}>Hoàn tất</WhiteButton>
      </Space>
    </ScreenView>
  );
};

export default AddRecordScreen;
