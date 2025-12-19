import { useState, useEffect, useCallback } from "react";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface FetchOptions extends AxiosRequestConfig {
  skip?: boolean;
}

const API_BASE = process.env.REACT_APP_API_BASE_URL;

function useFetch<T = unknown>(
  url: string,
  options: FetchOptions = {}
): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { skip = false } = options;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response: AxiosResponse<T> = await axios({
        method: "GET",
        url: `${API_BASE}${url}`,
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      setData(response.data);
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Error al conectar con el servidor";
      setError(message);
      console.error("useFetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [url]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!skip) {
      fetchData();
    }
  }, [url, skip, fetchData]);

  return { data, loading, error, refetch };
}

export default useFetch;