import React, { useEffect } from "react";

import { sizes } from "../constants";
import { Card, Row, ScreenView, Space } from "../components/Wrapper";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";
import Orientation from "react-native-orientation-locker";
import { HorizontalList } from "../components/HorizontalList";

export const TestScreenHorizontal = () => {
  useEffect(() => {
    Orientation.lockToLandscapeLeft();
  }, []);
  const games = [
    {
      key: "sandbox",
      name: "Vẽ trên cát",
    },
    {
      key: "counting",
      name: "Đếm số",
    },
    {
      key: "spelling",
      name: "Đánh vần",
    },
    {
      key: "reading",
      name: "Đọc truyện",
    },
  ];
  return (
    <ScreenView horizontal>
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
        <HorizontalList title="Tất cả game" data={games} />
      </Space>
    </ScreenView>
  );
};

export default TestScreenHorizontal;
