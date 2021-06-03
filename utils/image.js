import { Image } from "react-native";

export const IconManager = {
  back: require("../assets/icons/back.png"),
  playButton: require("../assets/icons/play-button.png"),
  home: require("../assets/icons/home.png"),
  replay: require("../assets/icons/replay.png"),
  next: require("../assets/icons/next.png"),
  whitestar: require("../assets/icons/whitestar.png"),
  history: require("../assets/icons/history.png"),
  movies: {
    previousgold: require("../assets/icons/movies/previousgold.png"),
    nextgold: require("../assets/icons/movies/nextgold.png"),
  },
};

export const ImageManager = {
  number: {
    one: require("../assets/images/number/one.png"),
    two: require("../assets/images/number/two.png"),
    three: require("../assets/images/number/three.png"),
    four: require("../assets/images/number/four.png"),
    five: require("../assets/images/number/five.png"),
    six: require("../assets/images/number/six.png"),
    seven: require("../assets/images/number/seven.png"),
    eight: require("../assets/images/number/eight.png"),
    nine: require("../assets/images/number/nine.png"),
  },
  alphabet: {
    a: require("../assets/images/alphabet/a.png"),
    letterA: require("../assets/images/alphabet/letterA.png"),
    aw: require("../assets/images/alphabet/aw.png"),
    letterAW: require("../assets/images/alphabet/letterAW.png"),
    aa: require("../assets/images/alphabet/aa.png"),
    letterAA: require("../assets/images/alphabet/letterAA.png"),
    grid: require("../assets/images/alphabet/grid.jpg"),
  },
  rabbitAndTurtle: {
    forest: [
      require("../assets/images/RabbitAndTurtle/forest0.jpg"),
      require("../assets/images/RabbitAndTurtle/forest1.jpg"),
      require("../assets/images/RabbitAndTurtle/forest2.jpg"),
    ],
    rabbit: [
      require("../assets/images/RabbitAndTurtle/rabbit0.png"),
      require("../assets/images/RabbitAndTurtle/rabbit1.png"),
      require("../assets/images/RabbitAndTurtle/rabbit2.png"),
      require("../assets/images/RabbitAndTurtle/rabbit3.png"),
      require("../assets/images/RabbitAndTurtle/rabbit4.png"),
      require("../assets/images/RabbitAndTurtle/rabbit5.png"),
      require("../assets/images/RabbitAndTurtle/rabbit6.png"),
    ],
    turtle: [
      require("../assets/images/RabbitAndTurtle/turtle0.png"),
      require("../assets/images/RabbitAndTurtle/turtle1.png"),
      require("../assets/images/RabbitAndTurtle/turtle2.png"),
      require("../assets/images/RabbitAndTurtle/turtle3.png"),
      require("../assets/images/RabbitAndTurtle/turtle4.png"),
      require("../assets/images/RabbitAndTurtle/turtle5.png"),
      require("../assets/images/RabbitAndTurtle/turtle6.png"),
      require("../assets/images/RabbitAndTurtle/turtle7.png"),
      require("../assets/images/RabbitAndTurtle/turtle8.png"),
    ],
    snail: [require("../assets/images/RabbitAndTurtle/snail.png")],
  },
  movies: require("../assets/images/movies/movie.png"),
};

// Usage: Scale the picture to fit the maxmium 'width' or 'height'.
// Example: original picture: 1000*2000, width: 500, height: null  => Output: (500*1000)
export const autoSize = (source, width, height) => {
  const image = Image.resolveAssetSource(source);
  const ratio = image.width / image.height;

  if (width && !height) {
    return {
      width: width,
      height: width / ratio,
    };
  }
  if (height && !width) {
    return {
      height: height,
      width: height * ratio,
    };
  }
  if (!height && !width) {
    return {
      width: 60,
      height: 60,
    };
  }
};
