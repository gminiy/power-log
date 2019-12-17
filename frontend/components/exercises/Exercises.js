import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import useFetch from '../../src/lib/useFetch';
import urls from '../../src/lib/urls';
import Exercise from './Exercise';
import UserContext from '../../context/user';

const Exercises = () => {
  const { state } = useContext(UserContext);
  const [exercises, setExercises] = useState([]);
  useEffect(() => { getExercises(); }, []);

  const getExercises = async () => {
    const options = {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          jwt: state.token,
        },
        method: 'GET'
      };
    const response = await useFetch(urls.getExercises, options);
    const exercises = await response.json();
    setExercises(exercises);
  }

  return (
    <View style={styles.container}>
      {exercises.map((exercise) => (<Exercise key={exercise.id} id={exercise.id} name={exercise.name} />))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Exercises;