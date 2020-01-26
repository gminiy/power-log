import React, { useEffect, useState, useReducer } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Button from '../components/Button';
import client from '../api/client';
import urls from '../common/urls';
import { LineChart } from 'react-native-chart-kit';

const reducer = (state, action) => {
  switch (action.type) {
    case 'init':
      return {
        ...state,
        newestDate: action.payload.newestDate,
        setListByDate: action.payload.setListByDate,
        chartOption: action.payload.chartOption
      };
    case 'set_error':
      return { ...state, error: action.payload }
    default:
      return state;
  };
};


const ChartScreen = ({ navigation }) => {
  const exerciseId = navigation.getParam('id');
  const [state, dispatch] = useReducer(reducer, {
    newestDate: "",
    setListByDate: [],
    chartOption: null,
    error: null
  });

  //useEffect(() => {init()}, []);
 
  const init = async () => {
    const response = await client.get(
      `${urls.getSetList}?page=1&size=1&exerciseId=${exerciseId}`
    );
    
    if (!response.data.length) return;
    
    const setListByDate = await getOneMonthData(response.data[0].date);
    const chartOption = await makeOption(setListByDate);
    
    dispatch({ type: 'init', payload: {
      newestDate: response.data[0].date,
      setListByDate,
      chartOption
    } });
  }

  const getOneMonthData = async (strNewestDate) => {
    const newestDate = new Date(strNewestDate);
    const dateBeforeOneMonth = new Date (newestDate - (30 * 1000 * 60 * 60 * 24));
    const strDateBeforeOneMonth = dateBeforeOneMonth.toISOString().slice(0,10);

    try {
      const response = await client.get(
        `${urls.getSetListWithPeriod}?from=${strDateBeforeOneMonth}&until=${strNewestDate}&exerciseId=${exerciseId}`
      );

      const setListByDate = response.data.reduce((acc, cur) => {
        const date = cur.date;
        const volume = cur.sets.reduce((acc, cur) => {
          return (cur.reps * cur.weight) + acc;
        }, 0);
        acc.push({ date, volume });
        return acc;
      }, []);
      
      return setListByDate;
    } catch (error) {
      console.log(error);
      dispatch({ type: 'set_error', payload: error });
    }
  }

  const makeOption = (setListByDate) => {
    const data = setListByDate.reduce((acc, cur) => {
      acc.days.push(cur.date);
      acc.volumes.push(cur.volume);
      return acc;
    }, {days: [], volumes: []});
    
    return {
      labels: data.days,
      datasets: [
        {
          data: data.volumes,
          strokeWidth: 2
        }
      ]
    }
    };

  return (
    <>
    {state.chartOption !== null &&
      <LineChart
        data={state.chartOption}
        width={wp('100%')}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#efefef',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
      }
    </>
  );
};

const styles = StyleSheet.create({
  
})


export default ChartScreen;