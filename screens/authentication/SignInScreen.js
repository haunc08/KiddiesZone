import React from "react";

import { sizes } from "../../constants";
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

const SignInScreen = ({ navigation }) => {
  return (
    <NoScrollView>
      <Card title="Đăng nhập">
        <TextInput />
        <TextInput />
        <Row style={{ marginTop: sizes.base }}>
          <Button
            style={{ flex: 0.5, marginRight: sizes.base / 2 }}
            type="secondary"
          >
            Đăng ký
          </Button>
          <Button style={{ flex: 0.5, marginLeft: sizes.base / 2 }}>
            Đăng nhập
          </Button>
        </Row>
      </Card>
    </NoScrollView>
  );
};

export default SignInScreen;
