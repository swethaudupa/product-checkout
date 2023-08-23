import { useState, useEffect } from 'react';
import { FetchProps, FetchResponse } from '../types';

const useFetch = <T>({ url, callback }: FetchProps<T>): FetchResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData: T = await response.json();
        if (callback) {
          const formattedData = callback(jsonData);
          setData(formattedData as T);
          setLoading(false);
        }else{
          setData(jsonData);
          setLoading(false);
        }
      } catch (error) {
        setError(error as Error | null);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, callback]);

  return { data, loading, error };
};

export default useFetch;