import React, { useReducer, useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Button from '../components/Button';
import client from '../api/client';
import urls from '../common/urls';
import { onDidFailWithError } from 'expo/build/AR';

const HistoryScreen = ({ navigation }) => {
  const exerciseId = navigation.getParam('id');
  const size = 5;
  const [setsByDate, setSetsByDate] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {getSetList()}, []);

  const getSetList = async () => {
    const response = await client.get(
      `${urls.getSetList}?size=${size}&&page=${page}&&exerciseId=${exerciseId}`
    );
    
    setSetsByDate(setsByDate.concat(response.data));
    // response.data
    // [{
    //   date: "YYYY-MM-DD",
    //   id: Number,
    //   sets: [
    //     {
    //       id: Number,
    //       reps: Number,
    //       weight: number
    //     }
    //   ]
    // }...3일]
  }

  return (
    <FlatList
      data={setsByDate}
      keyExtractor={(setByDate) => `date${setByDate.id}`}
      renderItem={({ item }) => {
        return (
          <>
            <Text>날짜 : {item.date}</Text>
            <FlatList
              data={item.sets}
              keyExtractor={(set) => `set${set.id}`}
              renderItem={({ item }) => {
                return (
                  <>
                    <Text>무게 : {item.weight}</Text>
                    <Text>횟수 : {item.reps}</Text>
                  </>
                )
              }}
            />
          </>
        );
      }}
    />
  );
};

export default HistoryScreen;