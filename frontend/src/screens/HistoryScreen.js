import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Context as AuthContext} from '../context/AuthContext';
import History from '../components/history/History';
import client from '../api/client';
import urls from '../common/urls';

const HistoryScreen = ({ navigation }) => {
  const exerciseId = navigation.getParam('id');
  const { state: { token } } = useContext(AuthContext);
  const size = 10;
  const [setsByDate, setSetsByDate] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getSetList = async () => {
      try {
        const response = await fetch(
          `${urls.getSetList}?size=${size}&&page=${page}&&exerciseId=${exerciseId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              token
            }
          }
        );
  
        if (!response.ok) throw Error(response.status);
        
        const data = await response.json();
        setSetsByDate(setsByDate.concat(data));
      } catch (e) {
        return setError(error);
      }
    };
    
    const { remove } = navigation.addListener('willFocus', getSetList);
  
    return remove;
  }, []);

  return (
    <FlatList
      data={setsByDate}
      keyExtractor={(setByDate) => `date${setByDate.id}`}
      renderItem={({ item }) => {
        return (
          <History
            item={item}
          />
        )
      }}
    />
  );
};

export default HistoryScreen;