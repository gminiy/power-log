import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';
import AddExerciseModal from '../modals/AddExerciseModal';
import client from '../api/client';
import urls from '../common/urls';

const ExerciseListScreen = ({ navigation }) => {
  const [addExerciseModalVisible, setAddExerciseModalVisable] = useState(false);
  const [exerciseList, setExerciseList] = useState([]);

  const initExerciseList = async () => {
    const response = await client.get(urls.getExercises);
    const { data } = response;
    setExerciseList(data);
  };

  useEffect(() => initExerciseList(), []);

  return (
    <View>
      <AddExerciseModal
        isVisible={addExerciseModalVisible}
        setIsVisible={setAddExerciseModalVisable}
        initExerciseList={initExerciseList}  
      />
      <TouchableOpacity 
        onPress={() => setAddExerciseModalVisable(true)}
        style={styles.icon}
      >
        <AntDesign name="pluscircleo" size={wp('15%')} color='#26306c' />
      </TouchableOpacity>
      <FlatList
        data={exerciseList}
        keyExtractor={(exercise) => `${exercise.id}`}
        renderItem={({ item }) => <Text>{item.name} {item.id}</Text>}
      />
    </View>
  );
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

export default ExerciseListScreen;