import React from "react";

import { colors, sizes } from "../../constants";
import {
  Card,
  NoScrollView,
  Row,
  ScreenView,
  Space,
} from "../../components/Wrapper";
import { TextInput } from "../../components/TextInput";
import { Button } from "../../components/Button";
import { GameList } from "../../components/GameList";
import { Body } from "../../components/Typography";
import { ImageBackground, SafeAreaView } from "react-native";

const SignUpScreen = ({ navigation }) => {
  return (
    <NoScrollView>
      <Card title="Đăng ký">
        <TextInput />
        <TextInput />
        <TextInput />
        <Row style={{ marginTop: sizes.base }}>
          <Button
            style={{ flex: 0.5, marginRight: sizes.base / 2 }}
            type="secondary"
          >
            Trở về
          </Button>
          <Button style={{ flex: 0.5, marginLeft: sizes.base / 2 }}>
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
