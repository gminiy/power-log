import React from 'react';;
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const DatePicker = ({ date, setDate }) => {
  const leftArrowPressHandle = () => {
    setDate(date.clone().subtract(1, 'day'));
  };

  const rightArrowPressHandle = () => {
    setDate(date.clone().add(1, 'day'));
  };

  const dateMapping = (date) => {
    const dateArr = date.split(' ');
    const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const weekDayHash = {
      'Monday': '월',
      'Tuesday': '화',
      'Wednesday': '수',
      'Thursday': '목',
      'Friday': '금',
      'Saturday': '토',
      'Sunday': '일'
    };
    const month = `${monthList.indexOf(dateArr[0]) + 1}` + '월';
    const day = `${parseInt(dateArr[1])}` + '일';
    const weekDay = weekDayHash[dateArr[2]];

    return month + ' ' + day + ' ' + weekDay;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={leftArrowPressHandle}>
        <SimpleLineIcons name="arrow-left" size={wp('7%')} />
      </TouchableOpacity>
      <Text style={styles.text}>{dateMapping(date.format('MMM Do dddd'))}</Text>
      <TouchableOpacity onPress={rightArrowPressHandle}>
        <SimpleLineIcons name="arrow-right" size={wp('7%')} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: hp('7%'),
    alignItems: 'center',
    paddingLeft: wp('4%'),
    paddingRight: wp('4%'),
    paddingTop: hp('1.5%'),
    paddingBottom: hp('1.5%'),
    backgroundColor: '#f5f5f5'
  },
  text: {
    fontSize: wp('4.5%')
  }
});

export default DatePicker;