// react
import React from "react";

// other packages
import { createStackNavigator } from "@react-navigation/stack";

// screens
import {
  AddChildScreen,
  AddRecordScreen,
  FeedScreen,
  GameCatalogueScreen,
  TrackingScreen,
  UserScreen,
  ParentPasswordScreen,
  CreatePasswordScreen,
} from "../screens";
import Tabs from "./tabs";

const Stack = createStackNavigator();

const ParentNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="AddChildScreen" component={AddChildScreen} />
      <Stack.Screen name="AddRecordScreen" component={AddRecordScreen} />
      {/* <Stack.Screen name="FeedScreen" component={FeedScreen} /> */}
      {/* <Stack.Screen
        name="GameCatalogueScreen"
        component={GameCatalogueScreen}
      /> */}
      {/* <Stack.Screen name="TrackingScreen" component={TrackingScreen} /> */}
      {/* <Stack.Screen name="UserScreen" component={UserScreen} /> */}
      <Stack.Screen
        name="ParentPasswordScreen"
        component={ParentPasswordScreen}
      />
      <Stack.Screen
        name="CreatePasswordScreen"
        component={CreatePasswordScreen}
      />
    </Stack.Navigator>
  );
};

export default ParentNavigator;
