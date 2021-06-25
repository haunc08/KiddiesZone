import React, { useEffect, useState } from "react";
import { Alert } from "react-native";

import { sizes } from "../../constants";
import { Card, NoScrollView, Row } from "../../components/Wrapper";
import { TextInput } from "../../components/TextInput";
import { Button } from "../../components/Button";
import Orientation from "react-native-orientation-locker";

// firebase
// import * as firebase from "firebase";
import auth from "@react-native-firebase/auth";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    Orientation.lockToPortrait();
  }, []);

  useEffect(() => {
    if (errorMessage !== "") {
      Alert.alert("Thông báo", errorMessage);
    }
  }, [errorMessage]);

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const userLogin = () => {
    if (email === "" || password === "") {
      setErrorMessage("Không thể để trống email hoặc password!");
      Alert.alert("Thông báo", errorMessage, [
        { text: "OK", onPress: () => setErrorMessage("") },
      ]);
    } else {
      // setIsLoading(true);

      auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          console.log("User logged-in successfully!");
          reset();
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            setErrorMessage("Tài khoản đã được sử dụng.");
          } else if (error.code === "auth/invalid-email") {
            setErrorMessage("Email không hợp lệ!");
          } else if (
            error.code === "auth/wrong-password" ||
            error.code === "auth/user-not-found"
          ) {
            setErrorMessage("Email hoặc mật khẩu không đúng.");
          }
          Alert.alert("Thông báo", errorMessage, [
            { text: "OK", onPress: () => setErrorMessage("") },
          ]);
          console.log(error);
        });

      // Notifications.dismissAllNotificationsAsync();
      // askPermissions();
    }
  };

  return (
    <NoScrollView imgSource={require("../../assets/images/kidszone2.jpg")}>
      <Card title="Đăng nhập">
        <TextInput
          label="Email"
          placeholder="Email"
          onChangeText={(val) => setEmail(val)}
        />
        <TextInput
          label="Mật khẩu"
          placeholder="Mật khẩu"
          onChangeText={(val) => setPassword(val)}
          secureTextEntry={true}
        />
        <Row style={{ marginTop: sizes.base }}>
          <Button
            style={{ flex: 0.5, marginRight: sizes.base / 2 }}
            type="secondary"
            onPress={() => navigation.navigate("SignUp")}
          >
            Đăng ký
          </Button>
          <Button
            style={{ flex: 0.5, marginLeft: sizes.base / 2 }}
            onPress={() => userLogin()}
          >
            Đăng nhập
          </Button>
        </Row>
      </Card>
    </NoScrollView>
  );
};

export default SignInScreen;
