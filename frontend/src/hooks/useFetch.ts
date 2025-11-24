import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const API_BASE = process.env.REACT_APP_API_BASE_URL;

/**
 * Hook personalizado para hacer peticiones GET con axios
 * Uso ideal para UrlList y cualquier otro fetch futuro
 */
function useFetch<T = unknown>(
  url: string,
  options: AxiosRequestConfig = {}
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response: AxiosResponse<T> = await axios({
        method: 'GET',
        url: `${API_BASE}${url}`,
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      setData(response.data);
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.message ||
        'Error al conectar con el servidor';
      setError(message);
      console.error('useFetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
}

export default useFetch;