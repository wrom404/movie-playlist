import { useEffect, useState } from 'react';

const useFetch = (url, isDataNull = null) => {
  const [isLoading, setLoading] = useState(true);
  const [movieList, setMovieList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }

        const data = await response.json();
        const resultData = isDataNull ? data.results : data;
        setMovieList(resultData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, isDataNull]);

  return { isLoading, error, movieList };
}

export default useFetch;