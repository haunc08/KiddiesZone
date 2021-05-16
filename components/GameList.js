import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
} from "react-native";

import { icons, images, sizes, colors, fonts } from "../constants";
import { Body, Heading1, Heading2 } from "../components/Typography";
import { Card, Row, ScreenView, Space } from "../components/Wrapper";
import { TextInput } from "../components/TextInput";
import { Button } from "../components/Button";
import { HorizontalList, HorizontalListItem } from "./HorizontalList";

export const GameList = () => {
  const games = [
    {
      name: "Học đếm",
    },
    {
      name: "Học đánh vần",
    },
    {
      name: "Vẽ trên cát",
    },
  ];
  return (
    <HorizontalList title="Tất cả game">
      {games.map((g) => (
        <HorizontalListItem name={g.name} />
      ))}
    </HorizontalList>
  );
};
