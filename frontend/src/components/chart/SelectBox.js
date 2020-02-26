import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Entypo';


const SelectBox = ({ value, data, onSelect }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => {setModalVisible(true)}}
        style={styles.button}
      >
        <>
          <Text style={styles.title}>{value}</Text>
          <Icon name="triangle-down" size={wp('5%')}/>
        </>
      </TouchableOpacity>
      <Modal
        isVisible={modalVisible}
        backdropOpacity={0.7}
        onBackdropPress={() => setModalVisible(false)}
        animationIn='fadeIn'
        animationInTiming={50}
        animationOut='fadeOut'
        animationOutTiming={50}
        style={{ alignItems: 'center' }}
      >
        <View 
          style={[styles.modal, {
            width: styles.button.width,
          }]}
        >
          <FlatList
            data={data}
            keyExtractor={( item, index ) => `${index}`}
            renderItem={({ item, index }) =>{
              return (
                <TouchableOpacity
                  onPress={() => {
                    onSelect({ item, index });
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.item}>{item.label}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    borderRadius: 5,
    paddingBottom: hp('0.5%')
  },
  title: {
    fontSize: wp('3.5%'),
  },
  button: {
    paddingLeft: wp('2%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#b3b3b3',
    width: wp('80%'),
    height: hp('5%'),
    marginTop: 0,
  },
  item: {
    padding: hp('2%'),
    borderBottomColor: '#d7d7d7',
    borderBottomWidth: 1,
    fontSize: wp('3.5%')
  }
});

export default SelectBox;