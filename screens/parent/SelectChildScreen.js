import React, { useContext, useState } from "react";

import { colors, sizes } from "../../constants";
import { Row, ScreenView, Space } from "../../components/Wrapper";
import { AutoIcon, Button, FilledButton } from "../../components/Button";
import { StatusBar, View, Alert } from "react-native";

import { IconManager } from "../../utils/image";
import { hexToRgba } from "../../utils/color";
import { White12Icon, FlatInput } from "./AddRecordScreen";
import { Body } from "../../components/Typography";
import { TouchableOpacity } from "react-native-gesture-handler";
import DatePicker from "react-native-date-picker";
import { CollectionName, Gender } from "../../utils/enum";
import { ChildCard } from "./GameCatalogueScreen";

import firestore from "@react-native-firebase/firestore";
import { UserContext } from "../../App";

const children = [
  {
    age: 5,
    gender: "male",
    name: "Ngô Công Hậu",
  },
  {
    age: 3,
    gender: "female",
    name: "Phan Huy Tiến",
  },
];

export const SelectChildScreen = ({ navigation }) => {
  return (
    <ScreenView
      navigation={navigation}
      title="Chọn bé"
      style={{ alignItems: "stretch" }}
      bgColor={colors.grass}
      headerColor={colors.grass}
    >
      <View style={{ height: sizes.base }} />
      <Space>
        {children.map((c, i) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("KidsZone", { child: c })}
          >
            <ChildCard item={c} key={i} cardColor={colors.white12} />
          </TouchableOpacity>
        ))}
      </Space>
    </ScreenView>
  );
};

export default SelectChildScreen;
