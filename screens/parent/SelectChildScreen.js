import React, { useContext } from "react";

import { colors, sizes } from "../../constants";
import { ScreenView, Space } from "../../components/Wrapper";
import { View, TouchableOpacity } from "react-native";

import { ChildCard } from "./GameCatalogueScreen";

import firestore from "@react-native-firebase/firestore";
import { ChildrenContext } from "../../navigation/ParentNavigator";

export const SelectChildScreen = ({ navigation }) => {
  const children = useContext(ChildrenContext);

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
        {children.map((child, index) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("KidsZone", { child: child })}
          >
            <ChildCard item={child} key={index} cardColor={colors.white12} />
          </TouchableOpacity>
        ))}
      </Space>
    </ScreenView>
  );
};

export default SelectChildScreen;
