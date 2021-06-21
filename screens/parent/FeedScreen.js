import React, { useContext, useEffect, useState } from "react";

import { colors, sizes } from "../../constants";
import { Card, Row, ScreenView, Space } from "../../components/Wrapper";
import { AutoIcon, ImageButton } from "../../components/Button";
import { IconManager } from "../../utils/image";
import { View, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { Body, Heading3 } from "../../components/Typography";
import { hexToRgba } from "../../utils/color";
import LinkPreview from "../../components/LinkPreview/LinkPreview";

import firestore from "@react-native-firebase/firestore";
import { CollectionName } from "../../utils/enum";
import { ActivityIndicator } from "react-native";
import { UserContext } from "../../App";
import { calcTimeRangeUntilNow } from "../../utils/time";

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

export const FeedScreen = ({ navigation }) => {
  const user = useContext(UserContext);

  const [currentTab, setCurrentTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    setLoading(true);

    firestore()
      .collection(CollectionName.POSTS)
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        let tempPosts = [];
        querySnapshot.forEach((post) => {
          const tempPost = {
            ...post.data(),
            _id: post.id,
          };

          tempPosts.push(tempPost);
        });
        setPosts(tempPosts);
      });
  };

  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={getData}
          //On Click of button load more data
          style={styles.loadMoreBtn}
        >
          <Text style={styles.btnText}>Load More</Text>
          {loading ? (
            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  const Post = ({ item }) => {
    const hearted = item?.lovedUsers.includes(user?.uid);

    const timeText = calcTimeRangeUntilNow(item?.createdAt.toDate());
    console.log(timeText);

    return (
      <Card style={{ padding: sizes.base / 2, marginTop: sizes.base }}>
        <LinkPreview
          text={item.url}
          titleNumberOfLines={5}
          descriptionNumberOfLines={10}
          onPress={() =>
            navigation.navigate("PostScreen", {
              hearted: hearted,
              url: item.url,
            })
          }
        />
        <Row style={{ justifyContent: "space-between", padding: sizes.base }}>
          <Row>
            <ImageButton
              source={hearted ? IconManager.heart : IconManager.heartempty}
              color={hearted ? colors.pink : colors.black}
              height={26}
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

  const FeedTabs = () => {
    return (
      <Row style={{ marginBottom: sizes.base }}>
        <TouchableOpacity
          onPress={() => setCurrentTab(0)}
          style={{
            borderRadius: 999,
            flex: 1,
            backgroundColor: hexToRgba(
              colors.blue,
              currentTab === 0 ? 1 : 0.25
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
          onPress={() => setCurrentTab(1)}
          style={{
            borderRadius: 999,
            flex: 1,
            backgroundColor: hexToRgba(
              colors.yellow,
              currentTab === 1 ? 1 : 0.25
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
          onPress={() => setCurrentTab(2)}
          style={{
            borderRadius: 999,
            flex: 1,
            backgroundColor: hexToRgba(
              colors.pink,
              currentTab === 2 ? 1 : 0.25
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
    );
  };

  return (
    <ScreenView
      isMainScreen
      title="Bài viết"
      scrollToTop
      navigation={navigation}
    >
      <FeedTabs />
      {posts ? (
        <FlatList
          data={posts}
          renderItem={Post}
          keyExtractor={(item) => item?._id}
        />
      ) : (
        <View></View>
      )}
    </ScreenView>
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
    backgroundColor: "#800000",
    borderRadius: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
  },
});

export default FeedScreen;
