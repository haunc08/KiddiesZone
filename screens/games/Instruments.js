import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, StatusBar, Text, ImageBackground, Image } from "react-native";
import { colors, sizes } from "../../constants";
import { Frame, NoScrollView, Space } from "../../components/Wrapper";
import { ImageButton, StoryObject } from "../../components/Button";
import { createSound, playSoundFile } from "../../utils/sound";
import { ImageManager, IconManager, autoSize } from "../../utils/image";
import { Heading1 } from "../../components/Typography";
import Carousel from "react-native-snap-carousel";
import YoutubePlayer from "react-native-youtube-iframe";
import Orientation from "react-native-orientation-locker";
import { Piano } from "../../components/Piano";

export const Instruments = ({ navigation }) => {
  const instruments = ["piano", "drum"];
  const popUpTimer = useRef();
  const [note, setNote] = useState(null);
  const [drum, setDrum] = useState(null);
  const [insIndex, setInsIndex] = useState(0);
  const noteName = (note) => {
    const charOnly = note.substring(0, note.length - 1);
    switch (charOnly) {
      case "c":
        return "C";
      case "db":
        return "C#";
      case "d":
        return "D";
      case "eb":
        return "D#";
      case "e":
        return "E";
      case "f":
        return "F";
      case "gb":
        return "F#";
      case "g":
        return "G";
      case "ab":
        return "G#";
      case "a":
        return "A";
      case "bb":
        return "A#";
      case "b":
        return "B";
    }
  };

  const drumInstrument = (kind) => {
    return (
      <View
        style={{
          padding: 2,
          borderRadius: 99999,
          backgroundColor: colors.white80,
        }}
      >
        <ImageButton
          source={ImageManager.instruments[kind]}
          height={sizes.short / 6}
          onPress={() => {
            playSoundFile(kind);
            showPopUp(popUpTimer, kind, setDrum);
          }}
        />
      </View>
    );
  };

  const playArea = () => {
    switch (instruments[insIndex]) {
      case "piano":
        return (
          <NoScrollView
            imgSource={ImageManager.instruments.pianobackground}
            // bgColor="white"
            style={{
              // position: "absolute",
              // padding: 0,
              // alignItems: "center",
              // justifyContent: "center",
              // flexDirection: "column",
              paddingTop: sizes.short / 6,
            }}
          >
            <Piano
              noteRange={{ first: "c4", last: "e5" }}
              onPlayNoteInput={(note) => {
                playSoundFile(note);
                showPopUp(popUpTimer, noteName(note), setNote);
              }}
              onStopNoteInput={() => {}}
            />
          </NoScrollView>
        );
      case "drum":
        return (
          <NoScrollView
            imgSource={ImageManager.instruments.drumbackground}
            // bgColor="white"
            style={{
              // position: "absolute",
              padding: 0,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                marginTop: sizes.short / 2.3,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {drum && (
                <ImageButton
                  source={ImageManager.instruments[drum]}
                  width={sizes.long / 7}
                  block
                  style={{ opacity: 0.48 }}
                />
              )}
              <View style={{ marginHorizontal: sizes.long / 18 }}>
                <View
                  style={{
                    flexDirection: "row",
                    marginBottom: sizes.short / 18,
                  }}
                >
                  {drumInstrument("clap")}
                  <View style={{ marginHorizontal: sizes.long / 18 }}>
                    {drumInstrument("cymbal")}
                  </View>
                  {drumInstrument("maraca")}
                </View>
                <View style={{ flexDirection: "row" }}>
                  {drumInstrument("hihat")}
                  <View style={{ marginHorizontal: sizes.long / 18 }}>
                    {drumInstrument("kick")}
                  </View>
                  {drumInstrument("snare")}
                </View>
              </View>
              {drum && (
                <ImageButton
                  source={ImageManager.instruments[drum]}
                  width={sizes.long / 7}
                  block
                  style={{ opacity: 0.48 }}
                />
              )}
            </View>
          </NoScrollView>
        );
    }
  };

  return (
    <NoScrollView
      style={{
        padding: 0,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          position: "absolute",
          zIndex: 32,
          alignSelf: "flex-start",
          padding: sizes.base,
          paddingHorizontal: sizes.base * 1.5,
        }}
      >
        <ImageButton
          width={45}
          onPress={() => navigation.goBack()}
          source={IconManager.back}
        />
      </View>
      <View
        style={{
          position: "absolute",
          zIndex: 32,
          alignSelf: "flex-end",
          padding: sizes.base,
          paddingHorizontal: sizes.base * 1.5,
        }}
      >
        {note ? (
          <View
            style={{
              backgroundColor: colors.black38,
              marginTop: sizes.short / 4,
              paddingHorizontal: sizes.base * 4,
              borderRadius: sizes.base * 2,
            }}
          >
            <Text
              style={{ color: colors.white, fontWeight: "bold", fontSize: 64 }}
            >
              {note}
            </Text>
          </View>
        ) : null}
      </View>

      <View
        style={{
          position: "absolute",
          zIndex: 32,
          alignSelf: "flex-end",
          padding: sizes.base,
          paddingHorizontal: sizes.base * 1.5,
        }}
      >
        <ImageButton
          width={60}
          onPress={() => setInsIndex((insIndex + 1) % instruments.length)}
          source={
            IconManager.instruments[
              instruments[(insIndex + 1) % instruments.length]
            ]
          }
        />
      </View>

      {playArea()}
    </NoScrollView>
  );
};

export default Instruments;

function showPopUp(timer, value, setter) {
  setter(value);
  if (timer.current) clearTimeout(timer.current);
  timer.current = setTimeout(() => {
    setter(null);
  }, 750);
}
