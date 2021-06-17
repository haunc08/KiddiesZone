import React from "react";
import { View } from "react-native";
import { Svg, Text, G, Rect, Path } from "react-native-svg";
import { AbstractChart } from "react-native-chart-kit";
import { hexToRgba } from "../../utils/color";

const Pie = require("paths-js/pie");

class ProgressChart extends AbstractChart {
  render() {
    const { width, height, colors, style = {} } = this.props;
    const { borderRadius = 0 } = style;

    const pies = this.props.data.map((pieData, i) => {
      const r = ((height / 2 - 32) / this.props.data.length) * i + 32;
      return Pie({
        r,
        R: r,
        center: [0, 0],
        data: [pieData, 1 - pieData],
        accessor(x) {
          return x;
        },
      });
    });

    const pieBackgrounds = this.props.data.map((pieData, i) => {
      const r = ((height / 2 - 32) / this.props.data.length) * i + 32;
      return Pie({
        r,
        R: r,
        center: [0, 0],
        data: [0.999, 0.001],
        accessor(x) {
          return x;
        },
      });
    });

    return (
      <View
        style={{
          width,
          height,
          padding: 0,
          alignItems: "center",
          ...style,
        }}
      >
        <Svg width={width} height={height}>
          {this.renderDefs({
            width: this.props.height,
            height: this.props.height,
            ...this.props.chartConfig,
          })}
          <Rect
            width="100%"
            height={this.props.height}
            rx={borderRadius}
            ry={borderRadius}
            fill="url(#backgroundGradient)"
          />
          <G x={this.props.width / 2} y={this.props.height / 2}>
            <G>
              {pieBackgrounds.map((pie, i) => {
                return (
                  <Path
                    key={Math.random()}
                    d={pie.curves[0].sector.path.print()}
                    strokeWidth={16}
                    stroke={hexToRgba(colors[i], 0.2)}
                  />
                );
              })}
            </G>
            <G>
              {pies.map((pie, i) => {
                return (
                  <Path
                    key={Math.random()}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={pie.curves[0].sector.path.print()}
                    strokeWidth={16}
                    stroke={colors[i]}
                  />
                );
              })}
            </G>
          </G>
        </Svg>
      </View>
    );
  }
}

export default ProgressChart;
