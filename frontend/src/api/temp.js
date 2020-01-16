import React, { Component } from "react";
import { StyleSheet, SafeAreaView, Button } from "react-native";
import { ECharts } from "react-native-echarts-wrapper";

const App = () => {
  const onRef = ref => {
    if (ref) {
      this.chart = ref;
    }
  };

  const onData = param => {};

  const initChart = () => {
    function randomData() {
      now = new Date(+now + oneDay);
      value = value + Math.random() * 21 - 10;
      return {
        name: now.toString(),
        value: [
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/"),
          Math.round(value)
        ]
      };
    }

    var data = [];
    var now = +new Date(1997, 9, 3);
    var oneDay = 24 * 3600 * 1000;
    var value = Math.random() * 1000;
    for (var i = 0; i < 1000; i++) {
      data.push(randomData());
    }

    option = {
      title: {
        text: "Dynamic Chart"
      },
      tooltip: {
        trigger: "axis",
        formatter: function(params) {
          params = params[0];
          var date = new Date(params.name);
          return (
            date.getDate() +
            "/" +
            (date.getMonth() + 1) +
            "/" +
            date.getFullYear() +
            " : " +
            params.value[1]
          );
        },
        axisPointer: {
          animation: false
        }
      },
      xAxis: {
        type: "time",
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: "value",
        boundaryGap: [0, "100%"],
        splitLine: {
          show: false
        }
      },
      series: [
        {
          type: "line",
          showSymbol: false,
          hoverAnimation: false,
          data: data
        }
      ]
    };

    this.chart.setOption(option);

    //no query parameter: whole option object
    this.chart.getOption(option => {
      console.log(option);
    });

    //with query parameter
    this.chart.getOption(
      option => {
        console.log(option);
      },
      ["dataZoom", "series"]
    );

    const instance = this.chart;

    setInterval(function() {
      for (var i = 0; i < 5; i++) {
        data.shift();
        data.push(randomData());
      }

      instance.setOption({
        series: [
          {
            data: data
          }
        ]
      });
    }, 100);
  };

  return (
    <SafeAreaView style={styles.chartContainer}>
      <Button title="Start" onPress={initChart} />

      <ECharts
        option={{}}
        ref={onRef}
        additionalCode={additionalCode}
        onData={onData}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    backgroundColor: "#F5FCFF"
  }
});