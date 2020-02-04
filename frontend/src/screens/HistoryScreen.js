import React, { useContext, useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Context as AuthContext} from '../context/AuthContext';
import History from '../components/history/History';
import urls from '../common/urls';
import LoadingModal from '../modals/LoadingModal';
import ErrorModal from '../modals/ErrorModal';

const HistoryScreen = ({ navigation }) => {
  const exerciseId = navigation.getParam('id');
  const { state: { token } } = useContext(AuthContext);
  const pageSize = 10;
  const [setsByDate, setSetsByDate] = useState([]);
  const [isLackData, setIsLackData] = useState(false);
  const [paginationInfo, setPagenationInfo] = useState({ hasNextPage: true, page: 1 });
  const [error, setError] = useState({ error: null, errorModalVisible: false });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { remove } = navigation.addListener('willFocus', loadSetList);
  
    return remove;
  }, []);

  const loadSetList = async () => {
    setIsLackData(false);
    setLoading(true);
    try {
      const response = await fetch(
        `${urls.getSetList}?size=${pageSize}&&page=${paginationInfo.page}&&exerciseId=${exerciseId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            token
          }
        }
      );

      if (!response.ok) throw Error(response.status);

      if(response.status == 204) {
        return setIsLackData(true);
      }
      
      const data = await response.json();

      setPagenationInfo({
        hasNextPage: data.hasNextPage,
        page: (paginationInfo.page + 1)
      });

      setSetsByDate(setsByDate.concat(data.setsByDate));
    } catch (e) {
      
      return setError({ error, errorModalVisible: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ErrorModal error={error} setError={setError} />
      <LoadingModal isVisible={loading} />
      {isLackData ? (
        <View style={styles.noticeTextContainer}>
          <Text style={styles.noticeText}>당신만의 운동 기록을 만들어보세요.</Text>
        </View>
      ) : (
        <FlatList
          data={setsByDate}
          keyExtractor={(setByDate) => `date${setByDate.id}`}
          renderItem={({ item, index }) => {
            return (
              <History
                item={item}
                index={index}
              />
            );
          }}
          onEndReached={() => {
            if (paginationInfo.hasNextPage) loadSetList();
          }}
          onEndReachedThreshold={0.4}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  noticeTextContainer: {
    height: hp('70%'),
    alignSelf: 'center',
    justifyContent: 'center'
  },
  noticeText: {
    fontSize: wp('3.5%'),
    fontWeight: 'bold',
    color: '#777777'
  },
});

export default HistoryScreen;