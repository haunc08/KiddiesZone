import React, { useContext, useEffect, useRef, useState } from "react";

import { colors, sizes } from "../../constants";
import { Card, Row, ScreenView, Space } from "../../components/Wrapper";
import { AutoIcon, ImageButton } from "../../components/Button";
import { IconManager } from "../../utils/image";
import { View, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Body, Heading1, Heading3 } from "../../components/Typography";
import { hexToRgba } from "../../utils/color";
import LinkPreview from "../../components/LinkPreview/LinkPreview";

import firestore from "@react-native-firebase/firestore";
import { CollectionName, FeedScreenTabs } from "../../utils/enum";
import { ActivityIndicator } from "react-native";
import { UserContext } from "../../App";
import { calcTimeRangeUntilNow } from "../../utils/time";
import { Text } from "react-native-elements";
import { removeDup } from "../../utils/string";

const posts = [
  {
    url:
      "https://www.webtretho.com/p/2-cach-bao-quan-sau-rieng-trong-tu-lanh-khong-bi-am-mui-de-an-dan-bao-thich",
    hearts: ["6921420"],
  },
  {
    url:
      "https://vnexpress.net/bi-quyet-tang-cuong-suc-khoe-thoi-dich-4292295.html",
    hearts: [],
  },
  {
    url:
      "https://vnexpress.net/5-15-tuoi-la-giai-doan-vang-de-tre-phat-trien-4290882.html",
    hearts: [],
  },
  {
    url:
      "https://vnexpress.net/an-uong-giup-tre-tang-de-khang-chong-ncov-4289089.html",
    hearts: [],
  },
  {
    url:
      "https://vnexpress.net/giai-phap-cho-van-de-khong-hop-sua-4288357.html",
    hearts: [],
  },
  {
    url:
      "https://vnexpress.net/bi-quyet-giup-tre-an-ngon-mieng-trong-giai-doan-an-dam-4283998.html",
    hearts: [],
  },
  {
    url: "https://vnexpress.net/bi-quyet-tang-de-khang-de-dang-4276111.html",
    hearts: [],
  },
  {
    url: "https://vnexpress.net/boi-bo-dinh-duong-chong-covid-19-4280248.html",
    hearts: [],
  },
];

const pageSize = 3;

export const FeedScreen = ({ navigation }) => {
  const user = useContext(UserContext);

  const [currentTab, setCurrentTab] = useState(FeedScreenTabs.NEW);

  // const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [outOfPosts, setOutOfPosts] = useState(false);

  const lastVisibleDoc = useRef();
  const postsFlatListRef = useRef();
  const page = useRef(1);

  useEffect(() => {
    lastVisibleDoc.current = null;
    postsFlatListRef.current.scrollToOffset({ animated: false, offset: 0 });
    page.current = 1;
    fetchFirst();
    setPosts([]);
    setOutOfPosts(false);
  }, [currentTab]);

  const onError = (error) => console.log(error);

  const queryWrap = (query) => {
    switch (currentTab) {
      case FeedScreenTabs.NEW:
        return query.orderBy("createdAt", "desc");
      case FeedScreenTabs.POPULAR:
        return query.orderBy("countLovedUsers", "desc");
      case FeedScreenTabs.LOVED:
        return query
          .where("lovedUsers", "array-contains", user?.uid)
          .orderBy("createdAt", "desc");
    }
  };

  const fetchFirst = () => {
    // return;
    queryWrap(firestore().collection(CollectionName.POSTS))
      // page current: delag khi like post o trang > 1
      .limit(pageSize * page.current)
      .get()
      .then((qry) => {
        if (qry.size < pageSize) setOutOfPosts(true);
        let temp = [];
        qry.forEach((doc, index) => {
          temp.push({ ...doc.data(), id: doc.id });
          if (index === qry.size - 1) lastVisibleDoc.current = doc;
        });
        setPosts(temp);
      });
    // .onSnapshot((qry) => {
    //   if (qry.size < pageSize) setOutOfPosts(true);
    //   let temp = [];
    //   qry.forEach((doc, index) => {
    //     temp.push({ ...doc.data(), id: doc.id });
    //     if (index === qry.size - 1) lastVisibleDoc.current = doc;
    //   });
    //   setPosts(temp);
    // });
  };

  const fetchMore = () => {
    if (posts.length < pageSize || !posts[pageSize - 1].id) return;
    queryWrap(firestore().collection(CollectionName.POSTS))
      .limit(pageSize)
      .startAfter(lastVisibleDoc.current)
      .get()
      .then((qry) => {
        if (qry.size === 0) {
          setOutOfPosts(true);
          return;
        }
        let temp = [];
        qry.forEach((doc, index) => {
          temp.push({ ...doc.data(), id: doc.id });
          if (index === qry.size - 1) lastVisibleDoc.current = doc;
        });
        if (currentTab === FeedScreenTabs.POPULAR) {
          setPosts((prev) => removeDup(prev.concat(temp), "id"));
        } else {
          setPosts((prev) => prev.concat(temp));
        }
        page.current = page.current + 1;
      });
    // .onSnapshot((qry) => {
    //   if (qry.size === 0) {
    //     setOutOfPosts(true);
    //     return;
    //   }
    //   let temp = [];
    //   qry.forEach((doc, index) => {
    //     temp.push({ ...doc.data(), id: doc.id });
    //     if (index === qry.size - 1) lastVisibleDoc.current = doc;
    //   });
    //   setPosts((prev) => prev.concat(temp));
    // });
  };

  const handleLovePost = (post) => {
    console.log("item", post);
    const userIndex = post?.lovedUsers.indexOf(user?.uid);
    const newLovedUsers =
      userIndex > -1
        ? post?.lovedUsers.filter((userId) => userId !== user?.uid)
        : [...post?.lovedUsers, user?.uid];

    const newCount =
      userIndex > -1 ? post?.countLovedUsers - 1 : post?.countLovedUsers + 1;

    firestore()
      .collection(CollectionName.POSTS)
      .doc(post?.id)
      .update({
        lovedUsers: newLovedUsers,
        countLovedUsers: newCount,
      })
      .then(() => fetchFirst());
  };

  const PostFooter = () => {
    if (outOfPosts) return <Text style={styles.text}>Không còn bài viết</Text>;

    return <Text style={styles.text}>Loading...</Text>;
  };

  const Post = ({ item }) => {
    if (!item) return null;
    if (item?.addition === "end") {
      return <PostFooter />;
    } else if (item?.addition === "start") {
      return <Heading1>Bài viết</Heading1>;
    }

    const hearted = item?.lovedUsers.includes(user?.uid);
    const timeText = calcTimeRangeUntilNow(item?.createdAt.toDate());

    return (
      <Card
        style={{
          padding: sizes.base / 2,
          marginTop: sizes.base,
          minHeight: 300,
        }}
      >
        <LinkPreview
          text={item.url}
          titleNumberOfLines={5}
          descriptionNumberOfLines={10}
          onPress={() =>
            navigation.navigate("PostScreen", {
              hearted: hearted,
              postId: item?.id,
            })
          }
        />
        <Row style={{ justifyContent: "space-between", padding: sizes.base }}>
          <Row>
            <ImageButton
              source={hearted ? IconManager.heart : IconManager.heartempty}
              color={hearted ? colors.pink : colors.black}
              height={26}
              onPress={() => handleLovePost(item)}
            />
            <Heading3
              style={{
                marginLeft: sizes.base,
                fontSize: sizes.body + 6,
                marginBottom: 2,
              }}
            >
              {item?.lovedUsers?.length}
            </Heading3>
          </Row>
          <Body
            style={{
              marginLeft: sizes.base,
              color: colors.fadeblack50,
            }}
          >
            {timeText}
          </Body>
        </Row>
      </Card>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: sizes.base / 2,
        paddingTop: sizes.base * 2,
      }}
    >
      <Row
        style={{ marginBottom: sizes.base, marginHorizontal: sizes.base / 1.5 }}
      >
        <TouchableOpacity
          onPress={() => setCurrentTab(FeedScreenTabs.NEW)}
          style={{
            borderRadius: 999,
            flex: 1,
            backgroundColor: hexToRgba(
              colors.blue,
              currentTab === FeedScreenTabs.NEW ? 1 : 0.25
            ),
            padding: sizes.base * 0.75,
            paddingHorizontal: sizes.base * 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Space tight>
            <AutoIcon source={IconManager.star} white height={sizes.body} />
            <Body white>Bài mới</Body>
          </Space>
        </TouchableOpacity>
        <View style={{ width: sizes.base / 2 }} />
        <TouchableOpacity
          onPress={() => setCurrentTab(FeedScreenTabs.POPULAR)}
          style={{
            borderRadius: 999,
            flex: 1,
            backgroundColor: hexToRgba(
              colors.yellow,
              currentTab === FeedScreenTabs.POPULAR ? 1 : 0.25
            ),
            padding: sizes.base * 0.75,
            paddingHorizontal: sizes.base * 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Space tight>
            <AutoIcon source={IconManager.flame} white height={sizes.body} />
            <Body white>Phổ biến</Body>
          </Space>
        </TouchableOpacity>
        <View style={{ width: sizes.base / 2 }} />
        <TouchableOpacity
          onPress={() => setCurrentTab(FeedScreenTabs.LOVED)}
          style={{
            borderRadius: 999,
            flex: 1,
            backgroundColor: hexToRgba(
              colors.pink,
              currentTab === FeedScreenTabs.LOVED ? 1 : 0.25
            ),
            padding: sizes.base * 0.75,
            paddingHorizontal: sizes.base * 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Space tight>
            <AutoIcon source={IconManager.heart} white height={sizes.body} />
            <Body white>Đã thích</Body>
          </Space>
        </TouchableOpacity>
      </Row>
      {/* {posts ? ( */}

      <FlatList
        style={{
          paddingHorizontal: sizes.base / 1.5,
          flex: 1,
          paddingBottom: 200,
        }}
        data={[{ addition: "start" }, ...posts, { addition: "end" }]}
        renderItem={Post}
        keyExtractor={(item) => item?.id}
        onEndReached={fetchMore}
        onEndReachedThreshold={0.01}
        ref={postsFlatListRef}
        // showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
  },
  footer: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: colors.primary,
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
  },
  btnText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
  text: {
    color: "black",
    fontSize: sizes.h3,
    textAlign: "center",
    marginTop: sizes.base * 2,
    marginBottom: 100,
  },
});

export default FeedScreen;
