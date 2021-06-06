import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import { GameAlphabet, GameCountNumberScreen } from "./screens";
import Tabs from "./navigation/tabs";
import { firebase, firebaseConfig } from "./database";
import { useAuthState } from "react-firebase-hooks/auth";
import AuthenticationNavigator from "./navigation/AuthenticationNavigator";
import KidsZone from "./screens/main/KidsZone";
import Sandbox from "./screens/games/Sandbox";
import { Stories } from "./screens/games/Stories";
import Story from "./screens/games/Story";
import Movies from "./screens/games/Movies";
import Shapes from "./screens/games/Shapes";

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
    <NavigationContainer>
      <Stack.Navigator
        name="ok"
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={"KidsZone"}
      >
        <Stack.Screen name="KidsZone" component={KidsZone} />
        <Stack.Screen name="Sandbox" component={Sandbox} />
        <Stack.Screen name="Shapes" component={Shapes} />
        <Stack.Screen name="Stories" component={Stories} />
        <Stack.Screen
          name="GameCountNumberScreen"
          component={GameCountNumberScreen}
        />
        <Stack.Screen name="Story" component={Story} />
        <Stack.Screen name="Movies" component={Movies} />
        <Stack.Screen name="GameAlphabet" component={GameAlphabet} />
      </Stack.Navigator>
    </NavigationContainer>

    // <KidsZone />
  );
};

export default App;
