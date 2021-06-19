import React, { useContext, useEffect, useRef, useState } from "react";

import { colors, sizes } from "../../constants";
import { Row, ScreenView, Space, Card } from "../../components/Wrapper";
import {
  AutoIcon,
  Button,
  FilledButton,
  OutlinedButton,
} from "../../components/Button";
import { StatusBar, View, Alert } from "react-native";

import { IconManager } from "../../utils/image";
import { hexToRgba } from "../../utils/color";
import { White12Icon, FlatInput } from "./AddRecordScreen";
import { Body, Heading2, Heading3 } from "../../components/Typography";
import { TouchableOpacity } from "react-native-gesture-handler";

import { UserContext } from "../../App";

export const ChangeNameScreen = ({ navigation }) => {
  const user = useContext(UserContext);
  const [newName, setNewName] = useState(user?.displayName);

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
              <FilledButton buttonColor={colors.primary} color={colors.white}>
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
                value="Phan Huy Tiến"
                secureTextEntry
                color={colors.darkgray}
              />
              <Heading3>Mật khẩu mới</Heading3>
              <FlatInput
                value="Phan Huy Tiến"
                secureTextEntry
                color={colors.darkgray}
              />
              <FilledButton buttonColor={colors.primary} color={colors.white}>
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
