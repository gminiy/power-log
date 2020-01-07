import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';
import AddExerciseModal from '../modals/AddExerciseModal';
import client from '../api/client';
import urls from '../common/urls';
import Button from '../components/Button';

const ExerciseListScreen = ({ navigation }) => {
  const [addExerciseModalVisible, setAddExerciseModalVisable] = useState(false);
  const [exerciseList, setExerciseList] = useState([]);

  const initExerciseList = async () => {
    const response = await client.get(urls.getExercises);
    const { data } = response;
    setExerciseList(data);
  };

  useEffect(() => {
    initExerciseList()
  }, []);

  return (
    <View>
      <AddExerciseModal
        isVisible={addExerciseModalVisible}
        setIsVisible={setAddExerciseModalVisable}
        initExerciseList={initExerciseList}  
      />
      <FlatList
        data={exerciseList}
        keyExtractor={(exercise) => `${exercise.id}`}
        renderItem={({ item }) => {
          return (
            <Button 
              title={item.name}
              styles={buttonStyles}
              onPress={() => navigation.navigate('SetList', { id: item.id, name: item.name })}
            />
          );
        }}
      />
      <TouchableOpacity 
        onPress={() => setAddExerciseModalVisable(true)}
        style={styles.icon}
      >
        <AntDesign name="pluscircle" size={wp('15%')} color='#26306c' />
      </TouchableOpacity>
    </View>
  );
};

ExerciseListScreen.navigationOptions = ({ navigation }) => {
  return {
    title: 'Power Log',
    headerStyle: { marginBottom: hp('2%')}
  }
}


const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    top: hp('77%'),
    left: wp('77%'),
    width: wp('16%'),
    height: hp('10%')
  },
});

const buttonStyles = StyleSheet.create({
  button: {
    width: wp('96%'),
    height: hp('7%'),
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#EFF0F1',
    marginBottom: hp('0.5%'),
    borderRadius: 5,
    paddingLeft: wp('5%'),
    alignSelf: 'center'
  },
  title: {
    fontSize: wp('4.5%'),
  }
});

export default ExerciseListScreen;