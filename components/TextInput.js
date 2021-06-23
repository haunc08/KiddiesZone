import React from "react";
import { StyleSheet } from "react-native";

import { sizes, colors } from "../constants";
import { Input } from "react-native-elements";

export const TextInput = (props) => {
  const { label, placeholder } = props;

  return (
    <Input
      label={label}
      placeholder={placeholder}
      // leftIcon={{ type: "material", name: "mail", color: colors.black }}
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
