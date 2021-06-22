import React, { useContext, useEffect, useState } from "react";

import { colors, sizes } from "../../constants";
import { ScreenView, Space, Card } from "../../components/Wrapper";
import { AutoIcon, FilledButton } from "../../components/Button";
import { View } from "react-native";

import { IconManager } from "../../utils/image";
import { FlatInput } from "./AddRecordScreen";
import { Body, Heading3 } from "../../components/Typography";

import { UserContext } from "../../App";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { CollectionName } from "../../utils/enum";
import { Alert } from "react-native";

export const ChangeNameScreen = ({ navigation }) => {
  const user = useContext(UserContext);

  const [newName, setNewName] = useState(user?.name);
  const [curPassword, setCurPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (errorMessage !== "") {
      Alert.alert("Thông báo", errorMessage, [
        { text: "OK", onPress: () => setErrorMessage("") },
      ]);
    }
  }, [errorMessage]);

  const updateUserName = async () => {
    await auth()
      .currentUser.updateProfile({
        displayName: newName,
      })
      .then(async () => {
        await auth().currentUser.reload();

        firestore()
          .collection(CollectionName.USERS)
          .doc(user?.uid)
          .update({
            name: newName,
          })
          .then(() => {
            Alert.alert("Thông báo", "Bạn đã cập nhật thông tin thành công.");
          })
          .catch((error) => console.log(error));
      });
  };

  const updatePassword = async () => {
    if (!curPassword.trim() || !newPassword.trim()) {
      setErrorMessage("Không thể để trống password!");
      Alert.alert("Thông báo", errorMessage, [
        { text: "OK", onPress: () => setErrorMessage("") },
      ]);
    } else {
      const emailCredential = auth.EmailAuthProvider.credential(
        user?.email,
        curPassword
      );

      await auth()
        .currentUser.reauthenticateWithCredential(emailCredential)
        .then(() => {
          auth()
            .currentUser.updatePassword(newPassword)
            .then(() => {
              Alert.alert("Thông báo", "Bạn đã cập nhật mật khẩu thành công.");
              setCurPassword("");
              setnewPassword("");
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => {
          if (error.code === "auth/wrong-password") {
            setErrorMessage("Mật khẩu không đúng.");
          }
        });
    }
  };

  return (
    <ScreenView navigation={navigation} title="Cài đặt tài khoản">
      <Space>
        <Card title="Thay đổi thông tin">
          <View style={{ alignItems: "center" }}>
            <Space>
              <AutoIcon source={IconManager.avatar} width={sizes.short / 3} />
              <Body color={colors.fadeblack50}>{user?.email}</Body>
              <Heading3>Họ và tên</Heading3>
              <FlatInput
                value={newName}
                color={colors.darkgray}
                onChangeText={setNewName}
              />
              <FilledButton
                buttonColor={colors.primary}
                color={colors.white}
                onPress={updateUserName}
              >
                Lưu thay đổi
              </FilledButton>
            </Space>
          </View>
        </Card>
        <Card title="Thay đổi mật khẩu">
          <View style={{ alignItems: "center" }}>
            <Space>
              <AutoIcon
                source={IconManager.password}
                color={colors.fadeblack50}
                width={sizes.short / 5}
              />
              <Heading3>Mật khẩu cũ</Heading3>
              <FlatInput
                value={curPassword}
                secureTextEntry
                color={colors.darkgray}
                onChangeText={setCurPassword}
                placeholder="••••••"
              />
              <Heading3>Mật khẩu mới</Heading3>
              <FlatInput
                value={newPassword}
                secureTextEntry
                color={colors.darkgray}
                onChangeText={setnewPassword}
                placeholder="••••••"
              />
              <FilledButton
                buttonColor={colors.primary}
                color={colors.white}
                onPress={updatePassword}
              >
                Lưu thay đổi
              </FilledButton>
            </Space>
          </View>
        </Card>
      </Space>
    </ScreenView>
  );
};

export default ChangeNameScreen;
