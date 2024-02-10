import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRefreshContext } from '../context/RefreshHook';

interface UseFetchProps {
  url: string;
}

interface UseFetchResult {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  loading: boolean;
  error: string | null;
}

const useFetch = ({ url }: UseFetchProps): UseFetchResult => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
   const {refreshData}  = useRefreshContext()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data.data);
        console.log("response")
        console.log("response")
        console.log("response")
        console.log(response)
      } catch (error) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url,refreshData]);

  return { data, loading, error };
};

export default useFetch;
