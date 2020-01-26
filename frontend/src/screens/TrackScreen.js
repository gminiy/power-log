import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Context as AuthContext} from '../context/AuthContext';
import TrackButton from '../components/track/TrackButton';
import urls from '../common/urls';
import moment from 'moment';
import Track from '../components/track/Track';
import DatePicker from '../components/DatePicker';
import TrackInputForm from '../components/track/TrackInputForm';

const TrackScreen = ({ navigation }) => {
  const exerciseId = navigation.getParam('id');
  const { state: { token } } = useContext(AuthContext);
  const [daySets, setDaySets] = useState({ id: null, sets: [] });
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [date, setDate] = useState(moment());
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isValidate, setIsValidate] = useState(true);

  useEffect(() => {initSets()}, [date]);
  useEffect(() => {
    if (selectedItem) {
      setWeight(selectedItem.weight.toString());
      setReps(selectedItem.reps.toString());
    } else {
      initInputState();
    }
  }, [selectedItem])

  const initSets = async () => {
    const dateForm = date.format().slice(0, 10);

    try {
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
    if (!weight || !reps) return setIsValidate(false);
    const dateForm = date.format().slice(0, 10);
    try {
      if (daySets.id === null) {
        const response = await fetch(
          `${urls.addSetWithDate}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              token
            },
            body: JSON.stringify({
              weight, reps, exerciseId, date: dateForm
            })
          },
        );

        if (!response.ok) throw Error(response.status);

        const data = await response.json();

        setDaySets({id: data.dayId, sets: daySets.sets.concat(data.set)});
        return;
      }

      const response = await fetch(
        `${urls.addSet}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            token
          },
          body: JSON.stringify({
            weight, reps, exerciseId, dayId: daySets.id
          })
        },
      );

      if (!response.ok) throw Error(response.status);

      const data = await response.json();

      setDaySets({...daySets, sets: daySets.sets.concat(data)});
    } catch (error) {
      console.log(error);
      return setError(error);
    } finally {
      initInputState();
    }
  };
  
  const updateSet = async (id) => {
    // try {
    //   await client.put(
    //     `${urls.addSet}/${id}`,
    //     { weight, reps },
    //   );
      
    //   return setSetList(daySets.map((set) => {
    //     return set.id === id 
    //     ? { ...set, weight, reps }
    //     : set
    //   }));
    // } catch (error) {
    //   console.log(error);
    //   return setError(error);
    // }
  };
  
  const deleteSet = async (id) => {
    // try {
    //   if (daySets.length === 1) {
    //     await client.delete(`${url.deleteDay}/${dayId}`);
        
    //     return initSetList(date);
    //   }
    //   await client.delete(`${urls.deleteSet}/${id}`);
  
    //   setSetList(daySets.filter((set) => set.id !== id));
    // } catch (error) {
    //   console.log(error);
    //   return setError(error);
    // }
  };

  const initInputState = () => {
    setIsValidate(true);
    setWeight('');
    setReps('');
  }

  return (
    <>
      <DatePicker
        date={date}
        setDate={setDate}
      />
      {!isValidate && (
        <Text style={styles.warningText}>무게와 횟수를 입력해주세요.</Text>
      )}
      <TrackInputForm type='weight' state={weight} setState={setWeight} />
      <TrackInputForm type='reps' state={reps} setState={setReps} />
      <View style={styles.buttonContainer}>
        {selectedItem ? 
          <TrackButton
            title="수정"
            style='dark'
            onPress={async () => {}}
          />
        :
          <TrackButton
            title="기록"
            style='dark'
            onPress={async () => await addSet()}
          />
        }
        <TrackButton
          title="초기화"
          style='light'
          onPress={()=> initInputState()}
        />
      </View>
      <FlatList
        data={daySets.sets}
        keyExtractor={(set) => `${set.id}`}
        renderItem={({ item, index }) => {
          return (
            <Track
              item={item}
              index={index}
              isSelected={selectedItem ? (selectedItem.id === item.id) : false}
              setSelectedItem={setSelectedItem}
            />
          );
        }}
      />
  </>
  );
};

const styles = StyleSheet.create({
  warningText: {
    alignSelf: 'center',
    color: '#e15249',
    marginTop: hp('0.5%')
  },
  setContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  set: {
    fontSize: wp('8%'),
  },
  buttonContainer: {
    width: wp('85%'),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('3.5%'),
  }
});

export default TrackScreen;