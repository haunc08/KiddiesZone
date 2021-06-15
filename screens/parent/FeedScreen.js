import React from "react";

import { sizes } from "../../constants";
import { Card, Row, ScreenView, Space } from "../../components/Wrapper";
import { TextInput } from "../../components/TextInput";
import { Button } from "../../components/Button";
import { HorizontalList } from "../../components/HorizontalList";
import { StatusBar } from "react-native";

export const FeedScreen = ({ navigation }) => {
  return (
    <ScreenView isMainScreen navigation={navigation} title="Bài viết">
      <Space>
        <Card>
          <Space>
            <TextInput />
            <Row>
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
            <Row>
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
          </Space>
        </Card>
        <Card title="Test button">
          <Space>
            <Button>Primary button</Button>
            <Button type="secondary">Secondary button</Button>
            <Button type="outlined">Outlined button</Button>
          </Space>
        </Card>
        <Card title="Test button">
          <Space>
            <Button>Primary button</Button>
            <Button type="secondary">Secondary button</Button>
            <Button type="outlined">Outlined button</Button>
          </Space>
        </Card>
        <Card title="Test button">
          <Space>
            <Button>Primary button</Button>
            <Button type="secondary">Secondary button</Button>
            <Button type="outlined">Outlined button</Button>
          </Space>
        </Card>
        {/* <HorizontalList title="Tất cả game" data={games} /> */}
      </Space>
    </ScreenView>
  );
};

export default FeedScreen;
