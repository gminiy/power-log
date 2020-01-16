import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';
import AddExerciseModal from '../modals/AddExerciseModal';
import Button from '../components/Button';
import ExerciseMenu from '../components/ExerciseMenu';
import { Context as ExerciseContext } from '../context/ExerciseContext';
import LogoutButton from '../components/LogoutButton';

const ExerciseListScreen = ({ navigation }) => {
  const [addExerciseModalVisible, setAddExerciseModalVisable] = useState(false);
  const { state: { exerciseList }, initExerciseList } = useContext(ExerciseContext);

  useEffect(() => {
    initExerciseList()
  }, []);

  return (
    <View>
      <AddExerciseModal
        isVisible={addExerciseModalVisible}
        setIsVisible={setAddExerciseModalVisable}
      />
      <FlatList
        data={exerciseList}
        keyExtractor={(exercise) => `${exercise.id}`}
        renderItem={({ item }) => {
          return (
            <Button 
              title={item.name}
              styles={buttonStyles}
              onPress={() => navigation.navigate(
                'ExerciseTabs',
                { id: item.id, name: item.name }
              )}
            >
              <ExerciseMenu
                exerciseId={item.id}
                exerciseName={item.name}
              />
            </Button>
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
    title: '파워로그',
    headerStyle: { marginBottom: hp('2%')},
    headerRight: () => (
      <LogoutButton navigation={navigation}/>
    )
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
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFF0F1',
    marginBottom: hp('0.5%'),
    borderRadius: 5,
    paddingLeft: wp('5%'),
    paddingRight: wp('5%'),
    alignSelf: 'center'
  },
  title: {
    fontSize: wp('4.5%'),
  }
});

export default ExerciseListScreen;