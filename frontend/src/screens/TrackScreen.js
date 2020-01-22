import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Context as AuthContext} from '../context/AuthContext';
import Button from '../components/Button';
import client from '../api/client';
import urls from '../common/urls';
import moment from 'moment';
import DatePicker from '../components/DatePicker';

const TrackScreen = ({ navigation }) => {
  const exerciseId = navigation.getParam('id');
  const { state: { token } } = useContext(AuthContext);
  const [daySets, setDaySets] = useState({ id: null, sets: [] });
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [date, setDate] = useState(moment());
  const [updateMode, setUpdateMode] = useState({ on: false, id: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {initSets()}, [date]);

  const initSets = async () => {
    try {
      const dateForm = date.format().slice(0, 10);
      
      const response = await fetch(
        `${urls.getSets}?exerciseId=${exerciseId}&date=${dateForm}`,
        {
          headers: {
            'Content-Type': 'application/json',
            token
          }
        },
      );

      if (!response.ok) throw Error(response.status);

      const data = await response.json();
    
      if (data.length === 0) return setDaySets({ id: null, sets: [] });

      setDaySets(data[0]);
    } catch (error) {
      console.log(error);
      return setError(error);
    }
  };

  const addSet = async () => {
    try {
      if (daySets.id === null) {
        const response = await client.post(
          urls.addSetWithDate,
          { weight, reps, exerciseId, date },
        );
        setSetList(daySets.concat(response.data.set));
        setDayId(response.data.id);
        return;
      }

      const response = await client.post(
        urls.addSet,
        { weight, reps, exerciseId, dayId },
      );

      setSetList(daySets.concat(response.data));
    } catch (error) {
      console.log(error);
      return setError(error);
    }
  };
  
  const updateSet = async (id) => {
    try {
      await client.put(
        `${urls.addSet}/${id}`,
        { weight, reps },
      );
      
      return setSetList(daySets.map((set) => {
        return set.id === id 
        ? { ...set, weight, reps }
        : set
      }));
    } catch (error) {
      console.log(error);
      return setError(error);
    }
  };
  
  const deleteSet = async (id) => {
    try {
      if (daySets.length === 1) {
        await client.delete(`${url.deleteDay}/${dayId}`);
        
        return initSetList(date);
      }
      await client.delete(`${urls.deleteSet}/${id}`);
  
      setSetList(daySets.filter((set) => set.id !== id));
    } catch (error) {
      console.log(error);
      return setError(error);
    }
  };

  const initInputState = () => {
    setWeight('');
    setReps('');
    setUpdateMode({ on: false, id: null });
  }

  return (
    <>
      <DatePicker
        date={date}
        setDate={setDate}
      />
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
              await updateSet(updateMode.id);
              initInputState();
            }}
          />
        :
          <Button
            title="기록"
            styles={buttonStyles}
            onPress={async () => {
              await addSet();
              initInputState();
            }}
          />
        }
        <Button
          title="초기화"
          styles={buttonStyles}
          onPress={()=>{
            initInputState();
          }}
        />
      </View>
      <View style={styles.titleContainer}>
        <View style={styles.spacer}/>
      </View>
      <FlatList
        data={daySets.sets}
        keyExtractor={(set) => `${set.id}`}
        renderItem={({ item }) => {
          return (
            <View style={styles.setContainer}>
              <Text style={styles.set}>무게 : {item.weight} 횟수: {item.reps}</Text>
              {updateMode.on 
              ? <Button
                  title="취소"
                  styles={buttonStyles}
                  onPress={() => initInputState()}
                />
              : <Button
                  title="수정"
                  styles={buttonStyles}
                  onPress={() => {
                    setWeight(item.weight.toString());
                    setReps(item.reps.toString());
                    setUpdateMode({ on: true, id: item.id });
                  }}
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