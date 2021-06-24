import React, { createContext, useEffect, useState } from "react";

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
} from "./screens";

import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import AuthenticationNavigator from "./navigation/AuthenticationNavigator";

// redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import allReducers from "./redux/reducers";
import ParentNavigator from "./navigation/ParentNavigator";
import { CollectionName } from "./utils/enum";

const store = createStore(allReducers);

const Stack = createStackNavigator();

export const UserContext = createContext();

const DisplayedScreens = () => {
  const [user, loading, error] = useAuthState(auth());

  const userAuth = {
    uid: user?.uid,
    email: user?.email,
  };

  const [userInfo, setUserInfo] = useState(userAuth);

  useEffect(() => {
    firestore()
      .collection(CollectionName.USERS)
      .doc(user?.uid)
      .onSnapshot((documentSnapshot) =>
        setUserInfo({ ...userInfo, name: documentSnapshot?.data()?.name })
      );
  }, []);
  // ParentPasswordScreen;

  if (user) {
    return (
      <UserContext.Provider value={userInfo}>
        <NavigationContainer>
          <Stack.Navigator
            name="ok"
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName={"ParentNavigator"}
          >
            <Stack.Screen name="ParentNavigator" component={ParentNavigator} />
            <Stack.Screen name="KidsZone" component={KidsZone} />
            <Stack.Screen
              name="ParentPasswordScreen"
              component={ParentPasswordScreen}
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
      </UserContext.Provider>
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
