import React, { useReducer, useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Button from '../components/Button';
import client from '../api/client';
import urls from '../common/urls';

const reducer = (state, action) => {
  switch (action.type) {
    case 'init_sets':
      return { error: null, setList: action.payload };
    default:
      return state;
  }
};

const HistoryScreen = ({ navigation }) => {
  const exerciseId = navigation.getParam('id');
  const [state, dispatch] = useReducer(reducer, { setList: [], error: null });
  const [pageNumber, setPageNumber] = useState(1);

  const getSets = () => {


  }

  return (
    <Text>{navigation.getParam('id')}</Text>
  );
};

export default HistoryScreen;