import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Button from '../components/Button';
import { Context as SetHistoryContext } from '../context/SetHistoryContext';

const HistoryScreen = ({ navigation }) => {
  const exerciseId = navigation.getParam('id');
  const size = 5;
  const {
    state: { setListByDate },
    setSetListByDate
  } = useContext(SetHistoryContext);
  const [page, setPage] = useState(1);

  useEffect(() => {setSetListByDate({ page, size, exerciseId });}, []);

  return (
    <FlatList
      data={setListByDate}
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