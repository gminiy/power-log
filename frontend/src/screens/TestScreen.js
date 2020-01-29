import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import moment from 'moment';
const data =
  [
    {
      "date": "2020-01-29",
      "estimatedOneRm": 56,
      "maxVolume": 250,
      "totalVolume": 100,
    },
    {
      "date": "2019-12-30",
      "estimatedOneRm": 56,
      "maxVolume": 250,
      "totalVolume": 550,
    },
  ]


const testScreen = () => {

    return (
<VictoryChart
  theme={VictoryTheme.material}
  minDomain={{ y: 0 }}
>
  <VictoryLine
    style={{
      data: { stroke: "#c43a31" },
      parent: { border: "1px solid #ccc"}
    }}
    data={data}
    x={(datum) => new Date(datum.date)}
    y="totalVolume"
    minDomain={{ y: 0 }}
    animate={{
      duration: 2000,
      onLoad: { duration: 1000 }
    }}
  />
</VictoryChart>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  }
});

export default testScreen;