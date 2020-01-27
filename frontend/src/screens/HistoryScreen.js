import React, { useContext, useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { Context as AuthContext} from '../context/AuthContext';
import History from '../components/history/History';
import urls from '../common/urls';
import LoadingModal from '../modals/LoadingModal';

const HistoryScreen = ({ navigation }) => {
  const exerciseId = navigation.getParam('id');
  const { state: { token } } = useContext(AuthContext);
  const size = 10;
  const [setsByDate, setSetsByDate] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getSetList = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${urls.getSetList}?size=${size}&&page=${page}&&exerciseId=${exerciseId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              token
            }
          }
        );
  
        if (!response.ok) throw Error(response.status);
        
        const data = await response.json();
        setSetsByDate(setsByDate.concat(data));
      } catch (e) {
        return setError(e);
      } finally {
        setLoading(false);
      }
    };

    const { remove } = navigation.addListener('willFocus', getSetList);
  
    return remove;
  }, []);

  return (
    <>
      <LoadingModal isVisible={loading} />
      <FlatList
        data={setsByDate}
        keyExtractor={(setByDate) => `date${setByDate.id}`}
        renderItem={({ item, index }) => {
          return (
            <History
              item={item}
              index={index}
            />
          )
        }}
      />
    </>
  );
};

export default HistoryScreen;