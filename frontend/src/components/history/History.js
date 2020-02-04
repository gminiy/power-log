import React from 'react';
import { StyleSheet, Text, FlatList, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const History = React.memo(({ item }) => {

  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
      <FlatList
        data={item.sets}
        keyExtractor={(set) => `set${set.id}`}
        renderItem={({ item, index }) => {
          return (
            <View style={styles.contentContainer}>
              <View style={styles.weightContainer}>
                <Text style={styles.contentText}>{index + 1}</Text>
                <Text style={styles.unitText}>  세트</Text>
              </View>
              <View style={styles.weightContainer}>
                <Text style={styles.contentText}>{item.weight}</Text>
                <Text style={styles.unitText}>  kg</Text>
              </View>
              <View style={styles.repsContainer}>
                <Text style={styles.contentText}>{item.reps}</Text>
                <Text style={styles.unitText}>  회</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eae6e3',
    width: wp('94%'),
    alignSelf: 'center',
    marginTop: hp('3%'),
    borderRadius: 5,
    paddingTop: hp('1%'),
    paddingBottom: hp('1%'),
  },
  dateContainer: {
    width: wp('90%'),
    borderBottomWidth: 1.5,
    borderBottomColor: '#64534c',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    marginBottom: hp('1%')
  },
  dateText: {
    color: '#7b6d64',
    fontWeight: 'bold',
    fontSize: wp('4%')
  },
  contentContainer: {
    width: wp('90%'),
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  weightContainer: {
    width: wp('20%'),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginRight: wp('5%')
  },
  repsContainer: {
    width: wp('15%'),
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  contentText: {
    fontSize: wp('6%'), 
  },
  unitText: {
    fontSize: wp('4%'),
    color: '#777777'
  }
});

export default History