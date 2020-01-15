import React, { useEffect, useReducer, useState } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { ECharts } from "react-native-echarts-wrapper";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Button from '../components/Button';
import client from '../api/client';
import urls from '../common/urls';

const ChartScreen = ({ navigation }) => {
  const option = {
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed"]
    },
    yAxis: {
      type: "value"
    },
    series: [
      {
        data: [125, 24, 113],
        type: "line"
      }
    ]
  };

  return (
    <ECharts
      option={option}
      backgroundColor="rgba(93, 169, 81, 0.3)"
    />
  )
};

const styles = StyleSheet.create({
  
})


export default ChartScreen;