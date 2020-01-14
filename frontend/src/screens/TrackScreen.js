import React, { useState, useEffect, useReducer } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Button from '../components/Button';
import client from '../api/client';
import urls from '../common/urls';

const reducer = (state, action) => {
  switch (action.type) {
    case 'delete_set':
      return {
        ...state,
        setList:
          state.setList.filter(
            (set) => set.id !== action.payload.id
          )
      };
    case 'update_set':
      return { ...state, setList: state.setList.map((set) => {
        return set.id === action.payload.id
          ? set = action.payload
          : set
      })};
    case 'init_sets':
      return { error: null, setList: action.payload };
    case 'set_error':
      return { ...state, error: action.payload };
    case 'add_set':
      return { ...state, setList: state.setList.concat(action.payload)};
    default:
      return state;
  }
};

const TrackScreen = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, { setList: [], error: null });
  const [updateMode, setUpdateMode] = useState({ on: false, set: null });
  const [weight, setWeight] = useState();
  const [reps, setReps] = useState();
  const exerciseId = navigation.getParam('id');
  
  useEffect(() => {initSetList(exerciseId)}, []);

  const onUpdateMode = (set) => {
    setUpdateMode({ on: true, set });
    setWeight(set.weight.toString()) ;
    setReps(set.reps.toString());
  }
  
  const initSetList = async (exerciseId) => {
    try {
      const rightNow = new Date();
      const date = rightNow.toISOString().slice(0,10);
      
      const response = await client.get(
        `${urls.getSets}?id=${exerciseId}&date=${date}`
      );
  
      return dispatch({ type: 'init_sets', payload: response.data });
    } catch (error) {
      console.log(error);
      return dispatch({ type: 'set_error', payload: error });
    }
  };
  
  const addSet = async ({ weight, reps, exerciseId }) => {
    try {
      const response = await client.post(
        urls.addSet,
        { weight, reps, exerciseId },
      );
      
      return dispatch({ type: 'add_set', payload: response.data});
    } catch (error) {
      console.log(error);
      return dispatch({ type: 'set_error', payload: error });
    }
  };
  
  const updateSet = async ({ id, weight, reps }) => {
    try {
      await client.put(
        `${urls.addSet}/${id}`,
        { weight, reps },
      );
      
      return dispatch({ type: 'update_set', payload: { id, weight, reps } });
    } catch (error) {
      console.log(error);
      return dispatch({ type: 'set_error', payload: error });
    }
  };
  
  const deleteSet = async (id) => {
    try {
      await client.delete(`${urls.deleteSet}/${id}`);
  
      return dispatch({ type: 'delete_set', payload: { id } });
    } catch (error) {
      console.log(error);
      return dispatch({ type: 'set_error', payload: error });
    }
  };

  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>무게</Text>
        <View style={styles.spacer}/>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="0"
          placeholderTextColor="black"
          style={styles.input}
          value={weight}
          onChangeText={setWeight}
          keyboardType={'numeric'}
        />
        <Text style={styles.unit}>KG</Text>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>회수</Text>
        <View style={styles.spacer}/>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="0"
          placeholderTextColor="black"
          style={styles.input}
          value={reps}
          onChangeText={setReps}
          keyboardType={'numeric'}
        />
        <Text style={styles.unit}>개</Text>
      </View>
      <View style={styles.buttonContainer}>
        {updateMode.on ? 
          <Button
            title="수정"
            styles={buttonStyles}
            onPress={async () => {
              await updateSet({
                id: updateMode.set.id,
                weight,
                reps
              })
              setWeight();
              setReps();
              setUpdateMode({ on: false, set: null });
            }}
          />
        :
          <Button
            title="기록"
            styles={buttonStyles}
            onPress={async () => {
              await addSet({ weight, reps, exerciseId });
              setWeight();
              setReps();
            }}
          />
        }
        <Button
          title="초기화"
          styles={buttonStyles}
          onPress={()=>{
            setWeight();
            setReps();
          }}
        />
      </View>
      <View style={styles.titleContainer}>
        <View style={styles.spacer}/>
      </View>
      <FlatList
        data={state.setList}
        keyExtractor={(set) => `${set.id}`}
        renderItem={({ item }) => {
          return (
            <View style={styles.setContainer}>
              <Text style={styles.set}>무게 : {item.weight} 횟수: {item.reps}</Text>
              {updateMode.on ?
                <Button
                  title="취소"
                  styles={buttonStyles}
                  onPress={() => {
                    setWeight(null);
                    setReps(null);
                    setUpdateMode(false);
                  }}
                />
              :
                <Button
                  title="수정"
                  styles={buttonStyles}
                  onPress={() => onUpdateMode(item)}
                />
              }
              {!updateMode.on &&
               <Button
                  title="삭제"
                  styles={buttonStyles}
                  onPress={() => deleteSet(item.id)}
                />
              }
            </View>
          );
        }}
      />
  </>
  );
};

const styles = StyleSheet.create({
  setContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  set: {
    fontSize: wp('8%'),
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: hp('3%'),
  },
  title: {
    alignSelf: 'flex-start',
    marginLeft: wp('10%'),
    marginBottom: hp('1%'),
    fontSize: wp('6%')
  },
  spacer: {
    width: wp('90%'),
    height: hp('0.3%'),
    backgroundColor: 'blue'
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  input: {
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    width: wp('30%'),
    height: hp('8%'),
    fontSize: wp('8%'),
  },
  unit: {
    marginLeft: wp('2%'),
    fontSize: wp('6%')
  },
  buttonContainer: {
    width: wp('45%'),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('3%')
  }
})

const buttonStyles = StyleSheet.create({
  button: {
    width: wp('20%'),
    height: hp('6%'),
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: wp('6%')
  }
});

export default TrackScreen;