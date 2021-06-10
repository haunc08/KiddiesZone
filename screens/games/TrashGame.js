import React from "react";
import { View } from "react-native";
import { ImageButton } from "../../components/Button";
import { Frame } from "../../components/Wrapper";
import { IconManager, ImageManager } from "../../utils/image";

const TrashGame = ({ navigation }) => {
  return (
    <View>
      <Frame background={ImageManager.ground}>
        <ImageButton
          small
          source={IconManager.back}
          onPress={() => navigation.goBack()}
        />
      </Frame>
    </View>
  );
};

export default TrashGame;
