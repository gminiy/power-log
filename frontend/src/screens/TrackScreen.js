import React, { useEffect, useContext, useState } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Context as AuthContext} from '../context/AuthContext';
import TrackButton from '../components/track/TrackButton';
import urls from '../common/urls';
import moment from 'moment';
import Track from '../components/track/Track';
import DatePicker from '../components/track/DatePicker';
import TrackInputForm from '../components/track/TrackInputForm';
import LoadingModal from '../modals/LoadingModal';

const TrackScreen = ({ navigation }) => {
  const exerciseId = navigation.getParam('id');
  const { state: { token } } = useContext(AuthContext);
  const [dayId, setDayId] = useState(null);
  const [sets, setSets] = useState([]);
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [date, setDate] = useState(moment());
  const [selectedItem, setSelectedItem] = useState(null);
  const [isValidate, setIsValidate] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {initSets()}, [date]);
  useEffect(() => {
    if (selectedItem) {
      setWeight(selectedItem.weight.toString());
      setReps(selectedItem.reps.toString());
    } else {
      initInputState();
    }
  }, [selectedItem]);
  useEffect(() => {
    navigation.setParams({ sets });
  }, [sets]);

  const initSets = async () => {
    const dateForm = date.format().slice(0, 10);

    try {
      setLoading(true);
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
    
      if (data.length === 0) {
        setDayId(null);
        return setSets([]);
      }
      setDayId(data[0].id);
      setSets(data[0].sets);
    } catch (error) {
      return setError(error);
    } finally {
      setLoading(false);
    }
  };

  const addSet = async () => {
    if (!weight || !reps) return setIsValidate(false);

    setLoading(true);
    const dateForm = date.format().slice(0, 10);
    try {
      if (dayId === null) {
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
        
        setDayId(data.dayId);
        setSets(sets.concat(data.set));
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
            weight, reps, exerciseId, dayId
          })
        },
      );

      if (!response.ok) throw Error(response.status);

      const data = await response.json();

      setSets(sets.concat(data));
    } catch (error) {
      return setError(error);
    } finally {
      initInputState();
      setLoading(false);
    }
  };
  
  const updateSet = async () => {
    if (!weight || !reps) return setIsValidate(false);

    setLoading(true);
    try {
      const response = await fetch(
        `${urls.updateSet}/${dayId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            token
          },
          body: JSON.stringify({ weight, reps })
        },
      );
      
      if (!response.ok) throw Error(response.status);

      return setSets(sets.map((set) => {
        return set.id === selectedItem.id 
        ? { ...set, weight, reps }
        : set
      }));
    } catch (error) {
      return setError(error);
    } finally {
      initInputState();
      setLoading(false);
    }
  };
  
  const deleteSet = async () => {
    setLoading(true);
    try {
      if (sets.length === 1) {
        await fetch(
          `${urls.deleteDay}/${dayId}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              token
            },
          }
        );
        setSets(sets.filter((set) => set.id !== selectedItem.id));
        return setDayId(null);
      }

      await fetch(
        `${urls.deleteSet}/${selectedItem.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            token
          },
        }
      );
      setSets(sets.filter((set) => set.id !== selectedItem.id));
    } catch (error) {
      return setError(error);
    } finally {
      initInputState();
      setLoading(false);
    }
  };

  const initInputState = () => {
    setSelectedItem(null);
    setIsValidate(true);
    setWeight('');
    setReps('');
  }

  return (
    <>
      <LoadingModal isVisible={loading} />
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
        {selectedItem ? (
          <>
            <TrackButton
              title="수정"
              style='update'
              onPress={updateSet}
            />
            <TrackButton
              title="삭제"
              style='delete'
              onPress={deleteSet}
            />
          </>
        ) : (
          <>
            <TrackButton
              title="기록"
              style='add'
              onPress={addSet}
            />
            <TrackButton
              title="초기화"
              style='init'
              onPress={initInputState}
            />
          </>
        )}
      </View>
      <FlatList
        data={sets}
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