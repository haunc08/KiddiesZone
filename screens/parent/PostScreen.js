import React, { useContext, useEffect, useState } from "react";

import { colors, sizes } from "../../constants";
import { ScreenView } from "../../components/Wrapper";
import { AutoIcon } from "../../components/Button";
import { IconManager } from "../../utils/image";
import { TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";

import firestore from "@react-native-firebase/firestore";
import { UserContext } from "../../App";
import { CollectionName } from "../../utils/enum";

export const PostScreen = ({ route, navigation }) => {
  const user = useContext(UserContext);
  const { hearted, postId } = route.params;

  const [post, setPost] = useState();
  const [isHearted, setIsHearted] = useState(hearted);

  useEffect(() => {
    fetchAPost();
  }, []);

  const fetchAPost = () => {
    firestore()
      .collection(CollectionName.POSTS)
      .doc(postId)
      .onSnapshot((documentSnapshot) => {
        setPost(documentSnapshot.data());
      });
  };

  const handleLovePost = () => {
    console.log(post?.lovedUsers);
    const userIndex = post?.lovedUsers.indexOf(user?.uid);
    const newLovedUsers =
      userIndex > -1
        ? post?.lovedUsers.filter((userId) => userId !== user?.uid)
        : [...post?.lovedUsers, user?.uid];
    console.log(newLovedUsers);
    firestore()
      .collection(CollectionName.POSTS)
      .doc(postId)
      .update({
        lovedUsers: newLovedUsers,
      })
      .then(() => {
        console.log("Update loved users of post successfully.");
        setIsHearted(!isHearted);
      });
  };

  const Heart = () => {
    return (
      <TouchableOpacity
        // pointerEvents="box-none"
        style={{
          backgroundColor: colors.white98,
          width: 56,
          height: 56,
          borderRadius: 999,
          alignItems: "center",
          justifyContent: "center",
          marginTop: sizes.long - sizes.base * 6,
          marginLeft: sizes.base * 2,
          elevation: 25,
        }}
        onPress={handleLovePost}
      >
        <AutoIcon
          source={isHearted ? IconManager.heart : IconManager.heartempty}
          color={isHearted ? colors.pink : colors.black}
          height={26}
        />
      </TouchableOpacity>
    );
  };

  return (
    <ScreenView
      title="Chế độ đọc"
      navigation={navigation}
      style={{ padding: 0, height: sizes.height, paddingBottom: 0 }}
      absoluteChildren={Heart()}
    >
      <WebView
        source={{
          uri: post?.url,
        }}
        style={{ height: sizes.height, margin: 0, padding: 0 }}
      />
    </ScreenView>
  );
};

export default PostScreen;
