// react
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";

// other packages
import { createStackNavigator } from "@react-navigation/stack";

// screens
import {
  AddChildScreen,
  AddRecordScreen,
  CreatePasswordScreen,
  FeedScreen,
  GameCatalogueScreen,
  PostScreen,
  SelectChildScreen,
  ChangeNameScreen,
} from "../screens";
import Tabs from "./tabs";
import { MoreTimePopup } from "../screens/parent/UserScreen";

import firestore from "@react-native-firebase/firestore";
import { UserContext } from "../App";
import { CollectionName } from "../utils/enum";

export const ChildrenContext = createContext();

const Stack = createStackNavigator();

const ParentNavigator = () => {
  const user = useContext(UserContext);
  const [children, setChildren] = useState([]);
  const moreTimeQueue = useRef([]);

  const childrenRef = firestore()
    .collection(CollectionName.USERS)
    .doc(user?.uid)
    .collection(CollectionName.CHILDREN);

  // fetch all children of user
  useEffect(() => {
    childrenRef.onSnapshot((querySnapshot) => {
      let childrenData = [];
      querySnapshot.forEach((documentSnapshot) => {
        const child = {
          ...documentSnapshot.data(),
          _id: documentSnapshot.id,
        };
        childrenData.push(child);
        if (child.moreTime === 0) {
          moreTimeQueue.current.push(child);
        }
      });
      setChildren(childrenData);
    });
  }, []);

  const updateMoreTime = (num) => {
    if (moreTimeQueue) {
      console.log("child.....", moreTimeQueue.current[0]);
      childrenRef.doc(moreTimeQueue.current[0]?._id).update({ moreTime: num });
      moreTimeQueue.current = moreTimeQueue.current.shift();
    }
  };

  const handleAllow = () => {
    updateMoreTime(1);
  };

  const handleDeny = () => {
    updateMoreTime(-1);
  };
  return (
    <ChildrenContext.Provider value={children}>
      {moreTimeQueue.current[0] ? (
        <MoreTimePopup
          onAllow={handleAllow}
          onDeny={handleDeny}
          name={moreTimeQueue.current[0]?.name}
        />
      ) : null}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={Tabs} />
        <Stack.Screen name="AddChildScreen" component={AddChildScreen} />
        <Stack.Screen name="AddRecordScreen" component={AddRecordScreen} />
        <Stack.Screen name="FeedScreen" component={FeedScreen} />
        <Stack.Screen name="PostScreen" component={PostScreen} />
        <Stack.Screen
          name="GameCatalogueScreen"
          component={GameCatalogueScreen}
        />
        <Stack.Screen name="SelectChildScreen" component={SelectChildScreen} />
        <Stack.Screen name="ChangeNameScreen" component={ChangeNameScreen} />

        <Stack.Screen
          name="CreatePasswordScreen"
          component={CreatePasswordScreen}
        />
      </Stack.Navigator>
    </ChildrenContext.Provider>
  );
};

export default ParentNavigator;
