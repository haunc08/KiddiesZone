import React, { useEffect, useRef, useState } from "react";

import { colors, sizes } from "../../constants";
import {
  Card,
  Impress,
  Row,
  ScreenView,
  Space,
  RoundImpress,
} from "../../components/Wrapper";
import { AutoIcon, ImageButton } from "../../components/Button";
import Carousel from "react-native-snap-carousel";
import { View } from "react-native";
import {
  Heading2,
  Heading3,
  Body,
  Heading1,
} from "../../components/Typography";
import { IconManager } from "../../utils/image";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { hexToRgba } from "../../utils/color";
import { LineChart } from "react-native-chart-kit";
import { calcAge } from "../../utils/string";

// firebase
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { CollectionName, Gender } from "../../utils/enum";

const dummyArray = ["item1", "item2", "item3"];

// const children = [
//   {
//     age: 5,
//     gender: "Nữ",
//     name: "Ngô Công Hậu",
//     height: "120",
//     weight: "35",
//   },
//   {
//     age: 3,
//     gender: "Nam",
//     name: "Phan Huy Tiến",
//     height: "110",
//     weight: "53",
//   },
// ];

const history = [
  {
    date: "15/06/2021",
    height: "1m20",
    weight: "35kg",
  },
  {
    date: "15/06/2021",
    height: "1m20",
    weight: "35kg",
  },
  {
    date: "15/06/2021",
    height: "1m20",
    weight: "35kg",
  },
  {
    date: "15/06/2021",
    height: "1m20",
    weight: "35kg",
  },
  {
    date: "15/06/2021",
    height: "1m20",
    weight: "35kg",
  },
  {
    date: "15/06/2021",
    height: "1m20",
    weight: "35kg",
  },
  {
    date: "15/06/2021",
    height: "1m20",
    weight: "35kg",
  },
  {
    date: "15/06/2021",
    height: "1m20",
    weight: "35kg",
  },
  {
    date: "15/06/2021",
    height: "1m20",
    weight: "35kg",
  },
  {
    date: "15/06/2021",
    height: "1m20",
    weight: "35kg",
  },
  {
    date: "15/06/2021",
    height: "1m20",
    weight: "35kg",
  },
  {
    date: "15/06/2021",
    height: "1m20",
    weight: "35kg",
  },
];

export const LargeChildInfo = ({ item }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Space tight>
        <AutoIcon
          white
          source={IconManager[item.gender === Gender.MALE ? "male" : "female"]}
          height={sizes.h2 - 4}
        />
        <Heading2 white>{item.name}</Heading2>
      </Space>
    </View>
  );
};

const TrackingScreen = ({ navigation }) => {
  const [user] = useAuthState(auth());

  const [children, setChildren] = useState([]);
  const [currentChild, setCurrentChild] = useState(null);
  const [healthRecords, setHealthRecords] = useState([]);

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
      });

      setChildren(childrenData);
    });
  }, []);

  useEffect(() => {
    if (children) {
      children[0]?.gender === Gender.MALE
        ? setScheme(colors.blue)
        : setScheme(colors.pink);

      setCurrentChild(children[0]);
    }
  }, [children]);

  // fetch health records of selected child
  useEffect(() => {
    childrenRef
      .doc(currentChild?._id)
      .collection(CollectionName.HEALTH_RECORDS)
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        let records = [];

        querySnapshot.forEach((documentSnapshot) => {
          const record = {
            ...documentSnapshot.data(),
            _id: documentSnapshot.id,
          };
          records.push(record);
        });

        setHealthRecords(records);
      });
  }, [currentChild]);

  const carouselChild = useRef();
  const carouselHeight = useRef();
  const carouselWeight = useRef();

  const [scheme, setScheme] = useState(colors.blue);

  const handleAddRecord = (item) => {
    navigation.navigate("AddRecordScreen", { child: item, userId: user?.uid });
  };

  const historyItem = ({ item }) => {
    try {
      const createdAt = item?.createdAt.toDate().toDateString();
      return (
        <View
          style={{
            alignItems: "center",
          }}
        >
          <View
            style={{
              marginTop: sizes.base,
              alignSelf: "stretch",
              height: 1,
              backgroundColor: colors.white50,
              marginBottom: sizes.base / 2,
            }}
          />
          <TouchableOpacity
            style={{
              alignItems: "center",
            }}
          >
            <Space tight>
              <Heading2 color={colors.white50}>{createdAt}</Heading2>
              <Row>
                <Space>
                  <Space tight>
                    <AutoIcon
                      white
                      source={IconManager.height}
                      height={sizes.h2 - 6}
                    />
                    <Body style={{ color: colors.white }}>{item?.height}</Body>
                  </Space>
                  <Space tight>
                    <AutoIcon
                      white
                      source={IconManager.weight}
                      height={sizes.h2 - 6}
                    />
                    <Body style={{ color: colors.white }}>{item?.weight}</Body>
                  </Space>
                </Space>
              </Row>
            </Space>
          </TouchableOpacity>
        </View>
      );
    } catch (error) {
      console.log(item);
      console.log(error);
    }
  };

  const calcAge = (birthday) => {
    const today = Date.now();
    const dateRange = (today - birthday) / (1000 * 3600 * 24);
    return Math.floor(dateRange / 365);
  };

  const calcBMI = () => {
    const record = healthRecords[0];
    const height = (record?.height / 100).toFixed(2);
    return (record?.weight / (height * height)).toFixed(2);
  };

  const childCard = ({ item, index }) => {
    const age = calcAge(item?.birthday.toDate());
    const latestRecord = healthRecords[0];

    return (
      <View
        style={{
          justifyContent: "center",
        }}
      >
        <View
          style={{
            borderRadius: sizes.base,
            backgroundColor:
              item.gender === Gender.MALE ? colors.blue : colors.pink,
            padding: sizes.base,
            alignItems: "center",
            paddingVertical: sizes.base * 2,
          }}
        >
          <ImageButton
            onPress={() => handleAddRecord(item)}
            color={colors.white}
            source={IconManager.roundadd}
            height={46}
            containerStyle={{
              position: "absolute",
              alignSelf: "flex-end",
              padding: sizes.base * 1.5,
            }}
          />
          <Space>
            <RoundImpress>
              <Heading1>{age}</Heading1>
            </RoundImpress>
            <LargeChildInfo item={item} />
          </Space>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: sizes.base,
            }}
          >
            <Space loose>
              <Space tight>
                <AutoIcon
                  white
                  // source={
                  //   IconManager[item.gender === Gender.MALE ? "male" : "female"]
                  // }
                  // height={sizes.h2 - 4}
                  source={IconManager.height}
                  height={sizes.h2 - 6}
                />
                <Body white>{`${latestRecord?.height}cm`}</Body>
              </Space>
              <Space tight>
                <AutoIcon
                  white
                  source={IconManager.weight}
                  height={sizes.h2 - 6}
                />
                <Body white>{`${latestRecord?.weight}kg`}</Body>
              </Space>
            </Space>
          </View>
        </View>
      </View>
    );
  };

  const heightChart = ({ item, index }) => {
    return (
      <LineChart
        data={{
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              data: [
                Math.random() * 160,
                Math.random() * 160,
                Math.random() * 160,
                Math.random() * 160,
                Math.random() * 160,
                Math.random() * 160,
              ],
            },
          ],
        }}
        width={sizes.short - sizes.base * 2} // from react-native
        height={220}
        chartConfig={{
          backgroundGradientFrom: colors.white,
          backgroundGradientTo: colors.white,
          decimalPlaces: 0, // optional, defaults to 2dp
          color: () => hexToRgba(scheme, 1),
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginLeft: -sizes.base / 2,
          borderRadius: 16,
        }}
      />
    );
  };

  const weightChart = ({ item, index }) => {
    return (
      <LineChart
        data={{
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          datasets: [
            {
              data: [
                Math.random() * 50,
                Math.random() * 50,
                Math.random() * 50,
                Math.random() * 50,
                Math.random() * 50,
                Math.random() * 50,
              ],
            },
          ],
        }}
        width={sizes.short - sizes.base * 2} // from react-native
        height={220}
        chartConfig={{
          backgroundGradientFrom: colors.white,
          backgroundGradientTo: colors.white,
          decimalPlaces: 0, // optional, defaults to 2dp
          color: () => hexToRgba(scheme, 1),
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={{
          marginLeft: -sizes.base / 2,
          borderRadius: 16,
        }}
      />
    );
  };

  const handleSelectChild = (index) => {
    setCurrentChild(children[index]);

    if (children[index]?.gender === Gender.MALE) {
      setScheme(colors.blue);
    }
    if (children[index]?.gender === Gender.FEMALE) {
      setScheme(colors.pink);
    }
  };

  return (
    <ScreenView isMainScreen title="Sức khỏe" navigation={navigation}>
      {children[0] ? (
        <Space>
          <Carousel
            ref={(c) => {
              carouselChild.current = c;
            }}
            data={children}
            renderItem={childCard}
            sliderWidth={sizes.short - sizes.base * 2}
            itemWidth={sizes.short - sizes.base * 2}
            onSnapToItem={handleSelectChild}
          />
          <Card title="Chỉ số BMI" style={{ alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: sizes.base * 1.5,
              }}
            >
              <View
                style={{ alignItems: "center", marginRight: sizes.base * 4 }}
              >
                <Impress color={scheme}>
                  <Heading3 white>{calcBMI()}</Heading3>
                </Impress>
                <Heading3 style={{ color: scheme }}>Bình thường</Heading3>
              </View>
              <AutoIcon
                color={scheme}
                source={IconManager.bmi.normal}
                height={120}
              />
            </View>
            <Body>
              Chỉ số BMI còn được gọi là chỉ số khối lượng cơ thể (Body Mass
              Index). Dựa vào chỉ số BMI của một người có thể biết được người đó
              béo, gầy hay có cân nặng lý tưởng. Được đề ra lần đầu tiên vào năm
              1832 bởi một nhà khoa học người Bỉ.
            </Body>
          </Card>
          <Card bgColor={scheme} title="Lịch sử cập nhật">
            <FlatList
              data={healthRecords}
              renderItem={historyItem}
              keyExtractor={(item) => item.id}
              style={{ height: 250 }}
            />
            <ImageButton
              onPress={() => handleAddRecord(children[0])}
              color={colors.white}
              source={IconManager.roundadd}
              height={46}
              containerStyle={{
                position: "absolute",
                alignSelf: "flex-end",
                padding: sizes.base * 1.5,
              }}
            />
          </Card>
          <Card style={{ alignItems: "center" }}>
            <Space>
              <Row
                style={{
                  alignSelf: "stretch",
                  justifyContent: "space-between",
                }}
              >
                <Heading1 style={{ color: scheme }}>2021</Heading1>
                <Body style={{ color: scheme, fontSize: sizes.h3 }}>
                  Chiều cao
                </Body>
              </Row>
              <Carousel
                ref={(c) => {
                  carouselHeight.current = c;
                }}
                data={dummyArray}
                renderItem={heightChart}
                sliderWidth={sizes.short - sizes.base * 2}
                itemWidth={sizes.short - sizes.base * 2}
              />
            </Space>
          </Card>
          <Card style={{ alignItems: "center" }}>
            <Space>
              <Row
                style={{
                  alignSelf: "stretch",
                  justifyContent: "space-between",
                }}
              >
                <Heading1 style={{ color: scheme }}>2021</Heading1>
                <Body style={{ color: scheme, fontSize: sizes.h3 }}>
                  Cân nặng
                </Body>
              </Row>
              <Carousel
                ref={(c) => {
                  carouselWeight.current = c;
                }}
                data={dummyArray}
                renderItem={weightChart}
                sliderWidth={sizes.short - sizes.base * 2}
                itemWidth={sizes.short - sizes.base * 2}
              />
            </Space>
          </Card>
        </Space>
      ) : (
        <View></View>
      )}
    </ScreenView>
  );
};

export default TrackingScreen;
