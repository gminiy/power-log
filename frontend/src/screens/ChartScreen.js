import React, { useContext, useEffect, useState, useReducer } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, Picker } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import urls from '../common/urls';
import { Context as AuthContext} from '../context/AuthContext';
import SelectBox from '../components/SelectBox';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryScatter, VictoryGroup,VictoryAxis } from "victory-native";
import LoadingModal from '../modals/LoadingModal';

const ChartScreen = ({ navigation }) => {
  const exerciseId = navigation.getParam('id');
  const { state: { token } } = useContext(AuthContext);
  const types = [
    { label: '총 볼륨 (세트수 x 무게 x 횟수)', value: 'totalVolume' },
    { label: '최대 볼륨 (무게 x 횟수)', value: 'maxVolume' },
    { label: '예상 1RM', value: 'estimatedOneRm' }
  ];
  const [type, setType] = useState(types[0]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const { remove } = navigation.addListener('willFocus', init);
  
    return remove;
  }, []);
 
  const init = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${urls.getLatestDay}?exerciseId=${exerciseId}`,
        {
          headers: {
              'Content-Type': 'application/json',
              token
          }
        }
      );
  
      if(!response.ok) throw Error(response.status);
  
      const { date: latestDate } = await response.json();

      setMonthlyData({ latestDate, month: 1 });
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  const setMonthlyData = async ({ latestDate, month }) => {
    const dateFrom = new Date (new Date(latestDate) - (30 * 1000 * 60 * 60 * 24)*month);
    const strDateFrom = dateFrom.toISOString().slice(0,10);

    try {
      const response = await fetch(
        `${urls.getSetListWithPeriod}?from=${strDateFrom}&until=${latestDate}&exerciseId=${exerciseId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            token
          }
        }
      );

      if(!response.ok) throw Error(response.status);
      
      const monthlyData = await response.json();

      const parsedData = [];
      monthlyData.forEach((data) => {
        const { totalVolume, maxVolumeSet } = getVolumeInfo(data.sets);
        const maxVolume = maxVolumeSet.volume;
        const estimatedOneRm = estimateOneRm(maxVolumeSet);

        return parsedData.push({
          date: data.date,
          totalVolume,
          maxVolume,
          estimatedOneRm
        });
      });
      
      return setData(parsedData);
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  const getVolumeInfo = (sets) => {
    let totalVolume = 0;
    let maxVolumeSet = { volume: 0, weight: 0, reps: 0 };

    sets.forEach((set) => {
      totalVolume = totalVolume + set.volume;
      maxVolumeSet = (maxVolumeSet.volume < set.volume) ? set : maxVolumeSet;
    });

    return { totalVolume, maxVolumeSet };
  };

  const estimateOneRm = (maxVolumeSet) => {
    const { reps, weight } = maxVolumeSet;
    const estimatedOneRm = Math.floor((weight * 36) / ( 37 - reps));

    return estimatedOneRm;
  }

  const getTickXValues = () => {
    const values = [];
    data.forEach((datum) => {
      values.push(new Date(datum.date))
    });

    return values;
  }

  const dateMapping = (date) => {
    const dateArr = date.split(' ');
    const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const month = `${monthList.indexOf(dateArr[1]) + 1}` + '월';
    const day = `${parseInt(dateArr[2])}` + '일';

    return month + ' ' + day;
  }

  return (
    <>
      <LoadingModal isVisible={loading} />
      <View style={styles.selectBoxContainer}>
        <Text style={styles.selectBoxTitle}>그래프 : </Text>
        <SelectBox
          data={types}
          value={type.label}
          onSelect={({ item, index }) => {setType(item)}}
        />
      </View>
      {data.length !== 0 && (
        <>
          <VictoryChart
            theme={VictoryTheme.material}
            minDomain={{ y: 0 }}
            width={wp('100%')}
            height={hp('60%')}
            scale={{ x: "time", y: "linear" }}
          >
            <VictoryGroup
              data={data}
              x={(datum) => new Date(datum.date)}
              y={type.value}
            >
              <VictoryAxis
                standalone={false}
                tickValues={getTickXValues()}
                tickFormat={
                  (x, index, ticks) => {
                    const date = dateMapping(x.toString().slice(0,10))

                    if (ticks.length > 4) {
                      if (index % (Math.floor(ticks.length / 3)) === 0) {
                        return date;
                      }
                      return;
                    }
                    return date;
                  }
                }
              />
              <VictoryAxis dependentAxis
                standalone={false}
              />
              <VictoryLine
                style={{
                  data: { stroke: "black", strokeWidth: 2 },
                }}
              />
              <VictoryScatter
                style={{ data: { fill: "#081852" } }}
                size={3}
              />
            </VictoryGroup>
          </VictoryChart>
          <Text style={styles.graphNoticeText}>* 그래프의 점을 선택하시면 자세한 기록을 볼 수 있습니다.</Text>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  selectBoxContainer: {
    marginTop: hp('0.5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: wp('2%'),
    alignItems: 'center'
  },
  selectBoxTitle: {
    fontSize: wp('4.2%'),
    fontWeight: 'bold',
    color: '#777777'
  },
  graphNoticeText: {
    fontSize: wp('2.5%'),
    alignSelf: 'flex-end',
    marginRight: wp('5%')
  }
})


export default ChartScreen;