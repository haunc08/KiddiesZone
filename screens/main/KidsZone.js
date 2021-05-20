import React, { useEffect } from "react";

import { sizes } from "../../constants";
import { Card, Row, ScreenView, Space } from "../../components/Wrapper";
import { TextInput } from "../../components/TextInput";
import { Button } from "../../components/Button";
import { GameList } from "../../components/GameList";
import Orientation from "react-native-orientation-locker";
import { Body } from "../../components/Typography";

export const KidsZone = () => {
  useEffect(() => {
    Orientation.lockToLandscapeLeft();
  }, []);
  return (
    <ScreenView horizontal>
      <Space row>
        <Body>Ok</Body>
      </Space>
    </ScreenView>
  );
};

export default KidsZone;
