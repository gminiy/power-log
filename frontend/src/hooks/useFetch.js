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

        const res = await fetch(url, options);

        if (!res.ok) throw Error(res.status);

        const json = await res.json();
        
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