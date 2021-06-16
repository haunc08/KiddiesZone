import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import {
  KidsZone,
  GameAlphabet,
  GameCalculate,
  GameCountNumberScreen,
  Sandbox,
  Stories,
  Story,
  Movies,
  Shapes,
  Instruments,
  Story2,
  TrashGame,
  ParentPasswordScreen,
  CreatePasswordScreen,
} from "./screens";
import Tabs from "./navigation/tabs";
import { firebase, firebaseConfig } from "./database";
import { useAuthState } from "react-firebase-hooks/auth";
import AuthenticationNavigator from "./navigation/AuthenticationNavigator";

// redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import allReducers from "./redux/reducers";

const store = createStore(allReducers);

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
          name="ok"
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={"Tabs"}
        >
          <Stack.Screen name="KidsZone" component={KidsZone} />
          <Stack.Screen name="Tabs" component={Tabs} />
          <Stack.Screen
            name="ParentPasswordScreen"
            component={ParentPasswordScreen}
          />
          <Stack.Screen
            name="CreatePasswordScreen"
            component={CreatePasswordScreen}
          />
          <Stack.Screen name="Instruments" component={Instruments} />
          <Stack.Screen name="Sandbox" component={Sandbox} />
          <Stack.Screen name="Shapes" component={Shapes} />
          <Stack.Screen name="Stories" component={Stories} />
          <Stack.Screen
            name="GameCountNumberScreen"
            component={GameCountNumberScreen}
          />
          <Stack.Screen name="Story" component={Story} />
          <Stack.Screen name="Story2" component={Story2} />
          <Stack.Screen name="Movies" component={Movies} />
          <Stack.Screen name="GameAlphabet" component={GameAlphabet} />
          <Stack.Screen
            name="GameAdd"
            component={GameCalculate}
            initialParams={{ gameType: "Add" }}
          />
          <Stack.Screen name="TrashGame" component={TrashGame} />
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
    <Provider store={store}>
      <DisplayedScreens />
    </Provider>
    // <KidsZone />
  );
};

export default App;
