import Sound from "react-native-sound";

export const playSoundFile = (soundFileName) => {
  console.log(`play sound file: ${soundFileName}`);
  Sound.setCategory("Playback");

  const mySound = new Sound(`${soundFileName}.mp3`, null, (error) => {
    if (error) {
      console.log("Error loading sound: ", error);
      return;
    }
    mySound.play((success) => {
      if (success) {
        console.log("play sound successfully");
      } else {
        console.log("playback failed due to audio decoding errors");
      }
      mySound.release();
    });
  });
  mySound.setVolume(1);
};

export const createSound = (name, numberOfLoops) => {
  Sound.setCategory("Playback");

  let mySound = new Sound(`${name}.mp3`, null, (error) => {
    if (error) {
      console.log("Error loading sound: ", error);
      return;
    }
    mySound.play(() => {
      mySound.release();
    });
    mySound.setNumberOfLoops(numberOfLoops || 0);
  });
  return mySound;
};
