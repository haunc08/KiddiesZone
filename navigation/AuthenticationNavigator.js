// react
import React from "react";

// other packages
import { createStackNavigator } from "@react-navigation/stack";

// screens
import { SignInScreen, SignUpScreen } from "../screens";

const Stack = createStackNavigator();

const AuthenticationNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthenticationNavigator;
