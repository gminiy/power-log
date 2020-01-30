import React, { useContext, useState, useEffect } from 'react';
import { View, FlatList, Text } from 'react-native';
import { Context as AuthContext} from '../context/AuthContext';
import History from '../components/history/History';
import urls from '../common/urls';
import LoadingModal from '../modals/LoadingModal';

const HistoryScreen = ({ navigation }) => {
  const exerciseId = navigation.getParam('id');
  const { state: { token } } = useContext(AuthContext);
  const pageSize = 10;
  const [setsByDate, setSetsByDate] = useState([]);
  const [isLackData, setIsLackData] = useState(false);
  const [paginationInfo, setPagenationInfo] = useState({ hasNextPage: true, page: 1 });
  const [error, setError] = useState(null);
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
      return setError(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <LoadingModal isVisible={loading} />
      {isLackData ? (
        <View>
          <Text>아직 기록이 없네요.</Text>
          <Text>오늘부터 기록해보세요.</Text>
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

export default HistoryScreen;