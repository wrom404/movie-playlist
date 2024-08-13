import { useEffect, useState } from 'react';

const useFetch = (url) => {
  const [isLoading, setLoading] = useState(true);
  const [movieList, setMovieList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        
        const data = await response.json();
        const resultData = data.results;
        setMovieList(resultData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { isLoading, error, movieList };
}

export default useFetch;



