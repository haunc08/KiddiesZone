import React from "react";
import { SafeAreaView, Text } from "react-native";

import { icons, images, SIZES, COLORS, FONTS } from "../constants";

export const ScreenView = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      {children}
    </SafeAreaView>
  );
};
