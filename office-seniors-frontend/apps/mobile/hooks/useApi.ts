import { useState, useEffect, useCallback } from 'react';
import { api } from '@/services/api';

interface UseApiOptions {
  immediate?: boolean;
}

export function useApi<T>(url: string, options: UseApiOptions = { immediate: true }) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(url);
      const raw = response.data;
      const result = raw?.data ?? raw;
      setData(Array.isArray(result) ? result : (result?.activities ?? result?.data ?? result ?? null));
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (options.immediate) {
      execute();
    }
  }, [execute, options.immediate]);

  return { data, loading, error, refetch: execute };
}

export function useMutation<TData, TBody = unknown>(
  url: string,
  method: 'post' | 'put' | 'patch' | 'delete' = 'post',
) {
  const [data, setData] = useState<TData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = useCallback(
    async (body?: TBody) => {
      setLoading(true);
      setError(null);
      try {
        let response;
        switch (method) {
          case 'post':
            response = await api.post(url, body);
            break;
          case 'put':
            response = await api.put(url, body);
            break;
          case 'patch':
            response = await api.patch(url, body);
            break;
          case 'delete':
            response = await api.delete(url);
            break;
        }
        setData(response.data.data || response.data);
        return response.data;
      } catch (err: any) {
        const message = err.response?.data?.message || err.message || 'Request failed';
        setError(message);
        throw new Error(message);
      } finally {
        setLoading(false);
      }
    },
    [url, method],
  );

  return { data, loading, error, mutate };
}
