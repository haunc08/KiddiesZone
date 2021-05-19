import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { Restaurant, OrderDelivery } from "./screens";
import Tabs from "./navigation/tabs";
import { firebase, firebaseConfig } from "./database";
import { useAuthState } from "react-firebase-hooks/auth";
import AuthenticationNavigator from "./navigation/AuthenticationNavigator";
import { Heading1 } from "./components/Typography";
import { View } from "react-native";
import { NoScrollView } from "./components/Wrapper";
import KidsZone from "./screens/main/KidsZone";
import TestScreenHorizontal from "./screens/TestScreenHorizontal";

const Stack = createStackNavigator();

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const DisplayedScreens = () => {
  const [user, loading, error] = useAuthState(firebase.auth());

  if (user) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={"Home"}
        >
          <Stack.Screen name="Home" component={Tabs} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <AuthenticationNavigator />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    // <NavigationContainer>
    //   <Stack.Navigator
    //     screenOptions={{
    //       headerShown: false,
    //     }}
    //     initialRouteName={"Home"}
    //   >
    //     <Stack.Screen name="Home" component={Tabs} />
    //     <Stack.Screen name="Restaurant" component={Restaurant} />
    //     <Stack.Screen name="OrderDelivery" component={OrderDelivery} />
    //   </Stack.Navigator>
    // </NavigationContainer>

    <TestScreenHorizontal />
  );
};

export default App;
