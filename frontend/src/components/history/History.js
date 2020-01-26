import React from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const History = ({ item }) => {
  return (
    <View>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    width: wp('90%'),
    height: hp('5%'),
    borderBottomWidth: 1.5,
    borderBottomColor: '#64534c',
    justifyContent: 'flex-end',
    alignSelf: 'center'
  },
  dateText: {
    color: '#9c8856',
    fontWeight: 'bold',
    fontSize: wp('3.5%')
  }
  
});

export default History