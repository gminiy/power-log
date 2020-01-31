import React, { useContext, useEffect, useState, useReducer } from 'react';
import { StyleSheet, Text, TextInput, View, FlatList, Picker } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import urls from '../common/urls';
import { Context as AuthContext} from '../context/AuthContext';
import SelectBox from '../components/SelectBox';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryScatter, VictoryGroup,VictoryAxis } from "victory-native";
import LoadingModal from '../modals/LoadingModal';
import PeriodButton from '../components/chart/PeriodButton';
//Todo LackData 어떻게 처리하징
const ChartScreen = ({ navigation }) => {
  const exerciseId = navigation.getParam('id');
  const { state: { token } } = useContext(AuthContext);
  const types = [
    { label: '총 볼륨 (세트수 x 무게 x 횟수)', value: 'totalVolume' },
    { label: '최대 볼륨 (무게 x 횟수)', value: 'maxVolume' },
    { label: '예상 1RM', value: 'estimatedOneRm' }
  ];
  const [type, setType] = useState(types[0]);
  const [periodData, setPeriodData] = useState({
    oneMonth: { isUpdated: false, data: [] },
    threeMonth: { isUpdated: false, data: [] },
    sixMonth: { isUpdated: false, data: [] },
    year: { isUpdated: false, data: [] },
    all: { isUpdated: false, data: [] }
  });
  const [month, setMonth] = useState('oneMonth');
  const [isLackData, setIsLackData] = useState(false);
  const [latestDate, setLatestDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const { remove } = navigation.addListener('willFocus', async () => {
      setPeriodData({
        oneMonth: { isUpdated: false, data: [] },
        threeMonth: { isUpdated: false, data: [] },
        sixMonth: { isUpdated: false, data: [] },
        year: { isUpdated: false, data: [] },
        all: { isUpdated: false, data: [] }
      });

      setIsLackData(false);

      setMonth('oneMonth');
      const latestDate = await getLatestDate();
      if (latestDate === undefined) return;
      
      const oneMonthData = await getMonthlyData({ latestDate, month: 1 });
      
      if(oneMonthData.length < 2) return setIsLackData(true);

      return setPeriodData({ ...periodData, oneMonth: { isUpdated: true, data: oneMonthData } });
    });
  
    return remove;
  }, []);

  useEffect(() => { setMonthlyDate(); }, [month]);
 
  const getLatestDate = async () => {
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
  
      if(response.status == 204) return setIsLackData(true);
      
      const { date } = await response.json();
      
      setLatestDate(date);

      return date;
    } catch (e) {
      console.log(e);
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  const getMonthlyData = async ({ latestDate, month }) => {
    let url = `${urls.getSetListAll}?exerciseId=${exerciseId}`;

    if (month !== null) {
      const dateFrom = (new Date (new Date(latestDate) - (30 * 1000 * 60 * 60 * 24)*month));
      const strDateFrom = dateFrom.toISOString().slice(0,10);
      url = `${urls.getSetListWithPeriod}?from=${strDateFrom}&until=${latestDate}&exerciseId=${exerciseId}`
    }

    try {
      const response = await fetch(
        url,
        {
          headers: {
            'Content-Type': 'application/json',
            token
          }
        }
      );

      if(!response.ok) throw Error(response.status);
      
      const monthlyData = await response.json();

      setIsLackData(false);

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
      
      return parsedData;
    } catch (e) {
      console.log(e);
      setError(e);
    }
  };

  const setMonthlyDate = async () => {
    if (!periodData[month].isUpdated && periodData.oneMonth.isUpdated === true) {
      const numberOfMonth = {
        oneMonth: 1,
        threeMonth: 3,
        sixMonth: 6,
        year: 12,
        all: null
      }

      const monthlyData = await getMonthlyData({ latestDate, month: numberOfMonth[month] });
      
      if(monthlyData.length < 2) return setIsLackData(true);
      
      return setPeriodData({ ...periodData, [month]: { isUpdated: true, data: monthlyData } });
    }
  }

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
    const estimatedOneRm = Math.floor((weight + weight * reps * 0.025));

    return estimatedOneRm;
  }

  const getTickXValues = (type) => {
    const values = [];
    periodData[type].data.forEach((datum) => {
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
      <View style={styles.periodButtonContainer}>
        <Text style={styles.periodText}>기간 :</Text>
        <View style={styles.buttonContainer}>
          <PeriodButton period='1 개월' isOn={month === 'oneMonth'} onPress={() => setMonth('oneMonth')} />
          <PeriodButton period='3 개월' isOn={month === 'threeMonth'} onPress={() => setMonth('threeMonth')} />
          <PeriodButton period='6 개월' isOn={month === 'sixMonth'} onPress={() => setMonth('sixMonth')} />
          <PeriodButton period='1 년' isOn={month === 'year'} onPress={() => setMonth('year')} />
          <PeriodButton period='전 체' isOn={month === 'all'} onPress={() => setMonth('all')} />
        </View>
      </View>
      {isLackData && (
        <View style={styles.graphNoticeTextContainer}>
          <Text style={styles.graphNoticeText}>그래프를 그리기 위해선 적어도 이틀치의 기록이 필요해요.</Text>
          <Text style={styles.graphNoticeText}>꾸준히 기록해서 멋진 그래프를 만들어 보세요.</Text>
        </View>
      )}
      {periodData[month].data.length >= 2 && (
        <>
          <VictoryChart
            theme={VictoryTheme.material}
            minDomain={{ y: 0 }}
            width={wp('100%')}
            height={hp('60%')}
            scale={{ x: "time", y: "linear" }}
          >
            <VictoryGroup
              data={periodData[month].data}
              x={(datum) => new Date(datum.date)}
              y={type.value}
            >
              <VictoryAxis
                standalone={false}
                tickValues={getTickXValues(month)}
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
  graphNoticeTextContainer: {
    height: hp('40%'),
    alignSelf: 'center',
    justifyContent: 'center'
  },
  graphNoticeText: {
    fontSize: wp('3.5%'),
    fontWeight: 'bold',
    color: '#777777'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('80%')
  },
  periodButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: wp('2%'),
  },
  periodText: {
    fontSize: wp('4.2%'),
    fontWeight: 'bold',
    color: '#777777'
  }
});


export default ChartScreen;