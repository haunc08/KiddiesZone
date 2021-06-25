import React, { useContext, useEffect, useRef, useState } from "react";

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
import {
  getLastMonth,
  getMostRecentMonths,
  getRecentHalfYear,
  halfMonths,
  numsToMonths,
} from "../../utils/time";
import firestore from "@react-native-firebase/firestore";
import { CollectionName, Gender, HandlingMode } from "../../utils/enum";
import { UserContext } from "../../App";
import { ChildrenContext } from "../../navigation/ParentNavigator";

const healthChartYears = getRecentHalfYear(3);

export const LargeChildInfo = ({ item, color }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Space tight>
        <AutoIcon
          color={color || colors.white}
          source={IconManager[item.gender === Gender.MALE ? "male" : "female"]}
          height={sizes.h2 - 4}
        />
        <Heading2 color={color || colors.white}>{item.name}</Heading2>
      </Space>
    </View>
  );
};

const TrackingScreen = ({ navigation }) => {
  const user = useContext(UserContext);
  const children = useContext(ChildrenContext);

  const carouselChild = useRef();
  const curChildIndex = carouselChild.current?.currentIndex;

  const carouselHeight = useRef();
  const carouselWeight = useRef();

  // const [scheme, setScheme] = useState(colors.blue);
  const [currentChild, setCurrentChild] = useState(null);
  const [healthRecords, setHealthRecords] = useState([]);

  const scheme =
    currentChild?.gender === Gender.MALE ? colors.blue : colors.pink;

  const calcBMI = () => {
    if (!healthRecords[0]) return 0;

    const record = healthRecords[0];
    const height = (record?.height / 100).toFixed(2);
    return (record?.weight / (height * height)).toFixed(2);
  };

  const checkBMIResult = (bmi) => {
    if (bmi >= 0 && bmi < 14) return "Thiếu cân";
    if (bmi >= 14 && bmi <= 18) return "Sức khỏe tốt";
    if (bmi > 18 && bmi <= 20) return "Nguy cơ béo phì";
    if (bmi > 20) return "Béo phì";
  };

  const checkBMIPicture = (bmi) => {
    if (bmi >= 0 && bmi < 14) return "underweight";
    if (bmi >= 14 && bmi <= 18) return "normal";
    if (bmi > 18 && bmi <= 20) return "overweight";
    if (bmi > 20) return "obese";
  };

  const bmiIndex = calcBMI();
  const bmiResult = checkBMIResult(bmiIndex);
  const bmiPicture = checkBMIPicture(bmiIndex);

  const childrenRef = firestore()
    .collection(CollectionName.USERS)
    .doc(user?.uid)
    .collection(CollectionName.CHILDREN);

  useEffect(() => {
    if (children) {
      setCurrentChild(children[curChildIndex ?? 0]);
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

  const handleAddRecord = (child) => {
    navigation.navigate("AddRecordScreen", {
      child: child,
      mode: HandlingMode.ADD,
    });
  };

  const handleEditRecord = (child, record) => {
    navigation.navigate("AddRecordScreen", {
      child,
      record,
      mode: HandlingMode.EDIT,
    });
  };

  const historyItem = ({ item }) => {
    try {
      const createdAt = item?.createdAt?.toDate().toDateString();
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
            onPress={() => handleEditRecord(currentChild, item)}
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
      console.log(error);
    }
  };

  const childCard = ({ item, index }) => {
    const age = calcAge(item.birthday.toDate());
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
                <Body white>{`${latestRecord?.height ?? 0}cm`}</Body>
              </Space>
              <Space tight>
                <AutoIcon
                  white
                  source={IconManager.weight}
                  height={sizes.h2 - 6}
                />
                <Body white>{`${latestRecord?.weight ?? 0}kg`}</Body>
              </Space>
            </Space>
          </View>
        </View>
      </View>
    );
  };

  const getHeightWeightRecentMonths = (type, months) => {
    if (!healthRecords) return;
    // calc average in each month
    const curYear = new Date().getFullYear();
    const result = months.map((month) => {
      const recordsInMonth = healthRecords.filter((record) => {
        if (!record?.createdAt) return;
        if (
          record?.createdAt.toDate().getMonth() === month - 1 &&
          record?.createdAt.toDate().getFullYear() === curYear
        )
          return record;
      });

      if (recordsInMonth.length <= 0) return 0;

      const sum = recordsInMonth.reduce(
        (a, b) => parseInt(a) + (parseInt(b[type]) || 0),
        0
      );
      return sum / recordsInMonth.length;
    });

    return result;
  };

  const refinedData = (data) => {
    const leftBound = (index) => {
      for (let i = index; i >= 0; i--) {
        if (data[i] > 0) {
          return i;
        }
      }
      return -1;
    };

    const rightBound = (index) => {
      for (let i = index; i < data.length; i++) {
        if (data[i] > 0) {
          return i;
        }
      }
      return -1;
    };

    return data.map((d, index) => {
      if (d === 0) {
        const l = leftBound(index);
        const r = rightBound(index);
        if (l === -1 || r === -1) {
          return 0;
        }
        return ((data[r] - data[l]) / (r - l)) * (index - l) + data[l];
      }
      return d;
    });
  };

  const getHealthChartData = (type, months, year) => {
    const res = months.map((m, index) => {
      // if (index === 2) {
      //   return 300;
      // }
      const recordsInMonth = healthRecords.filter(
        (record) =>
          record?.createdAt.toDate().getMonth() === m - 1 &&
          record?.createdAt.toDate().getFullYear() === year
      );
      if (recordsInMonth.length <= 0) {
        return 0;
      }
      const sum = recordsInMonth.reduce(
        (a, b) => parseInt(a) + (parseInt(b[type]) || 0),
        0
      );
      return sum / recordsInMonth.length;
    });
    const finalData = refinedData(res);

    return finalData;
  };

  const recentMonths = getMostRecentMonths(6);

  const heightChart = ({ item, index }) => {
    const heightMonths = halfMonths(item.half);
    const chartData = getHealthChartData("height", heightMonths, item.year);

    return (
      <Space>
        <Row
          style={{
            alignSelf: "stretch",
            justifyContent: "space-between",
            marginHorizontal: sizes.base * 1.5,
          }}
        >
          <Heading1 style={{ color: scheme }}>{item.year}</Heading1>
          <Body style={{ color: scheme, fontSize: sizes.h3 }}>Chiều cao</Body>
        </Row>
        <LineChart
          data={{
            labels: numsToMonths(heightMonths),
            datasets: [
              {
                data: chartData,
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
          fromZero={true}
        />
      </Space>
    );
  };

  const weightChart = ({ item, index }) => {
    const heightMonths = halfMonths(item.half);
    const chartData = getHealthChartData("weight", heightMonths, item.year);

    return (
      <Space>
        <Row
          style={{
            alignSelf: "stretch",
            justifyContent: "space-between",
            marginHorizontal: sizes.base * 1.5,
          }}
        >
          <Heading1 style={{ color: scheme }}>{item.year}</Heading1>
          <Body style={{ color: scheme, fontSize: sizes.h3 }}>Cân nặng</Body>
        </Row>
        <LineChart
          data={{
            labels: numsToMonths(heightMonths),
            datasets: [
              {
                data: chartData,
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
          fromZero={true}
        />
      </Space>
    );
  };

  const handleSelectChild = (index) => {
    setCurrentChild(children[index]);
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
                  <Heading3 white>{bmiIndex}</Heading3>
                </Impress>
                <Heading3 style={{ color: scheme }}>{bmiResult}</Heading3>
              </View>
              <AutoIcon
                color={scheme}
                source={IconManager.bmi[bmiPicture]}
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
              onPress={() => handleAddRecord(currentChild)}
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
            <Carousel
              ref={(c) => {
                carouselHeight.current = c;
              }}
              data={healthChartYears}
              renderItem={heightChart}
              sliderWidth={sizes.short - sizes.base * 2}
              itemWidth={sizes.short - sizes.base * 2}
              onLayout={() => {
                carouselHeight.current.snapToItem(
                  healthChartYears.length - 1,
                  false
                );
              }}
            />
          </Card>
          <Card style={{ alignItems: "center" }}>
            <Carousel
              ref={(c) => {
                carouselWeight.current = c;
              }}
              data={healthChartYears}
              renderItem={weightChart}
              sliderWidth={sizes.short - sizes.base * 2}
              itemWidth={sizes.short - sizes.base * 2}
              onLayout={() => {
                carouselWeight.current.snapToItem(
                  healthChartYears.length - 1,
                  false
                );
              }}
            />
          </Card>
        </Space>
      ) : (
        <View></View>
      )}
    </ScreenView>
  );
};

export default TrackingScreen;
