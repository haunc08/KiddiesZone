import React from "react";

import { sizes } from "../constants";
import { Card, Row, ScreenView, Space } from "../components/Wrapper";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";
import { GameList } from "../components/GameList";

export const KidsZoneScreen = () => {
  return (
    <ScreenView>
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
          </Space>
        </Card>
        <Card title="Test button">
          <Space>
            <Button>Primary button</Button>
            <Button type="secondary">Secondary button</Button>
            <Button type="outlined">Outlined button</Button>
          </Space>
        </Card>
        <GameList />
      </Space>
    </ScreenView>
  );
};
