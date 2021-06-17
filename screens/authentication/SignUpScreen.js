import React, { useEffect, useState } from "react";

import { sizes } from "../../constants";
import { Card, NoScrollView, Row } from "../../components/Wrapper";
import { TextInput } from "../../components/TextInput";
import { Button } from "../../components/Button";
import { Body } from "../../components/Typography";
import { Alert, View, ActivityIndicator } from "react-native";

// firebase
// import { firebase } from "../../database";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { collectionName } from "../../utils/collection";

const SignUpScreen = ({ navigation }) => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (errorMessage !== "") {
      Alert.alert("Thông báo", errorMessage);
    }
  }, [errorMessage]);

  const reset = () => {
    setDisplayName("");
    setEmail("");
    setPassword("");
    setIsLoading(false);
  };

  const registerUser = () => {
    if (email === "" || password === "") {
      setErrorMessage("Không thể để trống email hoặc password!");
      Alert.alert("Thông báo", errorMessage, [
        { text: "OK", onPress: () => setErrorMessage("") },
      ]);
    } else {
      setIsLoading(true);

      auth()
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          const { uid } = auth().currentUser;

          res.user
            .updateProfile({
              displayName: displayName,
            })
            .then(() => {
              // firebase
              //   .database()
              //   .ref("users/" + firebase.auth().currentUser.uid + "/profile")
              //   .set({ name: firebase.auth().currentUser.displayName });
              // addDefaultDatabase(uid);
              firestore()
                .collection(collectionName.USERS)
                .doc(uid)
                .set({ name: displayName })
                .then(() => console.log("Add firestore successfully"))
                .catch((error) => console.log(error));
            });
          console.log("User registered successfully!");

          reset();
          navigation.navigate("SignIn");
        })
        .catch((error) => {
          // set isLoading to false b/c if not, SignUpScreen will return Loading screen and stay there
          setIsLoading(false);

          //console.log(error);
          if (error.code === "auth/email-already-in-use") {
            setErrorMessage("Tài khoản đã được sử dụng.");
          } else if (error.code === "auth/invalid-email") {
            setErrorMessage("Email không hợp lệ!");
          } else if (error.code === "auth/weak-password") {
            setErrorMessage(
              "Mật khẩu không hợp lệ, tối thiểu phải có 6 ký tự!"
            );
          }
          Alert.alert("Thông báo", errorMessage, [
            { text: "OK", onPress: () => setErrorMessage("") },
          ]);
          console.log(error);
        });
    }
  };

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <NoScrollView>
      <Card title="Đăng ký">
        <TextInput
          label="Họ tên"
          placeholder="Họ tên"
          onChangeText={(val) => setDisplayName(val)}
        />
        <TextInput
          label="Email"
          placeholder="Email"
          onChangeText={(val) => setEmail(val)}
        />
        <TextInput
          label="Mật khẩu"
          placeholder="••••••"
          onChangeText={(val) => setPassword(val)}
          secureTextEntry={true}
        />
        <Row style={{ marginTop: sizes.base }}>
          <Button
            style={{ flex: 0.5, marginRight: sizes.base / 2 }}
            type="secondary"
            onPress={() => navigation.navigate("SignIn")}
          >
            Trở về
          </Button>
          <Button
            style={{ flex: 0.5, marginLeft: sizes.base / 2 }}
            onPress={() => registerUser()}
          >
            Xác nhận
          </Button>
        </Row>
      </Card>
      <Body
        white
        center
        style={{ marginHorizontal: sizes.base, marginTop: sizes.base }}
      >
        Bằng việc tạo tài khoản, bạn đã đồng ý với điều khoản và điều kiện của
        chúng tôi.
      </Body>
    </NoScrollView>
  );
};

export default SignUpScreen;
