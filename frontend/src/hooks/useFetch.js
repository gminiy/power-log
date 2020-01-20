import { useState, useEffect, useContext } from 'react';
import { Context as AuthContext} from '../context/AuthContext';

const useFetch = (url, options, callback) => {
  const { state } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        options.headers.token = state.token || null;

        const response = await fetch(url, options);

        if (!response.ok) throw Error(response.status);

        const json = await response.json();

        callback(json);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { error, loading };
};

export default useFetch;