import React, { useEffect } from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import Orientation from "react-native-orientation-locker";

const GameCountNumberScreen = () => {
  useEffect(() => {
    Orientation.lockToLandscapeLeft();
  }, []);

  return (
    <View>
      <TouchableOpacity>
        <Text>ZZZ</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GameCountNumberScreen;
