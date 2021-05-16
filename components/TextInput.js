import React from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";

import { icons, images, sizes, colors, fonts } from "../constants";
import { Icon, Input } from "react-native-elements";
import { Card } from "./Wrapper";

export const TextInput = (props) => {
  return (
    <Input
      label="Text Input"
      placeholder="Placeholder"
      leftIcon={{ type: "material", name: "mail", color: colors.black }}
      labelStyle={{ color: colors.black }}
      leftIconContainerStyle={{ marginRight: sizes.base / 2 }}
      containerStyle={styles.container}
      inputContainerStyle={styles.inputContainer}
      errorStyle={styles.error}
      errorMessage={null}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 0,
  },
  inputContainer: {
    margin: 0,
    padding: 0,
    borderWidth: 0,
  },
  error: {
    color: colors.red,
    alignSelf: "flex-end",
  },
});
